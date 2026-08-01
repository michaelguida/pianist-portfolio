/* Meta Conversions API endpoint.
   Receives conversion events from the browser and forwards them to Meta
   server-side, so conversions survive ad blockers / iOS / cookie limits.
   Each event carries the same event_id as the browser pixel, so Meta
   deduplicates (a conversion is never counted twice).

   Requires the env var META_CAPI_TOKEN (a secret, set in Vercel).
   If the token is missing, this no-ops harmlessly — the browser pixel
   still works, so nothing breaks. */

const crypto = require('crypto');

const PIXEL_ID = '2644187165976712';

function hash(v) {
  if (!v) return undefined;
  return crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) { res.status(200).json({ ok: false, reason: 'no_token' }); return; }

  try {
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    b = b || {};

    const user_data = {
      client_ip_address: (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
        || (req.socket && req.socket.remoteAddress) || undefined,
      client_user_agent: req.headers['user-agent'],
    };
    if (b.email) user_data.em = [hash(b.email)];
    if (b.phone) {
      let digits = String(b.phone).replace(/\D/g, '');
      if (digits.length === 10) digits = '1' + digits; // US country code
      user_data.ph = [hash(digits)];
    }
    if (b.fbp) user_data.fbp = b.fbp;
    if (b.fbc) user_data.fbc = b.fbc;

    const event = {
      event_name: b.event_name || 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: b.event_source_url,
      user_data,
    };
    if (b.event_id) event.event_id = b.event_id; // dedup key with the browser pixel

    const resp = await fetch(
      'https://graph.facebook.com/v21.0/' + PIXEL_ID + '/events?access_token=' + encodeURIComponent(token),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [event] }),
      }
    );
    const json = await resp.json().catch(() => ({}));
    res.status(200).json({ ok: resp.ok, meta: json });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e) });
  }
};
