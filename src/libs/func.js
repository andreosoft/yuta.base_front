export default {
  url_encode: function ( str ) {
      return window.btoa(unescape(encodeURIComponent(JSON.stringify( str ))));
  },
  url_decode: function ( str ) {
      return JSON.parse(decodeURIComponent(escape(window.atob( str ))));
  },
  format: function(num, n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return num.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  }
}
