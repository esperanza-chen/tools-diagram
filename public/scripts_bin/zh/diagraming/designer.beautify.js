var Beautify = {
  definition: {},
  beautifyDefinition: {},
  content: {},
  config: { size: 8, pos: 12, sizeInterval: 60, color: 60, linkerInterval: 8 },
  getBeautifyDefinition: function () {
    this.definition = Utils.copy(Model.define.elements);
    this.beautifyDefinition = Utils.copy(Model.define.elements);
    this.reviewText();
    this.reviewSize();
    this.reviewPosition();
    this.reviewLinker();
    this.update();
    this.reviewColor();
    return this.content;
  },
  addContainer: function () {
    var q = this.beautifyDefinition;
    var a = [];
    for (key in q) {
      a.push(q[key]);
    }
    var k = [];
    for (var h = 0; h < a.length; h++) {
      var n = a[h],
        d = n.parent == '' && n.attribute.container && n.name !== 'linker';
      if (d) {
        var e = n.props.x,
          c = n.props.x + n.props.w,
          m = n.props.y,
          l = n.props.y + n.props.h;
        var g = { id: n.id, x1: e, x2: c, y1: m, y2: l };
        k.push(g);
        n.containerChildren = [];
      }
    }
    for (var h = 0; h < a.length; h++) {
      var n = a[h],
        d = n.parent == '' && n.attribute.container;
      if (!d && k.length > 0 && n.name !== 'linker') {
        for (var f = 0; f < k.length; f++) {
          var b = k[f];
          if (typeof n.container == 'undefined') {
            var e = n.props.x,
              c = n.props.x + n.props.w,
              m = n.props.y,
              l = n.props.y + n.props.h;
            var p = e > b.x1 && e < b.x2 && c > b.x1 && c < b.x2,
              o = m > b.y1 && m < b.y2 && l > b.y1 && l < b.y2;
            if (p && o) {
              n.container = b.id;
              q[b.id].containerChildren.push(n.id);
            }
          } else {
            if (n.container == b.id) {
              q[b.id].containerChildren.push(n.id);
            }
          }
        }
      }
    }
    this.beautifyDefinition = q;
  },
  reviewText: function () {
    var a = this.beautifyDefinition;
    $('.shape_box').each(function () {
      var e = $(this),
        f = e.attr('id'),
        c = a[f].props.h;
      if (e.children('.text_canvas').length > 0) {
        var b = e.children('.text_canvas'),
          d = b.height();
        if (c < d) {
          a[f].props.y = a[f].props.y - (d - c) / 2;
          a[f].props.h = d;
        }
      }
    });
    this.beautifyDefinition = a;
  },
  reviewSize: function () {
    var r = this.beautifyDefinition;
    var b = [];
    for (key in r) {
      b.push(r[key]);
    }
    var o = [],
      l = [];
    var e = Beautify.config.size;
    for (var m = 0; m < b.length; m++) {
      if (Beautify.util.isShape(b[m])) {
        var q = b[m].props.w,
          n = b[m].props.h;
        var f = parseInt(q / e);
        var d = parseInt(n / e);
        o.push({ id: b[m].id, midWVal: f, w: q });
        l.push({ id: b[m].id, midHVal: d, h: n });
      }
    }
    if (o.length == 0) {
      return;
    }
    o = Beautify.util.midArrConcat(o, 'midWVal');
    l = Beautify.util.midArrConcat(l, 'midHVal');
    for (var m = 0; m < o.length; m++) {
      var a = o[m].ids,
        p = 0,
        g = 0;
      for (var k = 0; k < a.length; k++) {
        p += a[k].w;
      }
      g = p / a.length;
      o[m].meanVal = g;
    }
    for (var m = 0; m < o.length; m++) {
      for (var k = m; k < o.length; k++) {
        if (Math.abs(o[m].meanVal - o[k].meanVal) < e / 2 && m != k) {
          o[m].ids = o[m].ids.concat(o[k].ids);
          o[k].ids = [];
        }
      }
    }
    for (var m = 0; m < o.length; m++) {
      var a = o[m].ids,
        p = 0,
        g = 0;
      for (var k = 0; k < a.length; k++) {
        p += a[k].w;
      }
      g = p / a.length;
      o[m].meanVal = g;
    }
    for (var m = 0; m < o.length; m++) {
      var a = o[m].ids;
      if (a.length > 1) {
        for (var k = 0; k < a.length; k++) {
          var c = a[k].id;
          r[c].props.w = Math.ceil(o[m].meanVal);
        }
      }
    }
    for (var m = 0; m < l.length; m++) {
      var a = l[m].ids,
        p = 0,
        g = 0;
      for (var k = 0; k < a.length; k++) {
        p += a[k].h;
      }
      g = p / a.length;
      l[m].meanVal = g;
    }
    for (var m = 0; m < l.length; m++) {
      for (var k = m; k < l.length; k++) {
        if (Math.abs(l[m].meanVal - l[k].meanVal) < e / 2 && m != k) {
          l[m].ids = l[m].ids.concat(l[k].ids);
          l[k].ids = [];
        }
      }
    }
    for (var m = 0; m < l.length; m++) {
      var a = l[m].ids,
        p = 0,
        g = 0;
      for (var k = 0; k < a.length; k++) {
        p += a[k].h;
      }
      g = p / a.length;
      l[m].meanVal = g;
    }
    for (var m = 0; m < l.length; m++) {
      var a = l[m].ids;
      if (a.length > 1) {
        for (var k = 0; k < a.length; k++) {
          var c = a[k].id;
          r[c].props.h = Math.ceil(l[m].meanVal);
        }
      }
    }
    this.beautifyDefinition = r;
  },
  reviewPosition: function () {
    var g = this.beautifyDefinition;
    var B = [];
    for (key in g) {
      B.push(g[key]);
    }
    var m = [],
      p = [];
    var A = Beautify.config.pos,
      c = Beautify.config.sizeInterval;
    for (var t = 0; t < B.length; t++) {
      if (B[t].name != 'linker' && B[t].children.length == 0 && B[t].parent == '') {
        var q = B[t].id,
          l = B[t].props.w,
          v = B[t].props.h,
          k = B[t].props.x,
          f = B[t].props.y,
          z = k + l / 2,
          b = f + v / 2;
        var e = parseInt(z / A);
        var o = parseInt(b / A);
        m.push({ id: q, midXVal: e, x_: z, x: k, w: l, h: v });
        p.push({ id: q, midYVal: o, y_: b, y: f, w: l, h: v });
      }
    }
    if (m.length == 0) {
      return;
    }
    m = Beautify.util.midArrConcat(m, 'midXVal');
    p = Beautify.util.midArrConcat(p, 'midYVal');
    for (var t = 0; t < m.length; t++) {
      var r = m[t].ids,
        a = 0,
        d = 0;
      for (var s = 0; s < r.length; s++) {
        a += r[s].x_;
      }
      d = a / r.length;
      m[t].meanVal = d;
    }
    for (var t = 0; t < m.length; t++) {
      for (var s = t; s < m.length; s++) {
        if (Math.abs(m[t].meanVal - m[s].meanVal) < A / 2 && t != s) {
          m[t].ids = m[t].ids.concat(m[s].ids);
          m[s].ids = [];
        }
      }
    }
    for (var t = 0; t < m.length; t++) {
      var r = m[t].ids,
        a = 0,
        d = 0;
      for (var s = 0; s < r.length; s++) {
        a += r[s].x_;
      }
      d = a / r.length;
      m[t].meanVal = d;
    }
    for (var t = 0; t < m.length; t++) {
      var r = m[t].ids;
      if (r.length > 1) {
        for (var s = 0; s < r.length; s++) {
          for (var n = 0; n < r.length; n++) {
            if (Math.abs(r[s].w - r[n].w) > c && Math.abs(r[s].h - r[n].h) > c) {
              r[s].id = s;
            }
          }
        }
      }
    }
    for (var t = 0; t < m.length; t++) {
      var r = m[t].ids;
      if (r.length > 1) {
        for (var s = 0; s < r.length; s++) {
          var q = r[s].id,
            k = r[s].x + (Math.ceil(m[t].meanVal) - r[s].x_);
          if (g[q] != undefined) {
            g[q].props.x = k;
          }
        }
      }
    }
    for (var t = 0; t < p.length; t++) {
      var r = p[t].ids,
        a = 0,
        d = 0;
      for (var s = 0; s < r.length; s++) {
        a += r[s].y_;
      }
      d = a / r.length;
      p[t].meanVal = d;
    }
    for (var t = 0; t < p.length; t++) {
      for (var s = t; s < p.length; s++) {
        if (Math.abs(p[t].meanVal - p[s].meanVal) < A / 2 && t != s) {
          p[t].ids = p[t].ids.concat(p[s].ids);
          p[s].ids = [];
        }
      }
    }
    for (var t = 0; t < p.length; t++) {
      var r = p[t].ids;
      if (r.length > 1) {
        for (var s = 0; s < r.length; s++) {
          for (var n = 0; n < r.length; n++) {
            if (Math.abs(r[s].w - r[n].w) > c && Math.abs(r[s].h - r[n].h) > c) {
              r[s].id = s;
            }
          }
        }
      }
    }
    for (var t = 0; t < p.length; t++) {
      var r = p[t].ids,
        a = 0,
        d = 0;
      for (var s = 0; s < r.length; s++) {
        a += r[s].y_;
      }
      d = a / r.length;
      p[t].meanVal = d;
    }
    for (var t = 0; t < p.length; t++) {
      var r = p[t].ids;
      if (r.length > 1) {
        for (var s = 0; s < r.length; s++) {
          var q = r[s].id,
            f = r[s].y + (Math.ceil(p[t].meanVal) - r[s].y_);
          if (g[q] != undefined) {
            g[q].props.y = f;
          }
        }
      }
    }
    this.beautifyDefinition = g;
  },
  reviewLinker: function () {
    var m = this.beautifyDefinition;
    var q = Beautify.definition;
    var B = [];
    var z = Model.define.theme;
    if (z == undefined || JSON.stringify(z) == '{}') {
      z = { linker: { lineStyle: { lineWidth: 2 } } };
    }
    var y = Beautify.config.linkerInterval;
    for (key in m) {
      B.push(m[key]);
    }
    for (var u = 0; u < B.length; u++) {
      if (B[u].name == 'linker') {
        var h = B[u].id;
        var l = B[u].to.id,
          c = B[u].to.x,
          b = B[u].to.y;
        var j = B[u].from.id,
          o = B[u].from.x,
          n = B[u].from.y;
        var x = B[u].linkerType;
        var t = B[u].points;
        if (typeof l !== 'undefined' && l !== null) {
          var w = m[l].props.x,
            v = m[l].props.x + m[l].props.w,
            s = m[l].props.x + m[l].props.w / 2,
            f = m[l].props.y,
            e = m[l].props.y + m[l].props.h,
            d = m[l].props.y + m[l].props.h / 2,
            a = q[l].props.x,
            k = q[l].props.x + q[l].props.w,
            r = q[l].props.x + q[l].props.w / 2,
            p = q[l].props.y,
            A = q[l].props.y + q[l].props.h,
            g = q[l].props.y + q[l].props.h / 2;
          if (Math.abs(c - a) < 1) {
            c = w;
            b = b + (d - g);
            if (x == 'broken') {
              t[t.length - 1].y = b;
            }
          } else {
            if (Math.abs(c - k) < 1) {
              c = v;
              b = b + (d - g);
              if (x == 'broken') {
                t[t.length - 1].y = b;
              }
            } else {
              if (Math.abs(b - p) < 1) {
                c = c + (s - r);
                b = f;
                if (x == 'broken') {
                  t[t.length - 1].x = c;
                }
              } else {
                if (Math.abs(b - A) < 1) {
                  c = c + (s - r);
                  b = e;
                  if (x == 'broken') {
                    t[t.length - 1].x = c;
                  }
                }
              }
            }
          }
        }
        if (typeof j !== 'undefined' && j !== null) {
          var w = m[j].props.x,
            v = m[j].props.x + m[j].props.w,
            s = m[j].props.x + m[j].props.w / 2,
            f = m[j].props.y,
            e = m[j].props.y + m[j].props.h,
            d = m[j].props.y + m[j].props.h / 2,
            a = q[j].props.x,
            k = q[j].props.x + q[j].props.w,
            r = q[j].props.x + q[j].props.w / 2,
            p = q[j].props.y,
            A = q[j].props.y + q[j].props.h,
            g = q[j].props.y + q[j].props.h / 2;
          if (Math.abs(o - a) < 1) {
            o = w;
            n = n + (d - g);
            if (x == 'broken') {
              t[0].y = n;
            }
          } else {
            if (Math.abs(o - k) < 1) {
              o = v;
              n = n + (d - g);
              if (x == 'broken') {
                t[0].y = n;
              }
            } else {
              if (Math.abs(n - p) < 1) {
                o = o + (s - r);
                n = f;
                if (x == 'broken') {
                  t[0].x = o;
                }
              } else {
                if (Math.abs(n - A) < 1) {
                  o = o + (s - r);
                  n = e;
                  if (x == 'broken') {
                    t[0].x = o;
                  }
                }
              }
            }
          }
        }
        if (B[u].linkerType == 'broken') {
          var t = B[u].points;
          if (B[u].points.length == 2) {
            if (t[0].x == t[1].x) {
              if (Math.abs(t[0].y - t[1].y) < y && t[0].y != t[1].y) {
                B[u].points[0].y = b;
                B[u].points[1].y = b;
                n = b;
              }
            } else {
              if (Math.abs(t[0].x - t[1].x) < y && t[0].x != t[1].x) {
                B[u].points[0].x = c;
                B[u].points[1].x = c;
                o = c;
              }
            }
          }
        } else {
        }
        B[u].to.x = c;
        B[u].to.y = b;
        B[u].from.x = o;
        B[u].from.y = n;
      }
    }
    this.beautifyDefinition = m;
  },
  reviewColor: function () {
    var f = this.content.updates,
      q = this.content.content;
    var u = Model.define.theme;
    if (u == undefined || JSON.stringify(u) == '{}') {
      u = { shape: { fillStyle: { color: '255,255,255' }, fontStyle: { color: '50,50,50' } } };
    }
    var d = this.beautifyDefinition;
    var h = Beautify.definition;
    var w = [];
    var p = u.shape.fillStyle;
    var g = u.shape.fontStyle;
    var t = [];
    var a = [];
    for (key in d) {
      w.push(d[key]);
    }
    for (var s = 0; s < w.length; s++) {
      var o = w[s],
        k = o.id;
      if (o.name != 'linker') {
        var c = o.fillStyle.color ? o.fillStyle.color : p.color,
          b = o.fontStyle.color ? o.fontStyle.color : g.color;
        if (c && b) {
          var n = c.split(',');
          var e = b.split(',');
          for (var r = 0; r < 3; r++) {
            if (Math.abs(n[r] - e[r]) < Beautify.config.color) {
              if (r == 2) {
                e[0] = 255 - e[0];
                e[1] = 255 - e[1];
                e[2] = 255 - e[2];
                o.fontStyle.color = e.join(',');
                t.push({ id: k, fontStyle: o.fontStyle });
                a.push({ id: k, fontStyle: h[k].fontStyle });
              }
            } else {
              break;
            }
          }
        }
      }
    }
    if (t.length > 0) {
      for (var s = 0; s < t.length; s++) {
        var l = t[s],
          k = l.id;
        var v = a[s];
        for (var r = 0; r < f.length; r++) {
          var m = f[r];
          id_ = m.id;
          if (k == id_) {
            m.fontStyle = l.fontStyle;
            q[r].fontStyle = v.fontStyle;
            t.splice(s, 1);
            a.splice(s, 1);
            s--;
          }
        }
      }
      f = f.concat(t);
      q = q.concat(a);
      this.content.updates = f;
      this.content.content = q;
    }
  },
  update: function () {
    var l = this.beautifyDefinition;
    var F = Beautify.definition;
    var k = [];
    var L = [];
    for (var n in l) {
      var g = l[n],
        O = F[n];
      if (Beautify.util.isShape(g)) {
        var u = {},
          B = {};
        var H = g.props.x,
          G = g.props.y,
          I = g.props.w,
          K = g.props.h;
        var J = O.props.x,
          r = O.props.y,
          f = O.props.w,
          e = O.props.h;
        if (Math.abs(H - J) > 0 || Math.abs(G - r) > 0 || Math.abs(I - f) > 0 || Math.abs(K - e) > 0) {
          u = g.props;
          B = O.props;
        }
        var M = '',
          a = '';
        if (g.fontStyle.color && g.fontStyle.color != O.fontStyle.color) {
          M = g.fontStyle.color;
          a = O.fontStyle.color;
        }
        if (JSON.stringify(u) != '{}' || M != '') {
          var d = { id: g.id, name: g.name },
            z = { id: O.id, name: O.name };
          if (u != {}) {
            d.props = u;
            z.props = B;
          }
          if (M != '') {
            d.fontStyle = {};
            z.fontStyle = {};
            d.fontStyle.color = M;
            z.fontStyle.color = a;
          }
          L.push(d);
          k.push(z);
        }
      }
      if (g.name == 'linker') {
        var t = g.from.x,
          s = g.from.y,
          p = g.to.x,
          o = g.to.y,
          E = g.points;
        var C = O.from.x,
          m = O.from.y,
          c = O.to.x,
          D = O.to.y,
          b = O.points;
        var i = {},
          v = {};
        var j = {},
          N = {};
        if (Math.abs(t - C) > 0 || Math.abs(s - m) > 0 || Math.abs(p - c) > 0 || Math.abs(o - D) > 0) {
          if (t != C || s != m) {
            i = g.from;
            j = O.from;
          }
          if (p != c || o != D) {
            v = g.to;
            N = O.to;
          }
          var A = { id: g.id, name: g.name, points: E };
          var q = { id: O.id, name: O.name, points: b };
          if (JSON.stringify(i) != '{}') {
            A.from = i;
            q.from = j;
          }
          if (JSON.stringify(v) != '{}') {
            A.to = v;
            q.to = N;
          }
          L.push(A);
          k.push(q);
        }
      }
    }
    if (L.length > 0) {
      this.content.updates = L;
      this.content.content = k;
    } else {
      this.content.updates = L;
      this.content.content = k;
    }
  },
  util: {
    midArrConcat: function (d, b) {
      var a = [];
      function c() {
        var f = d[0][b],
          h = { mid: f, ids: [] };
        for (var e = 0; e < d.length; e++) {
          var g = d[e][b];
          if (f == g) {
            h.ids.push(d[e]);
            d.splice(e, 1);
            e--;
          }
        }
        a.push(h);
        if (d.length > 0) {
          c();
        }
      }
      c();
      return a;
    },
    isShape: function (b) {
      var a = b.name != 'linker' && b.children.length == 0 && b.parent == '' && b.attribute.container == false;
      return a;
    },
  },
};
