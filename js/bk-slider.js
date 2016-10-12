'use strict';

jQuery(function($) {
  var slideMenu = function() {
    var sp, sliderWidth, t, m, sa, l, w, gw, ot;
    return {
        build: function(sm, sw, mt, s, sl, h) {
            sp = s;
            sliderWidth = sw;
            t = mt;
            m = $(sm);
            if(m == null) {
              return;
            }else {
              sa = $("#sm .bk-slider-item");
              l = sa.length;
              w = m.width();
              var dw = $(document).width();
              gw = w / l;
              var bkwrapper = $(".bk-slider-wrapper");
              if(dw <= 600) {
                gw = w;
                var co = 0;
                setInterval(function() {
                  if(co == l) {
                    co = 0;
                  }
                   bkwrapper.css(slideMenu.doTranslate(l,w,co));
                   //console.log("Called",$(".bk-slider-wrapper").width(),co,l);
                   co++;
               }, 5000)

              }
              ot = Math.floor((w - sliderWidth) / (l - 1));
              var i = 0;
              for (i; i < l; i++) {
                  s = sa[i];
                  s.style.width = gw + 'px';
                  this.timer(s)
              }
            }
        },
        timer: function(s) {
            s.onmouseover = function() {
                clearInterval(m.htimer);
                clearInterval(m.timer);
                slideMenu.slide(s);
                m.timer = setInterval(function() {
                    slideMenu.slide(s)
                }, t)
            }
            s.onmouseout = function() {
                clearInterval(m.timer);
                clearInterval(m.htimer);
                slideMenu.slide(s, true);
                m.htimer = setInterval(function() {
                    slideMenu.slide(s, true)
                }, t)
            }
        },
        slide: function(s, c) {
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
        },
        doTranslate : function (l,w,c) {
            return {
                "width": 2681,
                "-webkit-transform": "translate3d(" + -w*c + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + -w*c + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + -w*c + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + -w*c + "px, 0px, 0px)",
                "transform": "translate3d(" + -w*c + "px, 0px,0px)"
            };
        },
        transition3d : function (value) {
            var base = this;
            base.css(base.doTranslate(value));
        },
        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        }
    };
  }();

  slideMenu.build('#sm',600,10,10);
});
