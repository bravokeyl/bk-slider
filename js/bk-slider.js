'use strict';

jQuery(function($) {
  var slideMenu = function() {
    var sp, sliderWidth, t, m, sa, l, w, gw, ot;
    return {
        build: function(sm, sw, mt, s, sl, h) {
            sp = s;
            sliderWidth = sw;
            t = mt;
            m = document.getElementById(sm);
            sa = m.getElementsByTagName('li');
            l = sa.length;
            w = m.offsetWidth;
            gw = w / l;
            ot = Math.floor((w - sliderWidth) / (l - 1));
            var i = 0;
            for (i; i < l; i++) {
                s = sa[i];
                s.style.width = gw + 'px';
                console.log(s);
                this.timer(s)
            }
        },
        timer: function(s) {
            s.onmouseover = function() {
                clearInterval(m.htimer);
                clearInterval(m.timer);
                slideMenu.slide(s);
                m.timer = setInterval(function() {
                    console.log('Calling on mouseover');
                    slideMenu.slide(s)
                }, t)
            }
            s.onmouseout = function() {
                clearInterval(m.timer);
                clearInterval(m.htimer);
                slideMenu.slide(s, true);
                m.htimer = setInterval(function() {
                  console.log('Calling on mouseout');
                    slideMenu.slide(s, true)
                }, t)
            }
        },
        slide: function(s, c) {
            console.log(s.style.width,"From slide");
            var cw = parseInt(s.style.width);
            if ((cw < sliderWidth && !c) || (cw > gw && c)) {
                var owt = 0;
                var i = 0;
                for (i; i < l; i++) {
                    if (sa[i] != s) {
                        var o, ow;
                        var oi = 0;
                        o = sa[i];
                        ow = parseInt(o.style.width);
                        if (ow < gw && c) {
                            oi = Math.floor((gw - ow) / sp);
                            oi = (oi > 0) ? oi : 1;
                            o.style.width = (ow + oi) + 'px';
                        } else if (ow > ot && !c) {
                            oi = Math.floor((ow - ot) / sp);
                            oi = (oi > 0) ? oi : 1;
                            o.style.width = (ow - oi) + 'px'
                        }
                        if (c) {
                            owt = owt + (ow + oi)
                        } else {
                            owt = owt + (ow - oi)
                        }
                    }
                }
                s.style.width = (w - owt) + 'px';
            }
            else {
                clearInterval(m.timer);
                clearInterval(m.htimer)
            }
        }
    };
  }();

  slideMenu.build('sm',600,10,10);
});
