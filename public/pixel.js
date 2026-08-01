/* Meta Pixel base code - Guida Piano Studio Pixel (2644187165976712).
   Loaded on every page for PageView tracking + retargeting audiences.
   Conversion (Lead) events fire from the individual form handlers. */
window.META_PIXEL_ID = '2644187165976712';
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', window.META_PIXEL_ID);
fbq('track', 'PageView');

/* --- Conversions API bridge: mirror browser conversions to the server with a
   shared event_id so Meta deduplicates. Fire-and-forget; never blocks or breaks
   anything, and no-ops if the /api/capi endpoint or token isn't set up. --- */
function mgEventId() {
  return (self.crypto && crypto.randomUUID) ? crypto.randomUUID()
    : (Date.now() + '-' + Math.random().toString(16).slice(2));
}
function mgCookie(name) {
  var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return m ? m.pop() : '';
}
function mgSendCapi(eventName, eventId, extra) {
  try {
    var body = { event_name: eventName, event_id: eventId, event_source_url: location.href,
      fbp: mgCookie('_fbp'), fbc: mgCookie('_fbc') };
    if (extra) { for (var k in extra) body[k] = extra[k]; }
    fetch('/api/capi', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body), keepalive: true }).catch(function () {});
  } catch (e) {}
}
window.mgEventId = mgEventId;
window.mgSendCapi = mgSendCapi;

/* Microsoft Clarity - session recordings + heatmaps (project xvcagtw2jh) */
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xvcagtw2jh");

/* Google Analytics 4 (gtag.js) - G-8FVZHSGZGM */
(function(){
  var s=document.createElement('script');s.async=1;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-8FVZHSGZGM';
  document.head.appendChild(s);
})();
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8FVZHSGZGM');

/* Track "Call or Text" (tel:) link clicks as a phone_click / Contact conversion */
document.addEventListener('click', function (e) {
  var link = e.target.closest && e.target.closest('a[href^="tel:"]');
  if (!link) return;
  var eid = mgEventId();
  if (window.gtag) gtag('event', 'phone_click', { link_url: link.getAttribute('href') });
  if (window.fbq) fbq('track', 'Contact', {}, { eventID: eid });
  mgSendCapi('Contact', eid);
});

/* Cookie notice — slim dismissible bottom bar (remembers dismissal) */
(function () {
  try { if (localStorage.getItem('cookieNoticeDismissed')) return; } catch (e) {}
  function build() {
    if (document.getElementById('cookieNotice')) return;
    var bar = document.createElement('div');
    bar.id = 'cookieNotice';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie notice');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#111;border-top:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.78);font-family:"Outfit",-apple-system,sans-serif;font-size:13px;line-height:1.5;transform:translateY(100%);transition:transform .4s ease;';
    bar.innerHTML = '<div style="max-width:1200px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:16px;">'
      + '<p style="margin:0;flex:1;">We use cookies for analytics and advertising. See our <a href="/privacy-policy" style="color:#fff;text-decoration:underline;text-underline-offset:2px;">Privacy Policy</a>.</p>'
      + '<button type="button" aria-label="Dismiss" style="background:none;border:0;color:rgba(255,255,255,0.5);font-size:20px;line-height:1;cursor:pointer;padding:4px 8px;flex-shrink:0;">×</button>'
      + '</div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.style.transform = 'translateY(0)'; });
    var btn = bar.querySelector('button');
    btn.onmouseenter = function () { btn.style.color = '#fff'; };
    btn.onmouseleave = function () { btn.style.color = 'rgba(255,255,255,0.5)'; };
    btn.onclick = function () {
      bar.style.transform = 'translateY(100%)';
      try { localStorage.setItem('cookieNoticeDismissed', '1'); } catch (e) {}
      setTimeout(function () { bar.remove(); }, 400);
    };
  }
  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
