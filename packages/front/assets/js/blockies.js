!(function () {
  function e(e) {
    for (var o = 0; o < c.length; o++) c[o] = 0;
    for (var o = 0; o < e.length; o++)
      c[o % 4] = (c[o % 4] << 5) - c[o % 4] + e.charCodeAt(o);
  }
  function o() {
    var e = c[0] ^ (c[0] << 11);
    return (
      (c[0] = c[1]),
      (c[1] = c[2]),
      (c[2] = c[3]),
      (c[3] = c[3] ^ (c[3] >> 19) ^ e ^ (e >> 8)),
      (c[3] >>> 0) / ((1 << 31) >>> 0)
    );
  }
  function r() {
    var e = Math.floor(360 * o()),
      r = 60 * o() + 40 + "%",
      t = 25 * (o() + o() + o() + o()) + "%",
      l = "hsl(" + e + "," + r + "," + t + ")";
    return l;
  }
  function t(e) {
    for (
      var r = e, t = e, l = Math.ceil(r / 2), n = r - l, a = [], c = 0;
      t > c;
      c++
    ) {
      for (var i = [], f = 0; l > f; f++) i[f] = Math.floor(2.3 * o());
      var s = i.slice(0, n);
      s.reverse(), (i = i.concat(s));
      for (var h = 0; h < i.length; h++) a.push(i[h]);
    }
    return a;
  }
  function l(o) {
    var t = {};
    return (
      (t.seed =
        o.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16)),
      e(t.seed),
      (t.size = o.size || 8),
      (t.scale = o.scale || 4),
      (t.color = o.color || r()),
      (t.bgcolor = o.bgcolor || r()),
      (t.spotcolor = o.spotcolor || r()),
      t
    );
  }
  function n(e, o) {
    var r = t(e.size),
      l = Math.sqrt(r.length);
    o.width = o.height = e.size * e.scale;
    var n = o.getContext("2d");
    (n.fillStyle = e.bgcolor),
      n.fillRect(0, 0, o.width, o.height),
      (n.fillStyle = e.color);
    for (var a = 0; a < r.length; a++)
      if (r[a]) {
        var c = Math.floor(a / l),
          i = a % l;
        (n.fillStyle = 1 == r[a] ? e.color : e.spotcolor),
          n.fillRect(i * e.scale, c * e.scale, e.scale, e.scale);
      }
    return o;
  }
  function a(e) {
    var e = l(e || {}),
      o = document.createElement("canvas");
    return n(e, o), o;
  }
  var c = new Array(4),
    i = { create: a, render: n };
  "undefined" != typeof module && (module.exports = i),
    "undefined" != typeof window && (window.blockies = i);
})();
