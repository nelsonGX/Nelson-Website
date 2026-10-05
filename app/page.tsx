import {routing} from '@/i18n/routing';

// Static export has no middleware, so `/` picks a locale in the browser.
const redirectScript = `(function(){
  var locales = ${JSON.stringify(routing.locales)};
  var langs = navigator.languages || [navigator.language || ''];
  var locale = ${JSON.stringify(routing.defaultLocale)};
  for (var i = 0; i < langs.length; i++) {
    var l = (langs[i] || '').toLowerCase().split('-')[0];
    if (locales.indexOf(l) !== -1) { locale = l; break; }
  }
  location.replace('/' + locale + location.search + location.hash);
})();`;

export default function RootPage() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <script dangerouslySetInnerHTML={{__html: redirectScript}} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=/${routing.defaultLocale}`} />
        </noscript>
      </head>
      <body style={{background: '#000'}}>
        <a href={`/${routing.defaultLocale}`} style={{color: '#888'}}>Continue</a>
      </body>
    </html>
  );
}
