var bigPipe = {
  jsVersion: '',
  cssVersion: '',
  count: 0,
  jsCounter: 0,
  render: function (e, t) {
    for (
      var s = document.getElementsByTagName('script'), n = document.getElementsByTagName('link'), i = 0;
      i < s.length;
      i++
    ) {
      if ((o = s[i].getAttribute('src')) && 0 <= o.indexOf('/assets/js/')) {
        if (o.indexOf('-') < 0) break;
        var r = o.substring(o.indexOf('-'), o.indexOf('.js'));
        bigPipe.jsVersion = r;
        break;
      }
    }
    for (i = 0; i < n.length; i++) {
      var o;
      if ((o = n[i].getAttribute('href')) && 0 <= o.indexOf('/assets/css/')) {
        if (o.indexOf('-') < 0) break;
        r = o.substring(o.indexOf('-'), o.indexOf('.css'));
        bigPipe.cssVersion = r;
        break;
      }
    }
    var a = e.css || [],
      c = e.js || [];
    this.jsCounter = c.length;
    for (i = 0; i < a.length; i++) {
      var u = a[i];
      this.renderCss(u);
    }
    i = 0;
    for (var d = c.length; i < d; i++) {
      var f = c[i];
      this.renderJs(f, t);
    }
  },
  renderCss: function (e) {
    var t = document,
      s = this.cssVersion,
      n = t.createElement('link');
    n.setAttribute('rel', 'stylesheet'),
      n.setAttribute('type', 'text/css'),
      0 <= e.indexOf('http') && (s = ''),
      (e = e.replace('.css', s + '.css')),
      n.setAttribute('href', e);
    var i = t.getElementsByTagName('head');
    i.length ? i[0].appendChild(n) : t.documentElement.appendChild(n);
  },
  renderJs: function (e, t) {
    var s = document,
      n = this.jsVersion,
      i = s.createElement('script');
    0 <= e.indexOf('http') && (n = ''),
      i.setAttribute('type', 'text/javascript'),
      (e = e.replace('.js', n + '.js')),
      i.setAttribute('src', e),
      i.setAttribute('charset', 'UTF-8'),
      s.body.appendChild(i),
      (i.onload = function () {
        bigPipe.count++, bigPipe.handle(t);
      });
  },
  handle: function (e) {
    this.count == this.jsCounter && (null != e && e(), (this.count = 0), (this.jsCounter = 0));
  },
  init: function () {
    var e = !1;
    $(document)
      .off('mousemove.ck')
      .on('mousemove.ck', function () {
        e || ($.get('/popular/init'), (e = !0));
      });
  },
};
