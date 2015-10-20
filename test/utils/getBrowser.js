export default function () {
  const ua = navigator.userAgent;
  const uaMatches = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(uaMatches[1])) { return 'ie'; }

  if (uaMatches[1] === 'Chrome') {
    if (ua.match(/\b(OPR|Edge)\/(\d+)/) != null) {
      return 'Opera';
    }
  }

  return (uaMatches[2] ? uaMatches[1] : navigator.appName).toLowerCase();
}
