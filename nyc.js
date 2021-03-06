! function(t) {
  function n(e) {
    if (r[e]) return r[e].exports;
    var o = r[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return t[e].call(o.exports, o, o.exports, n), o.l = !0, o.exports
  }
  var r = {};
  n.m = t, n.c = r, n.d = function(t, r, e) {}, n.n = function(t) {}, n.o = function(t, n) {}, n.p = "", n(n.s = 9)
}({
  0: function(t, n, r) {
    ! function(t, r) {
      r(n)
    }(0, function(t) {
      "use strict";

      function r(t) {
        if (!t) return n;
        var r, e, o = t.scale[0],
          a = t.scale[1],
          u = t.translate[0],
          i = t.translate[1];
        return function(t, n) {
          n || (r = e = 0), t[0] = (r += t[0]) * o + u, t[1] = (e += t[1]) * a + i
        }
      }

      function o(t, n) {
        for (var r, e = t.length, o = e - n; o < --e;) r = t[o], t[o++] = t[e], t[e] = r
      }

      function a(t, n) {
        for (var r = 0, e = t.length; r < e;) {
          var o = r + e >>> 1;
          t[o] < n ? r = o + 1 : e = o
        }
        return r
      }

      function u(t, n) {
        return "GeometryCollection" === n.type ? {
          type: "FeatureCollection",
          features: n.geometries.map(function(n) {
            return i(t, n)
          })
        } : i(t, n)
      }

      function i(t, n) {
        var r = {
          type: "Feature",
          id: n.id,
          properties: n.properties || {},
          geometry: c(t, n)
        };
        return null == n.id && delete r.id, r
      }

      function c(t, n) {
        function e(t, n) {
          n.length && n.pop();
          for (var r, e = l[t < 0 ? ~t : t], a = 0, u = e.length; a < u; ++a) n.push(r = e[a].slice()), s(r, a);
          t < 0 && o(n, u)
        }

        function a(t) {
          return t = t.slice(), s(t, 0), t
        }

        function u(t) {
          for (var n = [], r = 0, o = t.length; r < o; ++r) e(t[r], n);
          return n.length < 2 && n.push(n[0].slice()), n
        }

        function i(t) {
          for (var n = u(t); n.length < 4;) n.push(n[0].slice());
          return n
        }

        function c(t) {
          return t.map(i)
        }

        function f(t) {
          var n = t.type;
          return "GeometryCollection" === n ? {
            type: n,
            geometries: t.geometries.map(f)
          } : n in p ? {
            type: n,
            coordinates: p[n](t)
          } : null
        }
        var s = r(t.transform),
          l = t.arcs,
          p = {
            Point: function(t) {
              return a(t.coordinates)
            },
            MultiPoint: function(t) {
              return t.coordinates.map(a)
            },
            LineString: function(t) {
              return u(t.arcs)
            },
            MultiLineString: function(t) {
              return t.arcs.map(u)
            },
            Polygon: function(t) {
              return c(t.arcs)
            },
            MultiPolygon: function(t) {
              return t.arcs.map(c)
            }
          };
        return f(n)
      }

      function f(t, n) {
        function r(n) {
          var r, e = t.arcs[n < 0 ? ~n : n],
            o = e[0];
          return t.transform ? (r = [0, 0], e.forEach(function(t) {
            r[0] += t[0], r[1] += t[1]
          })) : r = e[e.length - 1], n < 0 ? [r, o] : [o, r]
        }

        function e(t, n) {
          for (var r in t) {
            var e = t[r];
            delete n[e.start], delete e.start, delete e.end, e.forEach(function(t) {
              o[t < 0 ? ~t : t] = 1
            }), i.push(e)
          }
        }
        var o = {},
          a = {},
          u = {},
          i = [],
          c = -1;
        return n.forEach(function(r, e) {
          var o, a = t.arcs[r < 0 ? ~r : r];
          a.length < 3 && !a[1][0] && !a[1][1] && (o = n[++c], n[c] = r, n[e] = o)
        }), n.forEach(function(t) {
          var n, e, o = r(t),
            i = o[0],
            c = o[1];
          if (n = u[i])
            if (delete u[n.end], n.push(t), n.end = c, e = a[c]) {
              delete a[e.start];
              var f = e === n ? n : n.concat(e);
              a[f.start = n.start] = u[f.end = e.end] = f
            } else a[n.start] = u[n.end] = n;
          else if (n = a[c])
            if (delete a[n.start], n.unshift(t), n.start = i, e = u[i]) {
              delete u[e.end];
              var s = e === n ? n : e.concat(n);
              a[s.start = e.start] = u[s.end = n.end] = s
            } else a[n.start] = u[n.end] = n;
          else n = [t], a[n.start = i] = u[n.end = c] = n
        }), e(u, a), e(a, u), n.forEach(function(t) {
          o[t < 0 ? ~t : t] || i.push([t])
        }), i
      }

      function s(t) {
        return c(t, l.apply(this, arguments))
      }

      function l(t, n, r) {
        function e(t) {
          var n = t < 0 ? ~t : t;
          (s[n] || (s[n] = [])).push({
            i: t,
            g: c
          })
        }

        var i = [];
        if (arguments.length > 1) {
          var c, s = [],
            l = {
              LineString: o,
              MultiLineString: a,
              Polygon: a,
              MultiPolygon: function(t) {
                t.forEach(a)
              }
            };
          u(n), s.forEach(arguments.length < 3 ? function(t) {
            i.push(t[0].i)
          } : function(t) {
            r(t[0].g, t[t.length - 1].g) && i.push(t[0].i)
          })
        } else
          for (var p = 0, h = t.arcs.length; p < h; ++p) i.push(p);
        return {
          type: "MultiLineString",
          arcs: f(t, i)
        }
      }

      function p(t) {
        var n = t[0],
          r = t[1],
          e = t[2];
        return Math.abs((n[0] - e[0]) * (r[1] - n[1]) - (n[0] - r[0]) * (e[1] - n[1]))
      }

      function h(t) {
        for (var n, r = -1, e = t.length, o = t[e - 1], a = 0; ++r < e;) n = o, o = t[r], a += n[0] * o[1] - n[1] * o[0];
        return a / 2
      }

      function d(t) {
        return c(t, v.apply(this, arguments))
      }

      function v(t, n) {
        function r(t) {
          t.forEach(function(n) {
            n.forEach(function(n) {
              (o[n = n < 0 ? ~n : n] || (o[n] = [])).push(t)
            })
          }), a.push(t)
        }

        function e(n) {
          return Math.abs(h(c(t, {
            type: "Polygon",
            arcs: [n]
          }).coordinates[0]))
        }
        var o = {},
          a = [],
          u = [];
        return n.forEach(function(t) {
          "Polygon" === t.type ? r(t.arcs) : "MultiPolygon" === t.type && t.arcs.forEach(r)
        }), a.forEach(function(t) {
          if (!t._) {
            var n = [],
              r = [t];
            for (t._ = 1, u.push(n); t = r.pop();) n.push(t), t.forEach(function(t) {
              t.forEach(function(t) {
                o[t < 0 ? ~t : t].forEach(function(t) {
                  t._ || (t._ = 1, r.push(t))
                })
              })
            })
          }
        }), a.forEach(function(t) {
          delete t._
        }), {
          type: "MultiPolygon",
          arcs: u.map(function(n) {
            var r, a = [];
            if (n.forEach(function(t) {
                t.forEach(function(t) {
                  t.forEach(function(t) {
                    o[t < 0 ? ~t : t].length < 2 && a.push(t)
                  })
                })
              }), a = f(t, a), (r = a.length) > 1)
              for (var u, i, c = 1, s = e(a[0]); c < r; ++c)(u = e(a[c])) > s && (i = a[0], a[0] = a[c], a[c] = i, s = u);
            return a
          })
        }
      }

      function g(t) {
        function n(t, n) {
          t.forEach(function(t) {
            t < 0 && (t = ~t);
            var r = o[t];
            r ? r.push(n) : o[t] = [n]
          })
        }





        function n(t, n) {
          for (;;) {
            var r = n + 1 << 1,
              a = r - 1,
              u = n,
              i = e[u];
            if (a < o && y(e[a], i) < 0 && (i = e[u = a]), r < o && y(e[r], i) < 0 && (i = e[u = r]), u === n) break;
            e[i._ = n] = i, e[t._ = n = u] = t
          }
        }
        var r = {},
          e = [],
          o = 0;
        return r.push = function(n) {
          return t(e[n._ = o] = n, o++), o
        }, r.pop = function() {
          if (!(o <= 0)) {
            var t, r = e[0];
            return --o > 0 && (t = e[o], n(e[t._ = 0] = t, 0)), r
          }
        }, r.remove = function(r) {
          var a, u = r._;
          if (e[u] === r) return u !== --o && (a = e[o], (y(a, r) < 0 ? t : n)(e[a._ = u] = a, u)), u
        }, r
      }

      function E(t, n) {
        function o(t) {
          i.remove(t), t[1][2] = n(t), i.push(t)
        }
        var a = r(t.transform),
          u = e(t.transform),
          i = m();
        return n || (n = p), t.arcs.forEach(function(t) {
          var r, e, c, f, s = [],
            l = 0;
          for (e = 0, c = t.length; e < c; ++e) f = t[e], a(t[e] = [f[0], f[1], 1 / 0], e);
          for (e = 1, c = t.length - 1; e < c; ++e) r = t.slice(e - 1, e + 2), r[1][2] = n(r), s.push(r), i.push(r);
          for (e = 0, c = s.length; e < c; ++e) r = s[e], r.previous = s[e - 1], r.next = s[e + 1];
          for (; r = i.pop();) {
            var p = r.previous,
              h = r.next;
            r[1][2] < l ? r[1][2] = l : l = r[1][2], p && (p.next = h, p[2] = r[2], o(p)), h && (h.previous = p, h[0] = r[0], o(h))
          }
          t.forEach(u)
        }), t
      }
      t.version = "1.6.27", t.mesh = s, t.meshArcs = l, t.merge = d, t.mergeArcs = v, t.feature = u, t.neighbors = g, t.presimplify = E, Object.defineProperty(t, "__esModule", {
        value: !0
      })
    })
  },
  9: function(t, n, r) {
    "use strict";

    function e(t) {
      function n() {
        var n = parseInt(r.style("width"));
        t.attr("width", n), t.attr("height", Math.round(n / a))
      }
      var r = d3.select(t.node().parentNode),
        e = parseInt(t.style("width")),
        o = parseInt(t.style("height")),
        a = e / o;
      t.attr("viewBox", "0 0 " + e + " " + o).attr("perserveAspectRatio", "xMinYMid").call(n), d3.select(window).on("resize." + r.attr("id"), n)
    }
    var o = r(0),
      a = function(t) {
        if (t && t.__esModule) return t;
        var n = {};
        if (null != t)
          for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
        return n.default = t, n
      }(o),
      u = {
        36047: "Brooklyn",
        36085: "Staten Island",
        36061: "Manhattan",
        36081: "Queens",
        36005: "The Bronx"
      },
      i = [
        ["Long Island", [-73.648224, 40.7387]],
        ["New Jersey", [-74.09964, 40.7783118]]
      ],
      c = d3.geo.mercator().center([-73.96667, 40.78333]).scale(50e3).translate([310, 170]),
      f = d3.geo.path().projection(c),
      s = d3.select("#viz-nyc").append("svg").style("background-color", 'rgb(7, 179, 222)').attr("width", 1200).attr("height", 500).call(e);
    d3.json("https://brendansudol.com//assets/data/nyc.json", function(t, n) {
      var r = a.feature(n, n.objects.counties).features,
        e = a.feature(n, n.objects.surrounding_states).features;
      s.selectAll(".state").data(e).enter().append("path").style("fill", "white").style("stroke", "black").attr("class", function(t) {
        return "state " + t.id
      }).attr("d", f), s.selectAll(".county").data(r).enter().append("path").style("fill", "white").style("stroke", "black").attr("class", function(t) {
        return "county fips_" + t.id
      }).attr("d", f), s.selectAll(".county-label").data(r).enter().append("text").attr("class", "county-label").attr("transform", function(t) {
        return "translate(" + f.centroid(t) + ")"
      }).attr("dy", ".35em").text(function(t) {
        return u[t.id]
      }), s.selectAll(".other-label").data(i).enter().append("text").attr("class", "other-label").attr("transform", function(t) {
        return "translate(" + c(t[1]) + ")"
      }).text(function(t) {
        return t[0]
      })
    })
  }
});
