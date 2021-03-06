var CodeMirror = function () {
		function a(d, e) {
			function Zb(a) {
				return a >= 0 && a < ub.size
			}

			function _b(a) {
				return v(ub, a)
			}

			function ac(a, b) {
				Lb = !0;
				var c = b - a.height;
				for (var d = a; d; d = d.parent) d.height += c
			}

			function bc(a) {
				var b = {
					line: 0,
					ch: 0
				};
				rc(b, {
					line: ub.size - 1,
					ch: _b(ub.size - 1).text.length
				}, hb(a), b, b), Fb = !0
			}

			function cc() {
				var a = [];
				return ub.iter(0, ub.size, function (b) {
					a.push(b.text)
				}), a.join("\n")
			}

			function dc(a) {
				function l(a) {
					var b = Md(a, !0);
					if (b && !_(b, g)) {
						wb || pc(), g = b, Tc(d, b), Fb = !1;
						var c = Mc();
						if (b.line >= c.to || b.line < c.from) h = setTimeout(Zd(function () {
							l(a)
						}), 150)
					}
				}

				function m(a) {
					clearTimeout(h);
					var b = Md(a);
					b && Tc(d, b), C(a), Ic(), Fb = !0, n(), j()
				}
				Sc(H(a, "shiftKey"));
				for (var b = F(a); b != A; b = b.parentNode) if (b.parentNode == W && b != X) return;
				for (var b = F(a); b != A; b = b.parentNode) if (b.parentNode == db) return f.onGutterClick && f.onGutterClick($b, fb(db.childNodes, b) + Pb, a), C(a);
				var d = Md(a);
				switch (G(a)) {
				case 3:
					L && !c && Nd(a);
					return;
				case 2:
					d && Wc(d.line, d.ch, !0), setTimeout(Ic, 20);
					return
				}
				if (!d) {
					F(a) == U && C(a);
					return
				}
				wb || pc();
				var e = +(new Date);
				if (Ab && Ab.time > e - 400 && _(Ab.pos, d)) return C(a), setTimeout(Ic, 20), dd(d.line);
				if (zb && zb.time > e - 400 && _(zb.pos, d)) return Ab = {
					time: e,
					pos: d
				}, C(a), cd(d);
				zb = {
					time: e,
					pos: d
				};
				var g = d,
					h;
				if (f.dragDrop && T && !f.readOnly && !_(xb.from, xb.to) && !ab(d, xb.from) && !ab(xb.to, d)) {
					P && (kb.draggable = !0);

					function i(b) {
						P && (kb.draggable = !1), Cb = !1, j(), k(), Math.abs(a.clientX - b.clientX) + Math.abs(a.clientY - b.clientY) < 10 && (C(b), Wc(d.line, d.ch, !0), Ic())
					}
					var j = I(document, "mouseup", Zd(i), !0),
						k = I(U, "drop", Zd(i), !0);
					Cb = !0, kb.dragDrop && kb.dragDrop();
					return
				}
				C(a), Wc(d.line, d.ch, !0);
				var n = I(document, "mousemove", Zd(function (a) {
					clearTimeout(h), C(a), !M && !G(a) ? m(a) : l(a)
				}), !0),
					j = I(document, "mouseup", Zd(m), !0)
			}

			function ec(a) {
				for (var b = F(a); b != A; b = b.parentNode) if (b.parentNode == db) return C(a);
				var c = Md(a);
				if (!c) return;
				Ab = {
					time: +(new Date),
					pos: c
				}, C(a), cd(c)
			}

			function fc(a) {
				if (f.onDragEvent && f.onDragEvent($b, B(a))) return;
				a.preventDefault();
				var b = Md(a, !0),
					c = a.dataTransfer.files;
				if (!b || f.readOnly) return;
				if (c && c.length && window.FileReader && window.File) {
					function d(a, c) {
						var d = new FileReader;
						d.onload = function () {
							g[c] = d.result, ++h == e && (b = Yc(b), Zd(function () {
								var a = xc(g.join(""), b, b);
								Tc(b, a)
							})())
						}, d.readAsText(a)
					}
					var e = c.length,
						g = Array(e),
						h = 0;
					for (var i = 0; i < e; ++i) d(c[i], i)
				} else try {
					var g = a.dataTransfer.getData("Text");
					g && $d(function () {
						var a = xb.from,
							c = xb.to;
						Tc(b, b), Cb && xc("", a, c), yc(g), Ic()
					})
				} catch (a) {}
			}

			function gc(a) {
				var b = Bc();
				a.dataTransfer.setData("Text", b);
				if (L || Q) {
					var c = document.createElement("img");
					c.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=", a.dataTransfer.setDragImage(c, 0, 0)
				}
			}

			function hc(a, b) {
				if (typeof a == "string") {
					a = h[a];
					if (!a) return !1
				}
				var c = yb;
				try {
					f.readOnly && (Eb = !0), b && (yb = null), a($b)
				} catch (d) {
					if (d != K) throw d;
					return !1
				} finally {
					yb = c, Eb = !1
				}
				return !0
			}

			function ic(a) {
				function h() {
					g = !0
				}
				var b = j(f.keyMap),
					c = b.auto;
				clearTimeout(lc), c && !l(a) && (lc = setTimeout(function () {
					j(f.keyMap) == b && (f.keyMap = c.call ? c.call(null, $b) : c)
				}, 50));
				var d = jb[H(a, "keyCode")],
					e = !1;
				if (d == null || a.altGraphKey) return !1;
				H(a, "altKey") && (d = "Alt-" + d), H(a, "ctrlKey") && (d = "Ctrl-" + d), H(a, "metaKey") && (d = "Cmd-" + d);
				var g = !1;
				return H(a, "shiftKey") ? e = k("Shift-" + d, f.extraKeys, f.keyMap, function (a) {
					return hc(a, !0)
				}, h) || k(d, f.extraKeys, f.keyMap, function (a) {
					if (typeof a == "string" && /^go[A-Z]/.test(a)) return hc(a)
				}, h) : e = k(d, f.extraKeys, f.keyMap, hc, h), g && (e = !1), e && (C(a), Od(), M && (a.oldKeyCode = a.keyCode, a.keyCode = 0)), e
			}

			function jc(a, b) {
				var c = k("'" + b + "'", f.extraKeys, f.keyMap, function (a) {
					return hc(a, !0)
				});
				return c && (C(a), Od()), c
			}

			function mc(a) {
				wb || pc(), M && a.keyCode == 27 && (a.returnValue = !1), Cc && Gc() && (Cc = !1);
				if (f.onKeyEvent && f.onKeyEvent($b, B(a))) return;
				var b = H(a, "keyCode");
				Sc(b == 16 || H(a, "shiftKey"));
				var d = ic(a);
				window.opera && (kc = d ? b : null, !d && b == 88 && H(a, c ? "metaKey" : "ctrlKey") && yc(""))
			}

			function nc(a) {
				Cc && Gc();
				if (f.onKeyEvent && f.onKeyEvent($b, B(a))) return;
				var b = H(a, "keyCode"),
					c = H(a, "charCode");
				if (window.opera && b == kc) {
					kc = null, C(a);
					return
				}
				if ((window.opera && (!a.which || a.which < 10) || S) && ic(a)) return;
				var d = String.fromCharCode(c == null ? b : c);
				f.electricChars && tb.electricChars && f.smartIndent && !f.readOnly && tb.electricChars.indexOf(d) > -1 && setTimeout(Zd(function () {
					fd(xb.to.line, "smart")
				}), 75);
				if (jc(a, d)) return;
				Ec()
			}

			function oc(a) {
				if (f.onKeyEvent && f.onKeyEvent($b, B(a))) return;
				H(a, "keyCode") == 16 && (yb = null)
			}

			function pc() {
				if (f.readOnly == "nocursor") return;
				wb || (f.onFocus && f.onFocus($b), wb = !0, A.className.search(/\bCodeMirror-focused\b/) == -1 && (A.className += " CodeMirror-focused"), Kb || Hc(!0)), Dc(), Od()
			}

			function qc() {
				wb && (f.onBlur && f.onBlur($b), wb = !1, Sb && Zd(function () {
					Sb && (Sb(), Sb = null)
				})(), A.className = A.className.replace(" CodeMirror-focused", "")), clearInterval(sb), setTimeout(function () {
					wb || (yb = null)
				}, 150)
			}

			function rc(a, b, c, d, e) {
				if (Eb) return;
				if (Wb) {
					var g = [];
					ub.iter(a.line, b.line + 1, function (a) {
						g.push(a.text)
					}), Wb.addChange(a.line, c.length, g);
					while (Wb.done.length > f.undoDepth) Wb.done.shift()
				}
				vc(a, b, c, d, e)
			}

			function sc(a, b) {
				if (!a.length) return;
				var c = a.pop(),
					d = [];
				for (var e = c.length - 1; e >= 0; e -= 1) {
					var f = c[e],
						g = [],
						h = f.start + f.added;
					ub.iter(f.start, h, function (a) {
						g.push(a.text)
					}), d.push({
						start: f.start,
						added: f.old.length,
						old: g
					});
					var i = Yc({
						line: f.start + f.old.length - 1,
						ch: eb(g[g.length - 1], f.old[f.old.length - 1])
					});
					vc({
						line: f.start,
						ch: 0
					}, {
						line: h - 1,
						ch: _b(h - 1).text.length
					}, f.old, i, i)
				}
				Fb = !0, b.push(d)
			}

			function tc() {
				sc(Wb.done, Wb.undone)
			}

			function uc() {
				sc(Wb.undone, Wb.done)
			}

			function vc(a, b, c, d, e) {
				function y(a) {
					return a <= Math.min(b.line, b.line + s) ? a : a + s
				}
				if (Eb) return;
				var g = !1,
					h = Tb.length;
				f.lineWrapping || ub.iter(a.line, b.line + 1, function (a) {
					if (!a.hidden && a.text.length == h) return g = !0, !0
				});
				if (a.line != b.line || c.length > 1) Lb = !0;
				var i = b.line - a.line,
					j = _b(a.line),
					k = _b(b.line);
				if (a.ch == 0 && b.ch == 0 && c[c.length - 1] == "") {
					var l = [],
						m = null;
					a.line ? (m = _b(a.line - 1), m.fixMarkEnds(k)) : k.fixMarkStarts();
					for (var n = 0, o = c.length - 1; n < o; ++n) l.push(r.inheritMarks(c[n], m));
					i && ub.remove(a.line, i, Mb), l.length && ub.insert(a.line, l)
				} else if (j == k) if (c.length == 1) j.replace(a.ch, b.ch, c[0]);
				else {
					k = j.split(b.ch, c[c.length - 1]), j.replace(a.ch, null, c[0]), j.fixMarkEnds(k);
					var l = [];
					for (var n = 1, o = c.length - 1; n < o; ++n) l.push(r.inheritMarks(c[n], j));
					l.push(k), ub.insert(a.line + 1, l)
				} else if (c.length == 1) j.replace(a.ch, null, c[0]), k.replace(null, b.ch, ""), j.append(k), ub.remove(a.line + 1, i, Mb);
				else {
					var l = [];
					j.replace(a.ch, null, c[0]), k.replace(null, b.ch, c[c.length - 1]), j.fixMarkEnds(k);
					for (var n = 1, o = c.length - 1; n < o; ++n) l.push(r.inheritMarks(c[n], j));
					i > 1 && ub.remove(a.line + 1, i - 1, Mb), ub.insert(a.line + 1, l)
				}
				if (f.lineWrapping) {
					var p = Math.max(5, U.clientWidth / Jd() - 3);
					ub.iter(a.line, a.line + c.length, function (a) {
						if (a.hidden) return;
						var b = Math.ceil(a.text.length / p) || 1;
						b != a.height && ac(a, b)
					})
				} else ub.iter(a.line, a.line + c.length, function (a) {
					var b = a.text;
					!a.hidden && b.length > h && (Tb = b, h = b.length, Ub = null, g = !1)
				}), g && (Nb = !0);
				var q = [],
					s = c.length - i - 1;
				for (var n = 0, t = vb.length; n < t; ++n) {
					var u = vb[n];
					u < a.line ? q.push(u) : u > b.line && q.push(u + s)
				}
				var v = a.line + Math.min(c.length, 500);
				Td(a.line, v), q.push(v), vb = q, Vd(100), Hb.push({
					from: a.line,
					to: b.line + 1,
					diff: s
				});
				var w = {
					from: a,
					to: b,
					text: c
				};
				if (Ib) {
					for (var x = Ib; x.next; x = x.next);
					x.next = w
				} else Ib = w;
				Uc(d, e, y(xb.from.line), y(xb.to.line)), U.clientHeight && (W.style.height = ub.height * Gd() + 2 * Kd() + "px")
			}

			function wc() {
				var a = 0;
				Tb = "", Ub = null, ub.iter(0, ub.size, function (b) {
					var c = b.text;
					!b.hidden && c.length > a && (a = c.length, Tb = c)
				}), Nb = !1
			}

			function xc(a, b, c) {
				function d(d) {
					if (ab(d, b)) return d;
					if (!ab(c, d)) return e;
					var f = d.line + a.length - (c.line - b.line) - 1,
						g = d.ch;
					return d.line == c.line && (g += a[a.length - 1].length - (c.ch - (c.line == b.line ? b.ch : 0))), {
						line: f,
						ch: g
					}
				}
				b = Yc(b), c ? c = Yc(c) : c = b, a = hb(a);
				var e;
				return zc(a, b, c, function (a) {
					return e = a, {
						from: d(xb.from),
						to: d(xb.to)
					}
				}), e
			}

			function yc(a, b) {
				zc(hb(a), xb.from, xb.to, function (a) {
					return b == "end" ? {
						from: a,
						to: a
					} : b == "start" ? {
						from: xb.from,
						to: xb.from
					} : {
						from: xb.from,
						to: a
					}
				})
			}

			function zc(a, b, c, d) {
				var e = a.length == 1 ? a[0].length + b.ch : a[a.length - 1].length,
					f = d({
						line: b.line + a.length - 1,
						ch: e
					});
				rc(b, c, a, f.from, f.to)
			}

			function Ac(a, b) {
				var c = a.line,
					d = b.line;
				if (c == d) return _b(c).text.slice(a.ch, b.ch);
				var e = [_b(c).text.slice(a.ch)];
				return ub.iter(c + 1, d, function (a) {
					e.push(a.text)
				}), e.push(_b(d).text.slice(0, b.ch)), e.join("\n")
			}

			function Bc() {
				return Ac(xb.from, xb.to)
			}

			function Dc() {
				if (Cc) return;
				qb.set(f.pollInterval, function () {
					Wd(), Gc(), wb && Dc(), Xd()
				})
			}

			function Ec() {
				function b() {
					Wd();
					var c = Gc();
					!c && !a ? (a = !0, qb.set(60, b)) : (Cc = !1, Dc()), Xd()
				}
				var a = !1;
				Cc = !0, qb.set(20, b)
			}

			function Gc() {
				if (Kb || !wb || ib(R) || f.readOnly) return !1;
				var a = R.value;
				if (a == Fc) return !1;
				yb = null;
				var b = 0,
					c = Math.min(Fc.length, a.length);
				while (b < c && Fc[b] == a[b])++b;
				return b < Fc.length ? xb.from = {
					line: xb.from.line,
					ch: xb.from.ch - (Fc.length - b)
				} : Db && _(xb.from, xb.to) && (xb.to = {
					line: xb.to.line,
					ch: Math.min(_b(xb.to.line).text.length, xb.to.ch + (a.length - b))
				}), yc(a.slice(b), "end"), a.length > 1e3 ? R.value = Fc = "" : Fc = a, !0
			}

			function Hc(a) {
				_(xb.from, xb.to) ? a && (Fc = R.value = "") : (Fc = "", R.value = Bc(), $(R))
			}

			function Ic() {
				f.readOnly != "nocursor" && R.focus()
			}

			function Jc() {
				if (!mb.getBoundingClientRect) return;
				var a = mb.getBoundingClientRect();
				if (M && a.top == a.bottom) return;
				var b = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
				(a.top < 0 || a.bottom > b) && mb.scrollIntoView()
			}

			function Kc() {
				var a = Ad(xb.inverted ? xb.from : xb.to),
					b = f.lineWrapping ? Math.min(a.x, kb.offsetWidth) : a.x;
				return Lc(b, a.y, b, a.yBot)
			}

			function Lc(a, b, c, d) {
				var e = Ld(),
					g = Kd();
				b += g, d += g, a += e, c += e;
				var h = U.clientHeight,
					i = U.scrollTop,
					j = !1,
					k = !0;
				b < i ? (U.scrollTop = Math.max(0, b), j = !0) : d > i + h && (U.scrollTop = d - h, j = !0);
				var l = U.clientWidth,
					m = U.scrollLeft,
					n = f.fixedGutter ? cb.clientWidth : 0,
					o = a < n + e + 10;
				return a < m + n || o ? (o && (a = 0), U.scrollLeft = Math.max(0, a - 10 - n), j = !0) : c > l + m - 3 && (U.scrollLeft = c + 10 - l, j = !0, c > W.clientWidth && (k = !1)), j && f.onScroll && f.onScroll($b), k
			}

			function Mc() {
				var a = Gd(),
					b = U.scrollTop - Kd(),
					c = Math.max(0, Math.floor(b / a)),
					d = Math.ceil((b + U.clientHeight) / a);
				return {
					from: x(ub, c),
					to: x(ub, d)
				}
			}

			function Nc(a, b) {
				function n() {
					Ub = U.clientWidth;
					var a = ob.firstChild,
						b = !1;
					return ub.iter(Pb, Qb, function (c) {
						if (!c.hidden) {
							var d = Math.round(a.offsetHeight / k) || 1;
							c.height != d && (ac(c, d), Lb = b = !0)
						}
						a = a.nextSibling
					}), b && (W.style.height = ub.height * k + 2 * Kd() + "px"), b
				}
				if (!U.clientWidth) {
					Pb = Qb = Ob = 0;
					return
				}
				var c = Mc();
				if (a !== !0 && a.length == 0 && c.from > Pb && c.to < Qb) return;
				var d = Math.max(c.from - 100, 0),
					e = Math.min(ub.size, c.to + 100);
				Pb < d && d - Pb < 20 && (d = Pb), Qb > e && Qb - e < 20 && (e = Math.min(ub.size, Qb));
				var g = a === !0 ? [] : Oc([{
					from: Pb,
					to: Qb,
					domStart: 0
				}], a),
					h = 0;
				for (var i = 0; i < g.length; ++i) {
					var j = g[i];
					j.from < d && (j.domStart += d - j.from, j.from = d), j.to > e && (j.to = e), j.from >= j.to ? g.splice(i--, 1) : h += j.to - j.from
				}
				if (h == e - d && d == Pb && e == Qb) return;
				g.sort(function (a, b) {
					return a.domStart - b.domStart
				});
				var k = Gd(),
					l = cb.style.display;
				ob.style.display = "none", Pc(d, e, g), ob.style.display = cb.style.display = "";
				var m = d != Pb || e != Qb || Rb != U.clientHeight + k;
				m && (Rb = U.clientHeight + k), Pb = d, Qb = e, Ob = y(ub, d), X.style.top = Ob * k + "px", U.clientHeight && (W.style.height = ub.height * k + 2 * Kd() + "px");
				if (ob.childNodes.length != Qb - Pb) throw new Error("BAD PATCH! " + JSON.stringify(g) + " size=" + (Qb - Pb) + " nodes=" + ob.childNodes.length);
				return f.lineWrapping ? n() : (Ub == null && (Ub = wd(Tb)), Ub > U.clientWidth ? (kb.style.width = Ub + "px", W.style.width = "", W.style.width = U.scrollWidth + "px") : kb.style.width = W.style.width = ""), cb.style.display = l, (m || Lb) && Qc() && f.lineWrapping && n() && Qc(), Rc(), !b && f.onUpdate && f.onUpdate($b), !0
			}

			function Oc(a, b) {
				for (var c = 0, d = b.length || 0; c < d; ++c) {
					var e = b[c],
						f = [],
						g = e.diff || 0;
					for (var h = 0, i = a.length; h < i; ++h) {
						var j = a[h];
						e.to <= j.from && e.diff ? f.push({
							from: j.from + g,
							to: j.to + g,
							domStart: j.domStart
						}) : e.to <= j.from || e.from >= j.to ? f.push(j) : (e.from > j.from && f.push({
							from: j.from,
							to: e.from,
							domStart: j.domStart
						}), e.to < j.to && f.push({
							from: e.to + g,
							to: j.to + g,
							domStart: j.domStart + (e.to - j.from)
						}))
					}
					a = f
				}
				return a
			}

			function Pc(a, b, c) {
				if (!c.length) ob.innerHTML = "";
				else {
					function d(a) {
						var b = a.nextSibling;
						return a.parentNode.removeChild(a), b
					}
					var e = 0,
						f = ob.firstChild,
						g;
					for (var h = 0; h < c.length; ++h) {
						var i = c[h];
						while (i.domStart > e) f = d(f), e++;
						for (var j = 0, k = i.to - i.from; j < k; ++j) f = f.nextSibling, e++
					}
					while (f) f = d(f)
				}
				var l = c.shift(),
					f = ob.firstChild,
					j = a,
					m = document.createElement("div");
				ub.iter(a, b, function (a) {
					l && l.to == j && (l = c.shift());
					if (!l || l.from > j) {
						if (a.hidden) var b = m.innerHTML = "<pre></pre>";
						else {
							var b = "<pre" + (a.className ? ' class="' + a.className + '"' : "") + ">" + a.getHTML(jd) + "</pre>";
							a.bgClassName && (b = '<div style="position: relative"><pre class="' + a.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + b + "</div>")
						}
						m.innerHTML = b, ob.insertBefore(m.firstChild, f)
					} else f = f.nextSibling;
					++j
				})
			}

			function Qc() {
				if (!f.gutter && !f.lineNumbers) return;
				var a = X.offsetHeight,
					b = U.clientHeight;
				cb.style.height = (a - b < 2 ? b : a) + "px";
				var c = [],
					d = Pb,
					e;
				ub.iter(Pb, Math.max(Qb, Pb + 1), function (a) {
					if (a.hidden) c.push("<pre></pre>");
					else {
						var b = a.gutterMarker,
							g = f.lineNumbers ? d + f.firstLineNumber : null;
						b && b.text ? g = b.text.replace("%N%", g != null ? g : "") : g == null && (g = "\u00a0"), c.push(b && b.style ? '<pre class="' + b.style + '">' : "<pre>", g);
						for (var h = 1; h < a.height; ++h) c.push("<br/>&#160;");
						c.push("</pre>"), b || (e = d)
					}++d
				}), cb.style.display = "none", db.innerHTML = c.join("");
				if (e != null) {
					var g = db.childNodes[e - Pb],
						h = String(ub.size).length,
						i = Z(g),
						j = "";
					while (i.length + j.length < h) j += "\u00a0";
					j && g.insertBefore(document.createTextNode(j), g.firstChild)
				}
				cb.style.display = "";
				var k = Math.abs((parseInt(kb.style.marginLeft) || 0) - cb.offsetWidth) > 2;
				return kb.style.marginLeft = cb.offsetWidth + "px", Lb = !1, k
			}

			function Rc() {
				var a = _(xb.from, xb.to),
					b = Ad(xb.from, !0),
					c = a ? b : Ad(xb.to, !0),
					d = xb.inverted ? b : c,
					e = Gd(),
					g = Y(A),
					h = Y(ob);
				D.style.top = Math.max(0, Math.min(U.offsetHeight, d.y + h.top - g.top)) + "px", D.style.left = Math.max(0, Math.min(U.offsetWidth, d.x + h.left - g.left)) + "px";
				if (a) mb.style.top = d.y + "px", mb.style.left = (f.lineWrapping ? Math.min(d.x, kb.offsetWidth) : d.x) + "px", mb.style.display = "", nb.style.display = "none";
				else {
					var i = b.y == c.y,
						j = "",
						k = kb.clientWidth || kb.offsetWidth,
						l = kb.clientHeight || kb.offsetHeight;

					function m(a, b, c, d) {
						var e = O ? "width: " + (c ? k - c - a : k) + "px" : "right: " + c + "px";
						j += '<div class="CodeMirror-selected" style="position: absolute; left: ' + a + "px; top: " + b + "px; " + e + "; height: " + d + 'px"></div>'
					}
					if (xb.from.ch && b.y >= 0) {
						var n = i ? k - c.x : 0;
						m(b.x, b.y, n, e)
					}
					var o = Math.max(0, b.y + (xb.from.ch ? e : 0)),
						p = Math.min(c.y, l) - o;
					p > .2 * e && m(0, o, 0, p), (!i || !xb.from.ch) && c.y < l - .5 * e && m(0, c.y, k - c.x, e), nb.innerHTML = j, mb.style.display = "none", nb.style.display = ""
				}
			}

			function Sc(a) {
				a ? yb = yb || (xb.inverted ? xb.to : xb.from) : yb = null
			}

			function Tc(a, b) {
				var c = yb && Yc(yb);
				c && (ab(c, a) ? a = c : ab(b, c) && (b = c)), Uc(a, b), Gb = !0
			}

			function Uc(a, b, c, d) {
				ad = null, c == null && (c = xb.from.line, d = xb.to.line);
				if (_(xb.from, a) && _(xb.to, b)) return;
				if (ab(b, a)) {
					var e = b;
					b = a, a = e
				}
				if (a.line != c) {
					var g = Vc(a, c, xb.from.ch);
					g ? a = g : ud(a.line, !1)
				}
				b.line != d && (b = Vc(b, d, xb.to.ch)), _(a, b) ? xb.inverted = !1 : _(a, xb.to) ? xb.inverted = !1 : _(b, xb.from) && (xb.inverted = !0);
				if (f.autoClearEmptyLines && _(xb.from, xb.to)) {
					var h = xb.inverted ? a : b;
					if (h.line != xb.from.line && xb.from.line < ub.size) {
						var i = _b(xb.from.line);
						/^\s+$/.test(i.text) && setTimeout(Zd(function () {
							if (i.parent && /^\s+$/.test(i.text)) {
								var a = w(i);
								xc("", {
									line: a,
									ch: 0
								}, {
									line: a,
									ch: i.text.length
								})
							}
						}, 10))
					}
				}
				xb.from = a, xb.to = b, Jb = !0
			}

			function Vc(a, b, c) {
				function d(b) {
					var d = a.line + b,
						e = b == 1 ? ub.size : -1;
					while (d != e) {
						var g = _b(d);
						if (!g.hidden) {
							var h = a.ch;
							if (f || h > c || h > g.text.length) h = g.text.length;
							return {
								line: d,
								ch: h
							}
						}
						d += b
					}
				}
				var e = _b(a.line),
					f = a.ch == e.text.length && a.ch != c;
				return e.hidden ? a.line >= b ? d(1) || d(-1) : d(-1) || d(1) : a
			}

			function Wc(a, b, c) {
				var d = Yc({
					line: a,
					ch: b || 0
				});
				(c ? Tc : Uc)(d, d)
			}

			function Xc(a) {
				return Math.max(0, Math.min(a, ub.size - 1))
			}

			function Yc(a) {
				if (a.line < 0) return {
					line: 0,
					ch: 0
				};
				if (a.line >= ub.size) return {
					line: ub.size - 1,
					ch: _b(ub.size - 1).text.length
				};
				var b = a.ch,
					c = _b(a.line).text.length;
				return b == null || b > c ? {
					line: a.line,
					ch: c
				} : b < 0 ? {
					line: a.line,
					ch: 0
				} : a
			}

			function Zc(a, b) {
				function g() {
					for (var b = d + a, c = a < 0 ? -1 : ub.size; b != c; b += a) {
						var e = _b(b);
						if (!e.hidden) return d = b, f = e, !0
					}
				}

				function h(b) {
					if (e == (a < 0 ? 0 : f.text.length)) {
						if ( !! b || !g()) return !1;
						e = a < 0 ? f.text.length : 0
					} else e += a;
					return !0
				}
				var c = xb.inverted ? xb.from : xb.to,
					d = c.line,
					e = c.ch,
					f = _b(d);
				if (b == "char") h();
				else if (b == "column") h(!0);
				else if (b == "word") {
					var i = !1;
					for (;;) {
						if (a < 0 && !h()) break;
						if (gb(f.text.charAt(e))) i = !0;
						else if (i) {
							a < 0 && (a = 1, h());
							break
						}
						if (a > 0 && !h()) break
					}
				}
				return {
					line: d,
					ch: e
				}
			}

			function $c(a, b) {
				var c = a < 0 ? xb.from : xb.to;
				if (yb || _(xb.from, xb.to)) c = Zc(a, b);
				Wc(c.line, c.ch, !0)
			}

			function _c(a, b) {
				_(xb.from, xb.to) ? a < 0 ? xc("", Zc(a, b), xb.to) : xc("", xb.from, Zc(a, b)) : xc("", xb.from, xb.to), Gb = !0
			}

			function bd(a, b) {
				var c = 0,
					d = Ad(xb.inverted ? xb.from : xb.to, !0);
				ad != null && (d.x = ad), b == "page" ? c = Math.min(U.clientHeight, window.innerHeight || document.documentElement.clientHeight) : b == "line" && (c = Gd());
				var e = Bd(d.x, d.y + c * a + 2);
				b == "page" && (U.scrollTop += Ad(e, !0).y - d.y), Wc(e.line, e.ch, !0), ad = d.x
			}

			function cd(a) {
				var b = _b(a.line).text,
					c = a.ch,
					d = a.ch;
				while (c > 0 && gb(b.charAt(c - 1)))--c;
				while (d < b.length && gb(b.charAt(d)))++d;
				Tc({
					line: a.line,
					ch: c
				}, {
					line: a.line,
					ch: d
				})
			}

			function dd(a) {
				Tc({
					line: a,
					ch: 0
				}, Yc({
					line: a + 1,
					ch: 0
				}))
			}

			function ed(a) {
				if (_(xb.from, xb.to)) return fd(xb.from.line, a);
				var b = xb.to.line - (xb.to.ch ? 0 : 1);
				for (var c = xb.from.line; c <= b; ++c) fd(c, a)
			}

			function fd(a, b) {
				b || (b = "add");
				if (b == "smart") if (!tb.indent) b = "prev";
				else var c = Sd(a);
				var d = _b(a),
					e = d.indentation(f.tabSize),
					g = d.text.match(/^\s*/)[0],
					h;
				b == "prev" ? a ? h = _b(a - 1).indentation(f.tabSize) : h = 0 : b == "smart" ? h = tb.indent(c, d.text.slice(g.length), d.text) : b == "add" ? h = e + f.indentUnit : b == "subtract" && (h = e - f.indentUnit), h = Math.max(0, h);
				var i = h - e;
				if (!i) {
					if (xb.from.line != a && xb.to.line != a) return;
					var j = g
				} else {
					var j = "",
						k = 0;
					if (f.indentWithTabs) for (var l = Math.floor(h / f.tabSize); l; --l) k += f.tabSize, j += "	";
					while (k < h)++k, j += " "
				}
				xc(j, {
					line: a,
					ch: 0
				}, {
					line: a,
					ch: g.length
				})
			}

			function gd() {
				tb = a.getMode(f, f.mode), ub.iter(0, ub.size, function (a) {
					a.stateAfter = null
				}), vb = [0], Vd()
			}

			function hd() {
				var a = f.gutter || f.lineNumbers;
				cb.style.display = a ? "" : "none", a ? Lb = !0 : ob.parentNode.style.marginLeft = 0
			}

			function id(a, b) {
				if (f.lineWrapping) {
					A.className += " CodeMirror-wrap";
					var c = U.clientWidth / Jd() - 3;
					ub.iter(0, ub.size, function (a) {
						if (a.hidden) return;
						var b = Math.ceil(a.text.length / c) || 1;
						b != 1 && ac(a, b)
					}), kb.style.width = W.style.width = ""
				} else A.className = A.className.replace(" CodeMirror-wrap", ""), Ub = null, Tb = "", ub.iter(0, ub.size, function (a) {
					a.height != 1 && !a.hidden && ac(a, 1), a.text.length > Tb.length && (Tb = a.text)
				});
				Hb.push({
					from: 0,
					to: ub.size
				})
			}

			function jd(a) {
				var b = f.tabSize - a % f.tabSize,
					c = Vb[b];
				if (c) return c;
				for (var d = '<span class="cm-tab">', e = 0; e < b; ++e) d += " ";
				return Vb[b] = {
					html: d + "</span>",
					width: b
				}
			}

			function kd() {
				U.className = U.className.replace(/\s*cm-s-\S+/g, "") + f.theme.replace(/(^|\s)\s*/g, " cm-s-")
			}

			function ld() {
				var a = i[f.keyMap].style;
				A.className = A.className.replace(/\s*cm-keymap-\S+/g, "") + (a ? " cm-keymap-" + a : "")
			}

			function md() {
				this.set = []
			}

			function nd(a, b, c) {
				function e(a, b, c, e) {
					_b(a).addMark(new p(b, c, e, d))
				}
				a = Yc(a), b = Yc(b);
				var d = new md;
				if (!ab(a, b)) return d;
				if (a.line == b.line) e(a.line, a.ch, b.ch, c);
				else {
					e(a.line, a.ch, null, c);
					for (var f = a.line + 1, g = b.line; f < g; ++f) e(f, null, null, c);
					e(b.line, null, b.ch, c)
				}
				return Hb.push({
					from: a.line,
					to: b.line + 1
				}), d
			}

			function od(a) {
				a = Yc(a);
				var b = new q(a.ch);
				return _b(a.line).addMark(b), b
			}

			function pd(a) {
				a = Yc(a);
				var b = [],
					c = _b(a.line).marked;
				if (!c) return b;
				for (var d = 0, e = c.length; d < e; ++d) {
					var f = c[d];
					(f.from == null || f.from <= a.ch) && (f.to == null || f.to >= a.ch) && b.push(f.marker || f)
				}
				return b
			}

			function qd(a, b, c) {
				return typeof a == "number" && (a = _b(Xc(a))), a.gutterMarker = {
					text: b,
					style: c
				}, Lb = !0, a
			}

			function rd(a) {
				typeof a == "number" && (a = _b(Xc(a))), a.gutterMarker = null, Lb = !0
			}

			function sd(a, b) {
				var c = a,
					d = a;
				return typeof a == "number" ? d = _b(Xc(a)) : c = w(a), c == null ? null : b(d, c) ? (Hb.push({
					from: c,
					to: c + 1
				}), d) : null
			}

			function td(a, b, c) {
				return sd(a, function (a) {
					if (a.className != b || a.bgClassName != c) return a.className = b, a.bgClassName = c, !0
				})
			}

			function ud(a, b) {
				return sd(a, function (a, c) {
					if (a.hidden != b) {
						a.hidden = b;
						if (!f.lineWrapping) {
							var d = a.text;
							b && d.length == Tb.length ? Nb = !0 : !b && d.length > Tb.length && (Tb = d, Ub = null, Nb = !1)
						}
						ac(a, b ? 0 : 1);
						var e = xb.from.line,
							g = xb.to.line;
						if (b && (e == c || g == c)) {
							var h = e == c ? Vc({
								line: e,
								ch: 0
							}, e, 0) : xb.from,
								i = g == c ? Vc({
									line: g,
									ch: 0
								}, g, 0) : xb.to;
							if (!i) return;
							Uc(h, i)
						}
						return Lb = !0
					}
				})
			}

			function vd(a) {
				if (typeof a == "number") {
					if (!Zb(a)) return null;
					var b = a;
					a = _b(a);
					if (!a) return null
				} else {
					var b = w(a);
					if (b == null) return null
				}
				var c = a.gutterMarker;
				return {
					line: b,
					handle: a,
					text: a.text,
					markerText: c && c.text,
					markerClass: c && c.style,
					lineClass: a.className,
					bgClass: a.bgClassName
				}
			}

			function wd(a) {
				return lb.innerHTML = "<pre><span>x</span></pre>", lb.firstChild.firstChild.firstChild.nodeValue = a, lb.firstChild.firstChild.offsetWidth || 10
			}

			function xd(a, b) {
				function e(a) {
					return zd(c, a).left
				}
				if (b <= 0) return 0;
				var c = _b(a),
					d = c.text,
					f = 0,
					g = 0,
					h = d.length,
					i, j = Math.min(h, Math.ceil(b / Jd()));
				for (;;) {
					var k = e(j);
					if (!(k <= b && j < h)) {
						i = k, h = j;
						break
					}
					j = Math.min(h, Math.ceil(j * 1.2))
				}
				if (b > i) return h;
				j = Math.floor(h * .8), k = e(j), k < b && (f = j, g = k);
				for (;;) {
					if (h - f <= 1) return i - b > b - g ? f : h;
					var l = Math.ceil((f + h) / 2),
						m = e(l);
					m > b ? (h = l, i = m) : (f = l, g = m)
				}
			}

			function zd(a, b) {
				if (b == 0) return {
					top: 0,
					left: 0
				};
				var c = f.lineWrapping && b < a.text.length && V.test(a.text.slice(b - 1, b + 1));
				lb.innerHTML = "<pre>" + a.getHTML(jd, b, yd, c) + "</pre>";
				var d = document.getElementById(yd),
					e = d.offsetTop,
					g = d.offsetLeft;
				if (M && e == 0 && g == 0) {
					var h = document.createElement("span");
					h.innerHTML = "x", d.parentNode.insertBefore(h, d.nextSibling), e = h.offsetTop
				}
				return {
					top: e,
					left: g
				}
			}

			function Ad(a, b) {
				var c, d = Gd(),
					e = d * (y(ub, a.line) - (b ? Ob : 0));
				if (a.ch == 0) c = 0;
				else {
					var g = zd(_b(a.line), a.ch);
					c = g.left, f.lineWrapping && (e += Math.max(0, g.top))
				}
				return {
					x: c,
					y: e,
					yBot: e + d
				}
			}

			function Bd(a, b) {
				function l(a) {
					var b = zd(h, a);
					if (j) {
						var d = Math.round(b.top / c);
						return Math.max(0, b.left + (d - k) * U.clientWidth)
					}
					return b.left
				}
				b < 0 && (b = 0);
				var c = Gd(),
					d = Jd(),
					e = Ob + Math.floor(b / c),
					g = x(ub, e);
				if (g >= ub.size) return {
					line: ub.size - 1,
					ch: _b(ub.size - 1).text.length
				};
				var h = _b(g),
					i = h.text,
					j = f.lineWrapping,
					k = j ? e - y(ub, g) : 0;
				if (a <= 0 && k == 0) return {
					line: g,
					ch: 0
				};
				var m = 0,
					n = 0,
					o = i.length,
					p, q = Math.min(o, Math.ceil((a + k * U.clientWidth * .9) / d));
				for (;;) {
					var r = l(q);
					if (!(r <= a && q < o)) {
						p = r, o = q;
						break
					}
					q = Math.min(o, Math.ceil(q * 1.2))
				}
				if (a > p) return {
					line: g,
					ch: o
				};
				q = Math.floor(o * .8), r = l(q), r < a && (m = q, n = r);
				for (;;) {
					if (o - m <= 1) return {
						line: g,
						ch: p - a > a - n ? m : o
					};
					var s = Math.ceil((m + o) / 2),
						t = l(s);
					t > a ? (o = s, p = t) : (m = s, n = t)
				}
			}

			function Cd(a) {
				var b = Ad(a, !0),
					c = Y(kb);
				return {
					x: c.left + b.x,
					y: c.top + b.y,
					yBot: c.top + b.yBot
				}
			}

			function Gd() {
				if (Fd == null) {
					Fd = "<pre>";
					for (var a = 0; a < 49; ++a) Fd += "x<br/>";
					Fd += "x</pre>"
				}
				var b = ob.clientHeight;
				return b == Ed ? Dd : (Ed = b, lb.innerHTML = Fd, Dd = lb.firstChild.offsetHeight / 50 || 1, lb.innerHTML = "", Dd)
			}

			function Jd() {
				return U.clientWidth == Id ? Hd : (Id = U.clientWidth, Hd = wd("x"))
			}

			function Kd() {
				return kb.offsetTop
			}

			function Ld() {
				return kb.offsetLeft
			}

			function Md(a, b) {
				var c = Y(U, !0),
					d, e;
				try {
					d = a.clientX, e = a.clientY
				} catch (a) {
					return null
				}
				if (!b && (d - c.left > U.clientWidth || e - c.top > U.clientHeight)) return null;
				var f = Y(kb, !0);
				return Bd(d - f.left, e - f.top)
			}

			function Nd(a) {
				function f() {
					var a = hb(R.value).join("\n");
					a != e && Zd(yc)(a, "end"), D.style.position = "relative", R.style.cssText = d, N && (U.scrollTop = c), Kb = !1, Hc(!0), Dc()
				}
				var b = Md(a),
					c = U.scrollTop;
				if (!b || window.opera) return;
				(_(xb.from, xb.to) || ab(b, xb.from) || !ab(b, xb.to)) && Zd(Wc)(b.line, b.ch);
				var d = R.style.cssText;
				D.style.position = "absolute", R.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", Kb = !0;
				var e = R.value = Bc();
				Ic(), $(R);
				if (L) {
					E(a);
					var g = I(window, "mouseup", function () {
						g(), setTimeout(f, 20)
					}, !0)
				} else setTimeout(f, 50)
			}

			function Od() {
				clearInterval(sb);
				var a = !0;
				mb.style.visibility = "", sb = setInterval(function () {
					mb.style.visibility = (a = !a) ? "" : "hidden"
				}, 650)
			}

			function Qd(a) {
				function p(a, b, c) {
					if (!a.text) return;
					var d = a.styles,
						e = g ? 0 : a.text.length - 1,
						f;
					for (var i = g ? 0 : d.length - 2, j = g ? d.length : -2; i != j; i += 2 * h) {
						var k = d[i];
						if (d[i + 1] != null && d[i + 1] != m) {
							e += h * k.length;
							continue
						}
						for (var l = g ? 0 : k.length - 1, p = g ? k.length : -1; l != p; l += h, e += h) if (e >= b && e < c && o.test(f = k.charAt(l))) {
							var q = Pd[f];
							if (q.charAt(1) == ">" == g) n.push(f);
							else {
								if (n.pop() != q.charAt(0)) return {
									pos: e,
									match: !1
								};
								if (!n.length) return {
									pos: e,
									match: !0
								}
							}
						}
					}
				}
				var b = xb.inverted ? xb.from : xb.to,
					c = _b(b.line),
					d = b.ch - 1,
					e = d >= 0 && Pd[c.text.charAt(d)] || Pd[c.text.charAt(++d)];
				if (!e) return;
				var f = e.charAt(0),
					g = e.charAt(1) == ">",
					h = g ? 1 : -1,
					i = c.styles;
				for (var j = d + 1, k = 0, l = i.length; k < l; k += 2) if ((j -= i[k].length) <= 0) {
					var m = i[k + 1];
					break
				}
				var n = [c.text.charAt(d)],
					o = /[(){}[\]]/;
				for (var k = b.line, l = g ? Math.min(k + 100, ub.size) : Math.max(-1, k - 100); k != l; k += h) {
					var c = _b(k),
						q = k == b.line,
						r = p(c, q && g ? d + 1 : 0, q && !g ? d : c.text.length);
					if (r) break
				}
				r || (r = {
					pos: null,
					match: !1
				});
				var m = r.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket",
					s = nd({
						line: b.line,
						ch: d
					}, {
						line: b.line,
						ch: d + 1
					}, m),
					t = r.pos != null && nd({
						line: k,
						ch: r.pos
					}, {
						line: k,
						ch: r.pos + 1
					}, m),
					u = Zd(function () {
						s.clear(), t && t.clear()
					});
				a ? setTimeout(u, 800) : Sb = u
			}

			function Rd(a) {
				var b, c;
				for (var d = a, e = a - 40; d > e; --d) {
					if (d == 0) return 0;
					var g = _b(d - 1);
					if (g.stateAfter) return d;
					var h = g.indentation(f.tabSize);
					if (c == null || b > h) c = d - 1, b = h
				}
				return c
			}

			function Sd(a) {
				var b = Rd(a),
					c = b && _b(b - 1).stateAfter;
				return c ? c = m(tb, c) : c = n(tb), ub.iter(b, a, function (a) {
					a.highlight(tb, c, f.tabSize), a.stateAfter = m(tb, c)
				}), b < a && Hb.push({
					from: b,
					to: a
				}), a < ub.size && !_b(a).stateAfter && vb.push(a), c
			}

			function Td(a, b) {
				var c = Sd(a);
				ub.iter(a, b, function (a) {
					a.highlight(tb, c, f.tabSize), a.stateAfter = m(tb, c)
				})
			}

			function Ud() {
				var a = +(new Date) + f.workTime,
					b = vb.length;
				while (vb.length) {
					if (!_b(Pb).stateAfter) var c = Pb;
					else var c = vb.pop();
					if (c >= ub.size) continue;
					var d = Rd(c),
						e = d && _b(d - 1).stateAfter;
					e ? e = m(tb, e) : e = n(tb);
					var g = 0,
						h = tb.compareStates,
						i = !1,
						j = d,
						k = !1;
					ub.iter(j, ub.size, function (b) {
						var d = b.stateAfter;
						if (+(new Date) > a) return vb.push(j), Vd(f.workDelay), i && Hb.push({
							from: c,
							to: j + 1
						}), k = !0;
						var l = b.highlight(tb, e, f.tabSize);
						l && (i = !0), b.stateAfter = m(tb, e);
						var n = null;
						if (h) {
							var o = d && h(d, e);
							o != K && (n = !! o)
						}
						n == null && (l !== !1 || !d ? g = 0 : ++g > 3 && (!tb.indent || tb.indent(d, "") == tb.indent(e, "")) && (n = !0));
						if (n) return !0;
						++j
					});
					if (k) return;
					i && Hb.push({
						from: c,
						to: j + 1
					})
				}
				b && f.onHighlightComplete && f.onHighlightComplete($b)
			}

			function Vd(a) {
				if (!vb.length) return;
				rb.set(a, Zd(Ud))
			}

			function Wd() {
				Fb = Gb = Ib = null, Hb = [], Jb = !1, Mb = []
			}

			function Xd() {
				var a = !1,
					b;
				Nb && wc(), Jb && (a = !Kc()), Hb.length ? b = Nc(Hb, !0) : (Jb && Rc(), Lb && Qc()), a && Kc(), Jb && (Jc(), Od()), wb && !Kb && (Fb === !0 || Fb !== !1 && Jb) && Hc(Gb), Jb && f.matchBrackets && setTimeout(Zd(function () {
					Sb && (Sb(), Sb = null), _(xb.from, xb.to) && Qd(!1)
				}), 20);
				var c = Ib,
					d = Mb;
				Jb && f.onCursorActivity && f.onCursorActivity($b), c && f.onChange && $b && f.onChange($b, c);
				for (var e = 0; e < d.length; ++e) d[e]($b);
				b && f.onUpdate && f.onUpdate($b)
			}

			function Zd(a) {
				return function () {
					Yd++ || Wd();
					try {
						var b = a.apply(this, arguments)
					} finally {
						--Yd || Xd()
					}
					return b
				}
			}

			function $d(a) {
				Wb.startCompound();
				try {
					return a()
				} finally {
					Wb.endCompound()
				}
			}
			var f = {},
				o = a.defaults;
			for (var s in o) o.hasOwnProperty(s) && (f[s] = (e && e.hasOwnProperty(s) ? e : o)[s]);
			var A = document.createElement("div");
			A.className = "CodeMirror" + (f.lineWrapping ? " CodeMirror-wrap" : ""), A.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>', d.appendChild ? d.appendChild(A) : d(A);
			var D = A.firstChild,
				R = D.firstChild,
				U = A.lastChild,
				W = U.firstChild,
				X = W.firstChild,
				cb = X.firstChild,
				db = cb.firstChild,
				kb = cb.nextSibling.firstChild,
				lb = kb.firstChild,
				mb = lb.nextSibling,
				nb = mb.nextSibling,
				ob = nb.nextSibling;
			kd(), ld(), b && (R.style.width = "0px"), P || (kb.draggable = !0), kb.style.outline = "none", f.tabindex != null && (R.tabIndex = f.tabindex), f.autofocus && Ic(), !f.gutter && !f.lineNumbers && (cb.style.display = "none"), S && (D.style.height = "1px", D.style.position = "absolute");
			try {
				wd("x")
			} catch (pb) {
				throw pb.message.match(/runtime/i) && (pb = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")), pb
			}
			var qb = new J,
				rb = new J,
				sb, tb, ub = new u([new t([new r("")])]),
				vb, wb;
			gd();
			var xb = {
				from: {
					line: 0,
					ch: 0
				},
				to: {
					line: 0,
					ch: 0
				},
				inverted: !1
			},
				yb, zb, Ab, Bb = 0,
				Cb, Db = !1,
				Eb = !1,
				Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Ob = 0,
				Pb = 0,
				Qb = 0,
				Rb = 0,
				Sb, Tb = "",
				Ub, Vb = {};
			Zd(function () {
				bc(f.value || ""), Fb = !1
			})();
			var Wb = new z;
			I(U, "mousedown", Zd(dc)), I(U, "dblclick", Zd(ec)), I(kb, "selectstart", C), L || I(U, "contextmenu", Nd), I(U, "scroll", function () {
				Bb = U.scrollTop, Nc([]), f.fixedGutter && (cb.style.left = U.scrollLeft + "px"), f.onScroll && f.onScroll($b)
			}), I(window, "resize", function () {
				Nc(!0)
			}), I(R, "keyup", Zd(oc)), I(R, "input", Ec), I(R, "keydown", Zd(mc)), I(R, "keypress", Zd(nc)), I(R, "focus", pc), I(R, "blur", qc);
			if (f.dragDrop) {
				I(kb, "dragstart", gc);

				function Xb(a) {
					if (f.onDragEvent && f.onDragEvent($b, B(a))) return;
					E(a)
				}
				I(U, "dragenter", Xb), I(U, "dragover", Xb), I(U, "drop", Zd(fc))
			}
			I(U, "paste", function () {
				Ic(), Ec()
			}), I(R, "paste", Ec), I(R, "cut", Zd(function () {
				f.readOnly || yc("")
			})), S && I(W, "mouseup", function () {
				document.activeElement == R && R.blur(), Ic()
			});
			var Yb;
			try {
				Yb = document.activeElement == R
			} catch (pb) {}
			Yb || f.autofocus ? setTimeout(pc, 20) : qc();
			var $b = A.CodeMirror = {
				getValue: cc,
				setValue: Zd(bc),
				getSelection: Bc,
				replaceSelection: Zd(yc),
				focus: function () {
					window.focus(), Ic(), pc(), Ec()
				},
				setOption: function (a, b) {
					var c = f[a];
					f[a] = b, a == "mode" || a == "indentUnit" ? gd() : a == "readOnly" && b == "nocursor" ? (qc(), R.blur()) : a == "readOnly" && !b ? Hc(!0) : a == "theme" ? kd() : a == "lineWrapping" && c != b ? Zd(id)() : a == "tabSize" ? Nc(!0) : a == "keyMap" && ld();
					if (a == "lineNumbers" || a == "gutter" || a == "firstLineNumber" || a == "theme") hd(), Nc(!0)
				},
				getOption: function (a) {
					return f[a]
				},
				undo: Zd(tc),
				redo: Zd(uc),
				indentLine: Zd(function (a, b) {
					typeof b != "string" && (b == null ? b = f.smartIndent ? "smart" : "prev" : b = b ? "add" : "subtract"), Zb(a) && fd(a, b)
				}),
				indentSelection: Zd(ed),
				historySize: function () {
					return {
						undo: Wb.done.length,
						redo: Wb.undone.length
					}
				},
				clearHistory: function () {
					Wb = new z
				},
				matchBrackets: Zd(function () {
					Qd(!0)
				}),
				getTokenAt: Zd(function (a) {
					return a = Yc(a), _b(a.line).getTokenAt(tb, Sd(a.line), a.ch)
				}),
				getStateAfter: function (a) {
					return a = Xc(a == null ? ub.size - 1 : a), Sd(a + 1)
				},
				cursorCoords: function (a, b) {
					return a == null && (a = xb.inverted), this.charCoords(a ? xb.from : xb.to, b)
				},
				charCoords: function (a, b) {
					return a = Yc(a), b == "local" ? Ad(a, !1) : b == "div" ? Ad(a, !0) : Cd(a)
				},
				coordsChar: function (a) {
					var b = Y(kb);
					return Bd(a.x - b.left, a.y - b.top)
				},
				markText: Zd(nd),
				setBookmark: od,
				findMarksAt: pd,
				setMarker: Zd(qd),
				clearMarker: Zd(rd),
				setLineClass: Zd(td),
				hideLine: Zd(function (a) {
					return ud(a, !0)
				}),
				showLine: Zd(function (a) {
					return ud(a, !1)
				}),
				onDeleteLine: function (a, b) {
					if (typeof a == "number") {
						if (!Zb(a)) return null;
						a = _b(a)
					}
					return (a.handlers || (a.handlers = [])).push(b), a
				},
				lineInfo: vd,
				addWidget: function (a, b, c, d, e) {
					a = Ad(Yc(a));
					var f = a.yBot,
						g = a.x;
					b.style.position = "absolute", W.appendChild(b);
					if (d == "over") f = a.y;
					else if (d == "near") {
						var h = Math.max(U.offsetHeight, ub.height * Gd()),
							i = Math.max(W.clientWidth, kb.clientWidth) - Ld();
						a.yBot + b.offsetHeight > h && a.y > b.offsetHeight && (f = a.y - b.offsetHeight), g + b.offsetWidth > i && (g = i - b.offsetWidth)
					}
					b.style.top = f + Kd() + "px", b.style.left = b.style.right = "", e == "right" ? (g = W.clientWidth - b.offsetWidth, b.style.right = "0px") : (e == "left" ? g = 0 : e == "middle" && (g = (W.clientWidth - b.offsetWidth) / 2), b.style.left = g + Ld() + "px"), c && Lc(g, f, g + b.offsetWidth, f + b.offsetHeight)
				},
				lineCount: function () {
					return ub.size
				},
				clipPos: Yc,
				getCursor: function (a) {
					return a == null && (a = xb.inverted), bb(a ? xb.from : xb.to)
				},
				somethingSelected: function () {
					return !_(xb.from, xb.to)
				},
				setCursor: Zd(function (a, b, c) {
					b == null && typeof a.line == "number" ? Wc(a.line, a.ch, c) : Wc(a, b, c)
				}),
				setSelection: Zd(function (a, b, c) {
					(c ? Tc : Uc)(Yc(a), Yc(b || a))
				}),
				getLine: function (a) {
					if (Zb(a)) return _b(a).text
				},
				getLineHandle: function (a) {
					if (Zb(a)) return _b(a)
				},
				setLine: Zd(function (a, b) {
					Zb(a) && xc(b, {
						line: a,
						ch: 0
					}, {
						line: a,
						ch: _b(a).text.length
					})
				}),
				removeLine: Zd(function (a) {
					Zb(a) && xc("", {
						line: a,
						ch: 0
					}, Yc({
						line: a + 1,
						ch: 0
					}))
				}),
				replaceRange: Zd(xc),
				getRange: function (a, b) {
					return Ac(Yc(a), Yc(b))
				},
				triggerOnKeyDown: Zd(mc),
				execCommand: function (a) {
					return h[a]($b)
				},
				moveH: Zd($c),
				deleteH: Zd(_c),
				moveV: Zd(bd),
				toggleOverwrite: function () {
					Db ? (Db = !1, mb.className = mb.className.replace(" CodeMirror-overwrite", "")) : (Db = !0, mb.className += " CodeMirror-overwrite")
				},
				posFromIndex: function (a) {
					var b = 0,
						c;
					return ub.iter(0, ub.size, function (d) {
						var e = d.text.length + 1;
						if (e > a) return c = a, !0;
						a -= e, ++b
					}), Yc({
						line: b,
						ch: c
					})
				},
				indexFromPos: function (a) {
					if (a.line < 0 || a.ch < 0) return 0;
					var b = a.ch;
					return ub.iter(0, a.line, function (a) {
						b += a.text.length + 1
					}), b
				},
				scrollTo: function (a, b) {
					a != null && (U.scrollLeft = a), b != null && (U.scrollTop = b), Nc([])
				},
				operation: function (a) {
					return Zd(a)()
				},
				compoundChange: function (a) {
					return $d(a)
				},
				refresh: function () {
					Nc(!0), U.scrollHeight > Bb && (U.scrollTop = Bb)
				},
				getInputField: function () {
					return R
				},
				getWrapperElement: function () {
					return A
				},
				getScrollerElement: function () {
					return U
				},
				getGutterElement: function () {
					return cb
				}
			},
				kc = null,
				lc, Cc = !1,
				Fc = "",
				ad = null;
			md.prototype.clear = Zd(function () {
				var a = Infinity,
					b = -Infinity;
				for (var c = 0, d = this.set.length; c < d; ++c) {
					var e = this.set[c],
						f = e.marked;
					if (!f || !e.parent) continue;
					var g = w(e);
					a = Math.min(a, g), b = Math.max(b, g);
					for (var h = 0; h < f.length; ++h) f[h].marker == this && f.splice(h--, 1)
				}
				a != Infinity && Hb.push({
					from: a,
					to: b + 1
				})
			}), md.prototype.find = function () {
				var a, b;
				for (var c = 0, d = this.set.length; c < d; ++c) {
					var e = this.set[c],
						f = e.marked;
					for (var g = 0; g < f.length; ++g) {
						var h = f[g];
						if (h.marker == this) if (h.from != null || h.to != null) {
							var i = w(e);
							i != null && (h.from != null && (a = {
								line: i,
								ch: h.from
							}), h.to != null && (b = {
								line: i,
								ch: h.to
							}))
						}
					}
				}
				return {
					from: a,
					to: b
				}
			};
			var yd = "CodeMirror-temp-" + Math.floor(Math.random() * 16777215).toString(16),
				Dd, Ed, Fd, Hd, Id = 0,
				Pd = {
					"(": ")>",
					")": "(<",
					"[": "]>",
					"]": "[<",
					"{": "}>",
					"}": "{<"
				},
				Yd = 0;
			for (var _d in g) g.propertyIsEnumerable(_d) && !$b.propertyIsEnumerable(_d) && ($b[_d] = g[_d]);
			return $b
		}

		function j(a) {
			return typeof a == "string" ? i[a] : a
		}

		function k(a, b, c, d, e) {
			function f(b) {
				b = j(b);
				var c = b[a];
				if (c != null && d(c)) return !0;
				if (b.nofallthrough) return e && e(), !0;
				var g = b.fallthrough;
				if (g == null) return !1;
				if (Object.prototype.toString.call(g) != "[object Array]") return f(g);
				for (var h = 0, i = g.length; h < i; ++h) if (f(g[h])) return !0;
				return !1
			}
			return b && f(b) ? !0 : f(c)
		}

		function l(a) {
			var b = jb[H(a, "keyCode")];
			return b == "Ctrl" || b == "Alt" || b == "Shift" || b == "Mod"
		}

		function m(a, b) {
			if (b === !0) return b;
			if (a.copyState) return a.copyState(b);
			var c = {};
			for (var d in b) {
				var e = b[d];
				e instanceof Array && (e = e.concat([])), c[d] = e
			}
			return c
		}

		function n(a, b, c) {
			return a.startState ? a.startState(b, c) : !0
		}

		function o(a, b) {
			this.pos = this.start = 0, this.string = a, this.tabSize = b || 8
		}

		function p(a, b, c, d) {
			this.from = a, this.to = b, this.style = c, this.marker = d
		}

		function q(a) {
			this.from = a, this.to = a, this.line = null
		}

		function r(a, b) {
			this.styles = b || [a, null], this.text = a, this.height = 1, this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null, this.stateAfter = this.parent = this.hidden = null
		}

		function s(a, b, c, d) {
			for (var e = 0, f = 0, g = 0; f < b; e += 2) {
				var h = c[e],
					i = f + h.length;
				g == 0 ? (i > a && d.push(h.slice(a - f, Math.min(h.length, b - f)), c[e + 1]), i >= a && (g = 1)) : g == 1 && (i > b ? d.push(h.slice(0, b - f), c[e + 1]) : d.push(h, c[e + 1])), f = i
			}
		}

		function t(a) {
			this.lines = a, this.parent = null;
			for (var b = 0, c = a.length, d = 0; b < c; ++b) a[b].parent = this, d += a[b].height;
			this.height = d
		}

		function u(a) {
			this.children = a;
			var b = 0,
				c = 0;
			for (var d = 0, e = a.length; d < e; ++d) {
				var f = a[d];
				b += f.chunkSize(), c += f.height, f.parent = this
			}
			this.size = b, this.height = c, this.parent = null
		}

		function v(a, b) {
			while (!a.lines) for (var c = 0;; ++c) {
				var d = a.children[c],
					e = d.chunkSize();
				if (b < e) {
					a = d;
					break
				}
				b -= e
			}
			return a.lines[b]
		}

		function w(a) {
			if (a.parent == null) return null;
			var b = a.parent,
				c = fb(b.lines, a);
			for (var d = b.parent; d; b = d, d = d.parent) for (var e = 0, f = d.children.length;; ++e) {
				if (d.children[e] == b) break;
				c += d.children[e].chunkSize()
			}
			return c
		}

		function x(a, b) {
			var c = 0;
			a: do {
				for (var d = 0, e = a.children.length; d < e; ++d) {
					var f = a.children[d],
						g = f.height;
					if (b < g) {
						a = f;
						continue a
					}
					b -= g, c += f.chunkSize()
				}
				return c
			} while (!a.lines);
			for (var d = 0, e = a.lines.length; d < e; ++d) {
				var h = a.lines[d],
					i = h.height;
				if (b < i) break;
				b -= i
			}
			return c + d
		}

		function y(a, b) {
			var c = 0;
			a: do {
				for (var d = 0, e = a.children.length; d < e; ++d) {
					var f = a.children[d],
						g = f.chunkSize();
					if (b < g) {
						a = f;
						continue a
					}
					b -= g, c += f.height
				}
				return c
			} while (!a.lines);
			for (var d = 0; d < b; ++d) c += a.lines[d].height;
			return c
		}

		function z() {
			this.time = 0, this.done = [], this.undone = [], this.compound = 0, this.closed = !1
		}

		function A() {
			E(this)
		}

		function B(a) {
			return a.stop || (a.stop = A), a
		}

		function C(a) {
			a.preventDefault ? a.preventDefault() : a.returnValue = !1
		}

		function D(a) {
			a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
		}

		function E(a) {
			C(a), D(a)
		}

		function F(a) {
			return a.target || a.srcElement
		}

		function G(a) {
			if (a.which) return a.which;
			if (a.button & 1) return 1;
			if (a.button & 2) return 3;
			if (a.button & 4) return 2
		}

		function H(a, b) {
			var c = a.override && a.override.hasOwnProperty(b);
			return c ? a.override[b] : a[b]
		}

		function I(a, b, c, d) {
			if (typeof a.addEventListener == "function") {
				a.addEventListener(b, c, !1);
				if (d) return function () {
					a.removeEventListener(b, c, !1)
				}
			} else {
				var e = function (a) {
						c(a || window.event)
					};
				a.attachEvent("on" + b, e);
				if (d) return function () {
					a.detachEvent("on" + b, e)
				}
			}
		}

		function J() {
			this.id = null
		}

		function W(a, b, c) {
			b == null && (b = a.search(/[^\s\u00a0]/), b == -1 && (b = a.length));
			for (var d = 0, e = 0; d < b; ++d) a.charAt(d) == "	" ? e += c - e % c : ++e;
			return e
		}

		function X(a) {
			return a.currentStyle ? a.currentStyle : window.getComputedStyle(a, null)
		}

		function Y(a, b) {
			var c = a.ownerDocument.body,
				d = 0,
				e = 0,
				f = !1;
			for (var g = a; g; g = g.offsetParent) {
				var h = g.offsetLeft,
					i = g.offsetTop;
				g == c ? (d += Math.abs(h), e += Math.abs(i)) : (d += h, e += i), b && X(g).position == "fixed" && (f = !0)
			}
			var j = b && !f ? null : c;
			for (var g = a.parentNode; g != j; g = g.parentNode) g.scrollLeft != null && (d -= g.scrollLeft, e -= g.scrollTop);
			return {
				left: d,
				top: e
			}
		}

		function Z(a) {
			return a.textContent || a.innerText || a.nodeValue || ""
		}

		function $(a) {
			b ? (a.selectionStart = 0, a.selectionEnd = a.value.length) : a.select()
		}

		function _(a, b) {
			return a.line == b.line && a.ch == b.ch
		}

		function ab(a, b) {
			return a.line < b.line || a.line == b.line && a.ch < b.ch
		}

		function bb(a) {
			return {
				line: a.line,
				ch: a.ch
			}
		}

		function db(a) {
			return cb.textContent = a, cb.innerHTML
		}

		function eb(a, b) {
			if (!b) return 0;
			if (!a) return b.length;
			for (var c = a.length, d = b.length; c >= 0 && d >= 0; --c, --d) if (a.charAt(c) != b.charAt(d)) break;
			return d + 1
		}

		function fb(a, b) {
			if (a.indexOf) return a.indexOf(b);
			for (var c = 0, d = a.length; c < d; ++c) if (a[c] == b) return c;
			return -1
		}

		function gb(a) {
			return /\w/.test(a) || a.toUpperCase() != a.toLowerCase()
		}
		a.defaults = {
			value: "",
			mode: null,
			theme: "default",
			indentUnit: 2,
			indentWithTabs: !1,
			smartIndent: !0,
			tabSize: 4,
			keyMap: "default",
			extraKeys: null,
			electricChars: !0,
			autoClearEmptyLines: !1,
			onKeyEvent: null,
			onDragEvent: null,
			lineWrapping: !1,
			lineNumbers: !1,
			gutter: !1,
			fixedGutter: !1,
			firstLineNumber: 1,
			readOnly: !1,
			dragDrop: !0,
			onChange: null,
			onCursorActivity: null,
			onGutterClick: null,
			onHighlightComplete: null,
			onUpdate: null,
			onFocus: null,
			onBlur: null,
			onScroll: null,
			matchBrackets: !1,
			workTime: 100,
			workDelay: 200,
			pollInterval: 100,
			undoDepth: 40,
			tabindex: null,
			autofocus: null
		};
		var b = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
			c = b || /Mac/.test(navigator.platform),
			d = /Win/.test(navigator.platform),
			e = a.modes = {},
			f = a.mimeModes = {};
		a.defineMode = function (b, c) {
			!a.defaults.mode && b != "null" && (a.defaults.mode = b);
			if (arguments.length > 2) {
				c.dependencies = [];
				for (var d = 2; d < arguments.length; ++d) c.dependencies.push(arguments[d])
			}
			e[b] = c
		}, a.defineMIME = function (a, b) {
			f[a] = b
		}, a.resolveMode = function (b) {
			if (typeof b == "string" && f.hasOwnProperty(b)) b = f[b];
			else if (typeof b == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(b)) return a.resolveMode("application/xml");
			return typeof b == "string" ? {
				name: b
			} : b || {
				name: "null"
			}
		}, a.getMode = function (b, c) {
			var c = a.resolveMode(c),
				d = e[c.name];
			return d ? d(b, c) : a.getMode(b, "text/plain")
		}, a.listModes = function () {
			var a = [];
			for (var b in e) e.propertyIsEnumerable(b) && a.push(b);
			return a
		}, a.listMIMEs = function () {
			var a = [];
			for (var b in f) f.propertyIsEnumerable(b) && a.push({
				mime: b,
				mode: f[b]
			});
			return a
		};
		var g = a.extensions = {};
		a.defineExtension = function (a, b) {
			g[a] = b
		};
		var h = a.commands = {
			selectAll: function (a) {
				a.setSelection({
					line: 0,
					ch: 0
				}, {
					line: a.lineCount() - 1
				})
			},
			killLine: function (a) {
				var b = a.getCursor(!0),
					c = a.getCursor(!1),
					d = !_(b, c);
				!d && a.getLine(b.line).length == b.ch ? a.replaceRange("", b, {
					line: b.line + 1,
					ch: 0
				}) : a.replaceRange("", b, d ? c : {
					line: b.line
				})
			},
			deleteLine: function (a) {
				var b = a.getCursor().line;
				a.replaceRange("", {
					line: b,
					ch: 0
				}, {
					line: b
				})
			},
			undo: function (a) {
				a.undo()
			},
			redo: function (a) {
				a.redo()
			},
			goDocStart: function (a) {
				a.setCursor(0, 0, !0)
			},
			goDocEnd: function (a) {
				a.setSelection({
					line: a.lineCount() - 1
				}, null, !0)
			},
			goLineStart: function (a) {
				a.setCursor(a.getCursor().line, 0, !0)
			},
			goLineStartSmart: function (a) {
				var b = a.getCursor(),
					c = a.getLine(b.line),
					d = Math.max(0, c.search(/\S/));
				a.setCursor(b.line, b.ch <= d && b.ch ? 0 : d, !0)
			},
			goLineEnd: function (a) {
				a.setSelection({
					line: a.getCursor().line
				}, null, !0)
			},
			goLineUp: function (a) {
				a.moveV(-1, "line")
			},
			goLineDown: function (a) {
				a.moveV(1, "line")
			},
			goPageUp: function (a) {
				a.moveV(-1, "page")
			},
			goPageDown: function (a) {
				a.moveV(1, "page")
			},
			goCharLeft: function (a) {
				a.moveH(-1, "char")
			},
			goCharRight: function (a) {
				a.moveH(1, "char")
			},
			goColumnLeft: function (a) {
				a.moveH(-1, "column")
			},
			goColumnRight: function (a) {
				a.moveH(1, "column")
			},
			goWordLeft: function (a) {
				a.moveH(-1, "word")
			},
			goWordRight: function (a) {
				a.moveH(1, "word")
			},
			delCharLeft: function (a) {
				a.deleteH(-1, "char")
			},
			delCharRight: function (a) {
				a.deleteH(1, "char")
			},
			delWordLeft: function (a) {
				a.deleteH(-1, "word")
			},
			delWordRight: function (a) {
				a.deleteH(1, "word")
			},
			indentAuto: function (a) {
				a.indentSelection("smart")
			},
			indentMore: function (a) {
				a.indentSelection("add")
			},
			indentLess: function (a) {
				a.indentSelection("subtract")
			},
			insertTab: function (a) {
				a.replaceSelection("	", "end")
			},
			defaultTab: function (a) {
				a.somethingSelected() ? a.indentSelection("add") : a.replaceSelection("	", "end")
			},
			transposeChars: function (a) {
				var b = a.getCursor(),
					c = a.getLine(b.line);
				b.ch > 0 && b.ch < c.length - 1 && a.replaceRange(c.charAt(b.ch) + c.charAt(b.ch - 1), {
					line: b.line,
					ch: b.ch - 1
				}, {
					line: b.line,
					ch: b.ch + 1
				})
			},
			newlineAndIndent: function (a) {
				a.replaceSelection("\n", "end"), a.indentLine(a.getCursor().line)
			},
			toggleOverwrite: function (a) {
				a.toggleOverwrite()
			}
		},
			i = a.keyMap = {};
		i.basic = {
			Left: "goCharLeft",
			Right: "goCharRight",
			Up: "goLineUp",
			Down: "goLineDown",
			End: "goLineEnd",
			Home: "goLineStartSmart",
			PageUp: "goPageUp",
			PageDown: "goPageDown",
			Delete: "delCharRight",
			Backspace: "delCharLeft",
			Tab: "defaultTab",
			"Shift-Tab": "indentAuto",
			Enter: "newlineAndIndent",
			Insert: "toggleOverwrite"
		}, i.pcDefault = {
			"Ctrl-A": "selectAll",
			"Ctrl-D": "deleteLine",
			"Ctrl-Z": "undo",
			"Shift-Ctrl-Z": "redo",
			"Ctrl-Y": "redo",
			"Ctrl-Home": "goDocStart",
			"Alt-Up": "goDocStart",
			"Ctrl-End": "goDocEnd",
			"Ctrl-Down": "goDocEnd",
			"Ctrl-Left": "goWordLeft",
			"Ctrl-Right": "goWordRight",
			"Alt-Left": "goLineStart",
			"Alt-Right": "goLineEnd",
			"Ctrl-Backspace": "delWordLeft",
			"Ctrl-Delete": "delWordRight",
			"Ctrl-S": "save",
			"Ctrl-F": "find",
			"Ctrl-G": "findNext",
			"Shift-Ctrl-G": "findPrev",
			"Shift-Ctrl-F": "replace",
			"Shift-Ctrl-R": "replaceAll",
			"Ctrl-[": "indentLess",
			"Ctrl-]": "indentMore",
			fallthrough: "basic"
		}, i.macDefault = {
			"Cmd-A": "selectAll",
			"Cmd-D": "deleteLine",
			"Cmd-Z": "undo",
			"Shift-Cmd-Z": "redo",
			"Cmd-Y": "redo",
			"Cmd-Up": "goDocStart",
			"Cmd-End": "goDocEnd",
			"Cmd-Down": "goDocEnd",
			"Alt-Left": "goWordLeft",
			"Alt-Right": "goWordRight",
			"Cmd-Left": "goLineStart",
			"Cmd-Right": "goLineEnd",
			"Alt-Backspace": "delWordLeft",
			"Ctrl-Alt-Backspace": "delWordRight",
			"Alt-Delete": "delWordRight",
			"Cmd-S": "save",
			"Cmd-F": "find",
			"Cmd-G": "findNext",
			"Shift-Cmd-G": "findPrev",
			"Cmd-Alt-F": "replace",
			"Shift-Cmd-Alt-F": "replaceAll",
			"Cmd-[": "indentLess",
			"Cmd-]": "indentMore",
			fallthrough: ["basic", "emacsy"]
		}, i["default"] = c ? i.macDefault : i.pcDefault, i.emacsy = {
			"Ctrl-F": "goCharRight",
			"Ctrl-B": "goCharLeft",
			"Ctrl-P": "goLineUp",
			"Ctrl-N": "goLineDown",
			"Alt-F": "goWordRight",
			"Alt-B": "goWordLeft",
			"Ctrl-A": "goLineStart",
			"Ctrl-E": "goLineEnd",
			"Ctrl-V": "goPageUp",
			"Shift-Ctrl-V": "goPageDown",
			"Ctrl-D": "delCharRight",
			"Ctrl-H": "delCharLeft",
			"Alt-D": "delWordRight",
			"Alt-Backspace": "delWordLeft",
			"Ctrl-K": "killLine",
			"Ctrl-T": "transposeChars"
		}, a.fromTextArea = function (b, c) {
			function d() {
				b.value = h.getValue()
			}
			c || (c = {}), c.value = b.value, !c.tabindex && b.tabindex && (c.tabindex = b.tabindex), c.autofocus == null && b.getAttribute("autofocus") != null && (c.autofocus = !0);
			if (b.form) {
				var e = I(b.form, "submit", d, !0);
				if (typeof b.form.submit == "function") {
					var f = b.form.submit;

					function g() {
						d(), b.form.submit = f, b.form.submit(), b.form.submit = g
					}
					b.form.submit = g
				}
			}
			b.style.display = "none";
			var h = a(function (a) {
				b.parentNode.insertBefore(a, b.nextSibling)
			}, c);
			return h.save = d, h.getTextArea = function () {
				return b
			}, h.toTextArea = function () {
				d(), b.parentNode.removeChild(h.getWrapperElement()), b.style.display = "", b.form && (e(), typeof b.form.submit == "function" && (b.form.submit = f))
			}, h
		}, a.copyState = m, a.startState = n, o.prototype = {
			eol: function () {
				return this.pos >= this.string.length
			},
			sol: function () {
				return this.pos == 0
			},
			peek: function () {
				return this.string.charAt(this.pos)
			},
			next: function () {
				if (this.pos < this.string.length) return this.string.charAt(this.pos++)
			},
			eat: function (a) {
				var b = this.string.charAt(this.pos);
				if (typeof a == "string") var c = b == a;
				else var c = b && (a.test ? a.test(b) : a(b));
				if (c) return ++this.pos, b
			},
			eatWhile: function (a) {
				var b = this.pos;
				while (this.eat(a));
				return this.pos > b
			},
			eatSpace: function () {
				var a = this.pos;
				while (/[\s\u00a0]/.test(this.string.charAt(this.pos)))++this.pos;
				return this.pos > a
			},
			skipToEnd: function () {
				this.pos = this.string.length
			},
			skipTo: function (a) {
				var b = this.string.indexOf(a, this.pos);
				if (b > -1) return this.pos = b, !0
			},
			backUp: function (a) {
				this.pos -= a
			},
			column: function () {
				return W(this.string, this.start, this.tabSize)
			},
			indentation: function () {
				return W(this.string, null, this.tabSize)
			},
			match: function (a, b, c) {
				if (typeof a != "string") {
					var e = this.string.slice(this.pos).match(a);
					return e && b !== !1 && (this.pos += e[0].length), e
				}

				function d(a) {
					return c ? a.toLowerCase() : a
				}
				if (d(this.string).indexOf(d(a), this.pos) == this.pos) return b !== !1 && (this.pos += a.length), !0
			},
			current: function () {
				return this.string.slice(this.start, this.pos)
			}
		}, a.StringStream = o, p.prototype = {
			attach: function (a) {
				this.marker.set.push(a)
			},
			detach: function (a) {
				var b = fb(this.marker.set, a);
				b > -1 && this.marker.set.splice(b, 1)
			},
			split: function (a, b) {
				if (this.to <= a && this.to != null) return null;
				var c = this.from < a || this.from == null ? null : this.from - a + b,
					d = this.to == null ? null : this.to - a + b;
				return new p(c, d, this.style, this.marker)
			},
			dup: function () {
				return new p(null, null, this.style, this.marker)
			},
			clipTo: function (a, b, c, d, e) {
				a && d > this.from && (d < this.to || this.to == null) ? this.from = null : this.from != null && this.from >= b && (this.from = Math.max(d, this.from) + e), c && (b < this.to || this.to == null) && (b > this.from || this.from == null) ? this.to = null : this.to != null && this.to > b && (this.to = d < this.to ? this.to + e : b)
			},
			isDead: function () {
				return this.from != null && this.to != null && this.from >= this.to
			},
			sameSet: function (a) {
				return this.marker == a.marker
			}
		}, q.prototype = {
			attach: function (a) {
				this.line = a
			},
			detach: function (a) {
				this.line == a && (this.line = null)
			},
			split: function (a, b) {
				if (a < this.from) return this.from = this.to = this.from - a + b, this
			},
			isDead: function () {
				return this.from > this.to
			},
			clipTo: function (a, b, c, d, e) {
				(a || b < this.from) && (c || d > this.to) ? (this.from = 0, this.to = -1) : this.from > b && (this.from = this.to = Math.max(d, this.from) + e)
			},
			sameSet: function (a) {
				return !1
			},
			find: function () {
				return !this.line || !this.line.parent ? null : {
					line: w(this.line),
					ch: this.from
				}
			},
			clear: function () {
				if (this.line) {
					var a = fb(this.line.marked, this);
					a != -1 && this.line.marked.splice(a, 1), this.line = null
				}
			}
		}, r.inheritMarks = function (a, b) {
			var c = new r(a),
				d = b && b.marked;
			if (d) for (var e = 0; e < d.length; ++e) if (d[e].to == null && d[e].style) {
				var f = c.marked || (c.marked = []),
					g = d[e],
					h = g.dup();
				f.push(h), h.attach(c)
			}
			return c
		}, r.prototype = {
			replace: function (a, b, c) {
				var d = [],
					e = this.marked,
					f = b == null ? this.text.length : b;
				s(0, a, this.styles, d), c && d.push(c, null), s(f, this.text.length, this.styles, d), this.styles = d, this.text = this.text.slice(0, a) + c + this.text.slice(f), this.stateAfter = null;
				if (e) {
					var g = c.length - (f - a);
					for (var h = 0; h < e.length; ++h) {
						var i = e[h];
						i.clipTo(a == null, a || 0, b == null, f, g), i.isDead() && (i.detach(this), e.splice(h--, 1))
					}
				}
			},
			split: function (a, b) {
				var c = [b, null],
					d = this.marked;
				s(a, this.text.length, this.styles, c);
				var e = new r(b + this.text.slice(a), c);
				if (d) for (var f = 0; f < d.length; ++f) {
					var g = d[f],
						h = g.split(a, b.length);
					h && (e.marked || (e.marked = []), e.marked.push(h), h.attach(e), h == g && d.splice(f--, 1))
				}
				return e
			},
			append: function (a) {
				var b = this.text.length,
					c = a.marked,
					d = this.marked;
				this.text += a.text, s(0, a.text.length, a.styles, this.styles);
				if (d) for (var e = 0; e < d.length; ++e) d[e].to == null && (d[e].to = b);
				if (c && c.length) {
					d || (this.marked = d = []);
					a: for (var e = 0; e < c.length; ++e) {
						var f = c[e];
						if (!f.from) for (var g = 0; g < d.length; ++g) {
							var h = d[g];
							if (h.to == b && h.sameSet(f)) {
								h.to = f.to == null ? null : f.to + b, h.isDead() && (h.detach(this), c.splice(e--, 1));
								continue a
							}
						}
						d.push(f), f.attach(this), f.from += b, f.to != null && (f.to += b)
					}
				}
			},
			fixMarkEnds: function (a) {
				var b = this.marked,
					c = a.marked;
				if (!b) return;
				for (var d = 0; d < b.length; ++d) {
					var e = b[d],
						f = e.to == null;
					if (f && c) for (var g = 0; g < c.length; ++g) if (c[g].sameSet(e)) {
						f = !1;
						break
					}
					f && (e.to = this.text.length)
				}
			},
			fixMarkStarts: function () {
				var a = this.marked;
				if (!a) return;
				for (var b = 0; b < a.length; ++b) a[b].from == null && (a[b].from = 0)
			},
			addMark: function (a) {
				a.attach(this), this.marked == null && (this.marked = []), this.marked.push(a), this.marked.sort(function (a, b) {
					return (a.from || 0) - (b.from || 0)
				})
			},
			highlight: function (a, b, c) {
				var d = new o(this.text, c),
					e = this.styles,
					f = 0,
					g = !1,
					h = e[0],
					i;
				this.text == "" && a.blankLine && a.blankLine(b);
				while (!d.eol()) {
					var j = a.token(d, b),
						k = this.text.slice(d.start, d.pos);
					d.start = d.pos, f && e[f - 1] == j ? e[f - 2] += k : k && (!g && (e[f + 1] != j || f && e[f - 2] != i) && (g = !0), e[f++] = k, e[f++] = j, i = h, h = e[f]);
					if (d.pos > 5e3) {
						e[f++] = this.text.slice(d.pos), e[f++] = null;
						break
					}
				}
				return e.length != f && (e.length = f, g = !0), f && e[f - 2] != i && (g = !0), g || (e.length < 5 && this.text.length < 10 ? null : !1)
			},
			getTokenAt: function (a, b, c) {
				var d = this.text,
					e = new o(d);
				while (e.pos < c && !e.eol()) {
					e.start = e.pos;
					var f = a.token(e, b)
				}
				return {
					start: e.start,
					end: e.pos,
					string: e.current(),
					className: f || null,
					state: b
				}
			},
			indentation: function (a) {
				return W(this.text, null, a)
			},
			getHTML: function (a, b, c, d) {
				function h(b, c) {
					if (!b) return;
					f && M && b.charAt(0) == " " && (b = "\u00a0" + b.slice(1)), f = !1;
					if (b.indexOf("	") == -1) {
						g += b.length;
						var d = db(b)
					} else {
						var d = "";
						for (var h = 0;;) {
							var i = b.indexOf("	", h);
							if (i == -1) {
								d += db(b.slice(h)), g += b.length - h;
								break
							}
							g += i - h;
							var j = a(g);
							d += db(b.slice(h, i)) + j.html, g += j.width, h = i + 1
						}
					}
					c ? e.push('<span class="', c, '">', d, "</span>") : e.push(d)
				}

				function p(a) {
					return a ? "cm-" + a.replace(/ +/g, " cm-") : null
				}
				var e = [],
					f = !0,
					g = 0,
					i = h;
				if (b != null) {
					var j = 0,
						k = '<span id="' + c + '">';
					i = function (a, c) {
						var f = a.length;
						if (b >= j && b < j + f) {
							b > j && (h(a.slice(0, b - j), c), d && e.push("<wbr>")), e.push(k);
							var g = b - j;
							h(window.opera ? a.slice(g, g + 1) : a.slice(g), c), e.push("</span>"), window.opera && h(a.slice(g + 1), c), b--, j += f
						} else j += f, h(a, c), j == b && j == o ? e.push(k + " </span>") : j > b + 10 && /\s/.test(a) && (i = function () {})
					}
				}
				var l = this.styles,
					m = this.text,
					n = this.marked,
					o = m.length;
				if (!m && b == null) i(" ");
				else if (!n || !n.length) for (var q = 0, r = 0; r < o; q += 2) {
					var s = l[q],
						t = l[q + 1],
						u = s.length;
					r + u > o && (s = s.slice(0, o - r)), r += u, i(s, p(t))
				} else {
					var v = 0,
						q = 0,
						w = "",
						t, x = 0,
						y = n[0].from || 0,
						z = [],
						A = 0;

					function B() {
						var a;
						while (A < n.length && ((a = n[A]).from == v || a.from == null)) a.style != null && z.push(a), ++A;
						y = A < n.length ? n[A].from : Infinity;
						for (var b = 0; b < z.length; ++b) {
							var c = z[b].to || Infinity;
							c == v ? z.splice(b--, 1) : y = Math.min(c, y)
						}
					}
					var C = 0;
					while (v < o) {
						y == v && B();
						var D = Math.min(o, y);
						for (;;) {
							if (w) {
								var E = v + w.length,
									F = t;
								for (var G = 0; G < z.length; ++G) F = (F ? F + " " : "") + z[G].style;
								i(E > D ? w.slice(0, D - v) : w, F);
								if (E >= D) {
									w = w.slice(D - v), v = D;
									break
								}
								v = E
							}
							w = l[q++], t = p(l[q++])
						}
					}
				}
				return e.join("")
			},
			cleanUp: function () {
				this.parent = null;
				if (this.marked) for (var a = 0, b = this.marked.length; a < b; ++a) this.marked[a].detach(this)
			}
		}, t.prototype = {
			chunkSize: function () {
				return this.lines.length
			},
			remove: function (a, b, c) {
				for (var d = a, e = a + b; d < e; ++d) {
					var f = this.lines[d];
					this.height -= f.height, f.cleanUp();
					if (f.handlers) for (var g = 0; g < f.handlers.length; ++g) c.push(f.handlers[g])
				}
				this.lines.splice(a, b)
			},
			collapse: function (a) {
				a.splice.apply(a, [a.length, 0].concat(this.lines))
			},
			insertHeight: function (a, b, c) {
				this.height += c, this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
				for (var d = 0, e = b.length; d < e; ++d) b[d].parent = this
			},
			iterN: function (a, b, c) {
				for (var d = a + b; a < d; ++a) if (c(this.lines[a])) return !0
			}
		}, u.prototype = {
			chunkSize: function () {
				return this.size
			},
			remove: function (a, b, c) {
				this.size -= b;
				for (var d = 0; d < this.children.length; ++d) {
					var e = this.children[d],
						f = e.chunkSize();
					if (a < f) {
						var g = Math.min(b, f - a),
							h = e.height;
						e.remove(a, g, c), this.height -= h - e.height, f == g && (this.children.splice(d--, 1), e.parent = null);
						if ((b -= g) == 0) break;
						a = 0
					} else a -= f
				}
				if (this.size - b < 25) {
					var i = [];
					this.collapse(i), this.children = [new t(i)], this.children[0].parent = this
				}
			},
			collapse: function (a) {
				for (var b = 0, c = this.children.length; b < c; ++b) this.children[b].collapse(a)
			},
			insert: function (a, b) {
				var c = 0;
				for (var d = 0, e = b.length; d < e; ++d) c += b[d].height;
				this.insertHeight(a, b, c)
			},
			insertHeight: function (a, b, c) {
				this.size += b.length, this.height += c;
				for (var d = 0, e = this.children.length; d < e; ++d) {
					var f = this.children[d],
						g = f.chunkSize();
					if (a <= g) {
						f.insertHeight(a, b, c);
						if (f.lines && f.lines.length > 50) {
							while (f.lines.length > 50) {
								var h = f.lines.splice(f.lines.length - 25, 25),
									i = new t(h);
								f.height -= i.height, this.children.splice(d + 1, 0, i), i.parent = this
							}
							this.maybeSpill()
						}
						break
					}
					a -= g
				}
			},
			maybeSpill: function () {
				if (this.children.length <= 10) return;
				var a = this;
				do {
					var b = a.children.splice(a.children.length - 5, 5),
						c = new u(b);
					if (!a.parent) {
						var d = new u(a.children);
						d.parent = a, a.children = [d, c], a = d
					} else {
						a.size -= c.size, a.height -= c.height;
						var e = fb(a.parent.children, a);
						a.parent.children.splice(e + 1, 0, c)
					}
					c.parent = a.parent
				} while (a.children.length > 10);
				a.parent.maybeSpill()
			},
			iter: function (a, b, c) {
				this.iterN(a, b - a, c)
			},
			iterN: function (a, b, c) {
				for (var d = 0, e = this.children.length; d < e; ++d) {
					var f = this.children[d],
						g = f.chunkSize();
					if (a < g) {
						var h = Math.min(b, g - a);
						if (f.iterN(a, h, c)) return !0;
						if ((b -= h) == 0) break;
						a = 0
					} else a -= g
				}
			}
		}, z.prototype = {
			addChange: function (a, b, c) {
				this.undone.length = 0;
				var d = +(new Date),
					e = this.done[this.done.length - 1],
					f = e && e[e.length - 1],
					g = d - this.time;
				if (this.compound && e && !this.closed) e.push({
					start: a,
					added: b,
					old: c
				});
				else if (g > 400 || !f || this.closed || f.start > a + c.length || f.start + f.added < a) this.done.push([{
					start: a,
					added: b,
					old: c
				}]), this.closed = !1;
				else {
					var h = Math.max(0, f.start - a),
						i = Math.max(0, a + c.length - (f.start + f.added));
					for (var j = h; j > 0; --j) f.old.unshift(c[j - 1]);
					for (var j = i; j > 0; --j) f.old.push(c[c.length - j]);
					h && (f.start = a), f.added += b - (c.length - h - i)
				}
				this.time = d
			},
			startCompound: function () {
				this.compound++ || (this.closed = !0)
			},
			endCompound: function () {
				--this.compound || (this.closed = !0)
			}
		}, a.e_stop = E, a.e_preventDefault = C, a.e_stopPropagation = D, a.connect = I, J.prototype = {
			set: function (a, b) {
				clearTimeout(this.id), this.id = setTimeout(b, a)
			}
		};
		var K = a.Pass = {
			toString: function () {
				return "CodeMirror.Pass"
			}
		},
			L = /gecko\/\d{7}/i.test(navigator.userAgent),
			M = /MSIE \d/.test(navigator.userAgent),
			N = /MSIE [1-8]\b/.test(navigator.userAgent),
			O = M && document.documentMode == 5,
			P = /WebKit\//.test(navigator.userAgent),
			Q = /Chrome\//.test(navigator.userAgent),
			R = /Apple Computer/.test(navigator.vendor),
			S = /KHTML\//.test(navigator.userAgent),
			T = function () {
				if (N) return !1;
				var a = document.createElement("div");
				return "draggable" in a || "dragDrop" in a
			}(),
			U = function () {
				var a = document.createElement("textarea");
				return a.value = "foo\nbar", a.value.indexOf("\r") > -1 ? "\r\n" : "\n"
			}(),
			V = /^$/;
		L ? V = /$'/ : R ? V = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/ : Q && (V = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/), document.documentElement.getBoundingClientRect != null && (Y = function (a, b) {
			try {
				var c = a.getBoundingClientRect();
				c = {
					top: c.top,
					left: c.left
				}
			} catch (d) {
				c = {
					top: 0,
					left: 0
				}
			}
			if (!b) if (window.pageYOffset == null) {
				var e = document.documentElement || document.body.parentNode;
				e.scrollTop == null && (e = document.body), c.top += e.scrollTop, c.left += e.scrollLeft
			} else c.top += window.pageYOffset, c.left += window.pageXOffset;
			return c
		});
		var cb = document.createElement("pre");
		db("a") == "\na" ? db = function (a) {
			return cb.textContent = a, cb.innerHTML.slice(1)
		} : db("	") != "	" && (db = function (a) {
			return cb.innerHTML = "", cb.appendChild(document.createTextNode(a)), cb.innerHTML
		}), a.htmlEscape = db;
		var hb = "\n\nb".split(/\n/).length != 3 ?
		function (a) {
			var b = 0,
				c, d = [];
			while ((c = a.indexOf("\n", b)) > -1) d.push(a.slice(b, a.charAt(c - 1) == "\r" ? c - 1 : c)), b = c + 1;
			return d.push(a.slice(b)), d
		} : function (a) {
			return a.split(/\r?\n/)
		};
		a.splitLines = hb;
		var ib = window.getSelection ?
		function (a) {
			try {
				return a.selectionStart != a.selectionEnd
			} catch (b) {
				return !1
			}
		} : function (a) {
			try {
				var b = a.ownerDocument.selection.createRange()
			} catch (c) {}
			return !b || b.parentElement() != a ? !1 : b.compareEndPoints("StartToEnd", b) != 0
		};
		a.defineMode("null", function () {
			return {
				token: function (a) {
					a.skipToEnd()
				}
			}
		}), a.defineMIME("text/plain", "null");
		var jb = {
			3: "Enter",
			8: "Backspace",
			9: "Tab",
			13: "Enter",
			16: "Shift",
			17: "Ctrl",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Esc",
			32: "Space",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "Left",
			38: "Up",
			39: "Right",
			40: "Down",
			44: "PrintScrn",
			45: "Insert",
			46: "Delete",
			59: ";",
			91: "Mod",
			92: "Mod",
			93: "Mod",
			127: "Delete",
			186: ";",
			187: "=",
			188: ",",
			189: "-",
			190: ".",
			191: "/",
			192: "`",
			219: "[",
			220: "\\",
			221: "]",
			222: "'",
			63276: "PageUp",
			63277: "PageDown",
			63275: "End",
			63273: "Home",
			63234: "Left",
			63232: "Up",
			63235: "Right",
			63233: "Down",
			63302: "Insert",
			63272: "Delete"
		};
		return a.keyNames = jb, function () {
			for (var a = 0; a < 10; a++) jb[a + 48] = String(a);
			for (var a = 65; a <= 90; a++) jb[a] = String.fromCharCode(a);
			for (var a = 1; a <= 12; a++) jb[a + 111] = jb[a + 63235] = "F" + a
		}(), a
	}();
CodeMirror.defineMode("htmlembedded", function (a, b) {
	function g(a, b) {
		return a.match(c, !1) ? (b.token = h, e.token(a, b.scriptState)) : f.token(a, b.htmlState)
	}

	function h(a, b) {
		return a.match(d, !1) ? (b.token = g, f.token(a, b.htmlState)) : e.token(a, b.scriptState)
	}
	var c = b.scriptStartRegex || /^<%/i,
		d = b.scriptEndRegex || /^%>/i,
		e, f;
	return {
		startState: function () {
			return e = e || CodeMirror.getMode(a, b.scriptingModeSpec), f = f || CodeMirror.getMode(a, "htmlmixed"), {
				token: b.startOpen ? h : g,
				htmlState: f.startState(),
				scriptState: e.startState()
			}
		},
		token: function (a, b) {
			return b.token(a, b)
		},
		indent: function (a, b) {
			return a.token == g ? f.indent(a.htmlState, b) : e.indent(a.scriptState, b)
		},
		copyState: function (a) {
			return {
				token: a.token,
				htmlState: CodeMirror.copyState(f, a.htmlState),
				scriptState: CodeMirror.copyState(e, a.scriptState)
			}
		},
		electricChars: "/{}:"
	}
}, "htmlmixed"), CodeMirror.defineMIME("application/x-ejs", {
	name: "htmlembedded",
	scriptingModeSpec: "javascript"
}), CodeMirror.defineMIME("application/x-aspx", {
	name: "htmlembedded",
	scriptingModeSpec: "text/x-csharp"
}), CodeMirror.defineMIME("application/x-jsp", {
	name: "htmlembedded",
	scriptingModeSpec: "text/x-java"
}), CodeMirror.defineMode("htmlmixed", function (a, b) {
	function f(a, b) {
		var f = c.token(a, b.htmlState);
		return f == "tag" && a.current() == ">" && b.htmlState.context && (/^script$/i.test(b.htmlState.context.tagName) ? (b.token = h, b.localState = d.startState(c.indent(b.htmlState, "")), b.mode = "javascript") : /^style$/i.test(b.htmlState.context.tagName) && (b.token = i, b.localState = e.startState(c.indent(b.htmlState, "")), b.mode = "css")), f
	}

	function g(a, b, c) {
		var d = a.current(),
			e = d.search(b);
		return e > -1 && a.backUp(d.length - e), c
	}

	function h(a, b) {
		return a.match(/^<\/\s*script\s*>/i, !1) ? (b.token = f, b.localState = null, b.mode = "html", f(a, b)) : g(a, /<\/\s*script\s*>/, d.token(a, b.localState))
	}

	function i(a, b) {
		return a.match(/^<\/\s*style\s*>/i, !1) ? (b.token = f, b.localState = null, b.mode = "html", f(a, b)) : g(a, /<\/\s*style\s*>/, e.token(a, b.localState))
	}
	var c = CodeMirror.getMode(a, {
		name: "xml",
		htmlMode: !0
	}),
		d = CodeMirror.getMode(a, "javascript"),
		e = CodeMirror.getMode(a, "css");
	return {
		startState: function () {
			var a = c.startState();
			return {
				token: f,
				localState: null,
				mode: "html",
				htmlState: a
			}
		},
		copyState: function (a) {
			if (a.localState) var b = CodeMirror.copyState(a.token == i ? e : d, a.localState);
			return {
				token: a.token,
				localState: b,
				mode: a.mode,
				htmlState: CodeMirror.copyState(c, a.htmlState)
			}
		},
		token: function (a, b) {
			return b.token(a, b)
		},
		indent: function (a, b) {
			return a.token == f || /^\s*<\//.test(b) ? c.indent(a.htmlState, b) : a.token == h ? d.indent(a.localState, b) : e.indent(a.localState, b)
		},
		compareStates: function (a, b) {
			return a.mode != b.mode ? !1 : a.localState ? CodeMirror.Pass : c.compareStates(a.htmlState, b.htmlState)
		},
		electricChars: "/{}:"
	}
}, "xml", "javascript", "css"), CodeMirror.defineMIME("text/html", "htmlmixed"), CodeMirror.defineMode("markdown", function (a, b) {
	function s(a, b, c) {
		return b.f = b.inline = c, c(a, b)
	}

	function t(a, b, c) {
		return b.f = b.block = c, c(a, b)
	}

	function u(a) {
		return a.em = !1, a.strong = !1, null
	}

	function v(a, b) {
		var c;
		if (b.indentationDiff >= 4) return b.indentation -= b.indentationDiff, a.skipToEnd(), e;
		if (a.eatSpace()) return null;
		if (a.peek() === "#" || a.match(q)) b.header = !0;
		else if (a.eat(">")) b.indentation++, b.quote = !0;
		else {
			if (a.peek() === "[") return s(a, b, C);
			if (a.match(n, !0)) return h;
			if (c = a.match(o, !0) || a.match(p, !0)) return b.indentation += c[0].length, g
		}
		return s(a, b, b.inline)
	}

	function w(a, b) {
		var d = c.token(a, b.htmlState);
		return d === "tag" && b.htmlState.type !== "openTag" && !b.htmlState.context && (b.f = z, b.block = v), d
	}

	function x(a) {
		var b = [];
		return a.strong ? b.push(a.em ? m : l) : a.em && b.push(k), a.header && b.push(d), a.quote && b.push(f), b.length ? b.join(" ") : null
	}

	function y(a, b) {
		return a.match(r, !0) ? x(b) : undefined
	}

	function z(a, b) {
		var c = b.text(a, b);
		if (typeof c != "undefined") return c;
		var d = a.next();
		if (d === "\\") return a.next(), x(b);
		if (d === "`") return s(a, b, F(e, "`"));
		if (d === "[") return s(a, b, A);
		if (d === "<" && a.match(/^\w/, !1)) return a.backUp(1), t(a, b, w);
		var f = x(b);
		return d === "*" || d === "_" ? a.eat(d) ? (b.strong = !b.strong) ? x(b) : f : (b.em = !b.em) ? x(b) : f : x(b)
	}

	function A(a, b) {
		while (!a.eol()) {
			var c = a.next();
			c === "\\" && a.next();
			if (c === "]") return b.inline = b.f = B, i
		}
		return i
	}

	function B(a, b) {
		a.eatSpace();
		var c = a.next();
		return c === "(" || c === "[" ? s(a, b, F(j, c === "(" ? ")" : "]")) : "error"
	}

	function C(a, b) {
		return a.match(/^[^\]]*\]:/, !0) ? (b.f = D, i) : s(a, b, z)
	}

	function D(a, b) {
		return a.eatSpace(), a.match(/^[^\s]+/, !0), b.f = b.inline = z, j
	}

	function E(a) {
		return E[a] || (E[a] = new RegExp("^(?:[^\\\\\\" + a + "]|\\\\.)*(?:\\" + a + "|$)")), E[a]
	}

	function F(a, b, c) {
		return c = c || z, function (d, e) {
			return d.match(E(b)), e.inline = e.f = c, a
		}
	}
	var c = CodeMirror.getMode(a, {
		name: "xml",
		htmlMode: !0
	}),
		d = "header",
		e = "comment",
		f = "quote",
		g = "string",
		h = "hr",
		i = "link",
		j = "string",
		k = "em",
		l = "strong",
		m = "emstrong",
		n = /^([*\-=_])(?:\s*\1){2,}\s*$/,
		o = /^[*\-+]\s+/,
		p = /^[0-9]+\.\s+/,
		q = /^(?:\={3,}|-{3,})$/,
		r = /^[^\[*_\\<>`]+/;
	return {
		startState: function () {
			return {
				f: v,
				block: v,
				htmlState: c.startState(),
				indentation: 0,
				inline: z,
				text: y,
				em: !1,
				strong: !1,
				header: !1,
				quote: !1
			}
		},
		copyState: function (a) {
			return {
				f: a.f,
				block: a.block,
				htmlState: CodeMirror.copyState(c, a.htmlState),
				indentation: a.indentation,
				inline: a.inline,
				text: a.text,
				em: a.em,
				strong: a.strong,
				header: a.header,
				quote: a.quote
			}
		},
		token: function (a, b) {
			if (a.sol()) {
				if (a.match(/^\s*$/, !0)) return u(b);
				b.header = !1, b.quote = !1, b.f = b.block;
				var c = a.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length;
				b.indentationDiff = c - b.indentation, b.indentation = c;
				if (c > 0) return null
			}
			return b.f(a, b)
		},
		blankLine: u,
		getType: x
	}
}, "xml"), CodeMirror.defineMIME("text/x-markdown", "markdown"), CodeMirror.defineMode("xml", function (a, b) {
	function h(a, b) {
		function c(c) {
			return b.tokenize = c, c(a, b)
		}
		var d = a.next();
		if (d == "<") {
			if (a.eat("!")) return a.eat("[") ? a.match("CDATA[") ? c(k("atom", "]]>")) : null : a.match("--") ? c(k("comment", "-->")) : a.match("DOCTYPE", !0, !0) ? (a.eatWhile(/[\w\._\-]/), c(l(1))) : null;
			if (a.eat("?")) return a.eatWhile(/[\w\._\-]/), b.tokenize = k("meta", "?>"), "meta";
			g = a.eat("/") ? "closeTag" : "openTag", a.eatSpace(), f = "";
			var e;
			while (e = a.eat(/[^\s\u00a0=<>\"\'\/?]/)) f += e;
			return b.tokenize = i, "tag"
		}
		if (d == "&") {
			var h;
			return a.eat("#") ? a.eat("x") ? h = a.eatWhile(/[a-fA-F\d]/) && a.eat(";") : h = a.eatWhile(/[\d]/) && a.eat(";") : h = a.eatWhile(/[\w\.\-:]/) && a.eat(";"), h ? "atom" : "error"
		}
		return a.eatWhile(/[^&<]/), null
	}

	function i(a, b) {
		var c = a.next();
		return c == ">" || c == "/" && a.eat(">") ? (b.tokenize = h, g = c == ">" ? "endTag" : "selfcloseTag", "tag") : c == "=" ? (g = "equals", null) : /[\'\"]/.test(c) ? (b.tokenize = j(c), b.tokenize(a, b)) : (a.eatWhile(/[^\s\u00a0=<>\"\'\/?]/), "word")
	}

	function j(a) {
		return function (b, c) {
			while (!b.eol()) if (b.next() == a) {
				c.tokenize = i;
				break
			}
			return "string"
		}
	}

	function k(a, b) {
		return function (c, d) {
			while (!c.eol()) {
				if (c.match(b)) {
					d.tokenize = h;
					break
				}
				c.next()
			}
			return a
		}
	}

	function l(a) {
		return function (b, c) {
			var d;
			while ((d = b.next()) != null) {
				if (d == "<") return c.tokenize = l(a + 1), c.tokenize(b, c);
				if (d == ">") {
					if (a == 1) {
						c.tokenize = h;
						break
					}
					return c.tokenize = l(a - 1), c.tokenize(b, c)
				}
			}
			return "meta"
		}
	}

	function o() {
		for (var a = arguments.length - 1; a >= 0; a--) m.cc.push(arguments[a])
	}

	function p() {
		return o.apply(null, arguments), !0
	}

	function q(a, b) {
		var c = d.doNotIndent.hasOwnProperty(a) || m.context && m.context.noIndent;
		m.context = {
			prev: m.context,
			tagName: a,
			indent: m.indented,
			startOfLine: b,
			noIndent: c
		}
	}

	function r() {
		m.context && (m.context = m.context.prev)
	}

	function s(a) {
		if (a == "openTag") return m.tagName = f, p(w, t(m.startOfLine));
		if (a == "closeTag") {
			var b = !1;
			return m.context ? m.context.tagName != f && (d.implicitlyClosed.hasOwnProperty(m.context.tagName.toLowerCase()) && r(), b = !m.context || m.context.tagName != f) : b = !0, b && (n = "error"), p(u(b))
		}
		return p()
	}

	function t(a) {
		return function (b) {
			return b == "selfcloseTag" || b == "endTag" && d.autoSelfClosers.hasOwnProperty(m.tagName.toLowerCase()) ? (v(m.tagName.toLowerCase()), p()) : b == "endTag" ? (v(m.tagName.toLowerCase()), q(m.tagName, a), p()) : p()
		}
	}

	function u(a) {
		return function (b) {
			return a && (n = "error"), b == "endTag" ? (r(), p()) : (n = "error", p(arguments.callee))
		}
	}

	function v(a) {
		var b;
		for (;;) {
			if (!m.context) return;
			b = m.context.tagName.toLowerCase();
			if (!d.contextGrabbers.hasOwnProperty(b) || !d.contextGrabbers[b].hasOwnProperty(a)) return;
			r()
		}
	}

	function w(a) {
		return a == "word" ? (n = "attribute", p(x, w)) : a == "endTag" || a == "selfcloseTag" ? o() : (n = "error", p(w))
	}

	function x(a) {
		return a == "equals" ? p(y, w) : (d.allowMissing || (n = "error"), a == "endTag" || a == "selfcloseTag" ? o() : p())
	}

	function y(a) {
		return a == "string" ? p(z) : a == "word" && d.allowUnquoted ? (n = "string", p()) : (n = "error", a == "endTag" || a == "selfCloseTag" ? o() : p())
	}

	function z(a) {
		return a == "string" ? p(z) : o()
	}
	var c = a.indentUnit,
		d = b.htmlMode ? {
			autoSelfClosers: {
				area: !0,
				base: !0,
				br: !0,
				col: !0,
				command: !0,
				embed: !0,
				frame: !0,
				hr: !0,
				img: !0,
				input: !0,
				keygen: !0,
				link: !0,
				meta: !0,
				param: !0,
				source: !0,
				track: !0,
				wbr: !0
			},
			implicitlyClosed: {
				dd: !0,
				li: !0,
				optgroup: !0,
				option: !0,
				p: !0,
				rp: !0,
				rt: !0,
				tbody: !0,
				td: !0,
				tfoot: !0,
				th: !0,
				tr: !0
			},
			contextGrabbers: {
				dd: {
					dd: !0,
					dt: !0
				},
				dt: {
					dd: !0,
					dt: !0
				},
				li: {
					li: !0
				},
				option: {
					option: !0,
					optgroup: !0
				},
				optgroup: {
					optgroup: !0
				},
				p: {
					address: !0,
					article: !0,
					aside: !0,
					blockquote: !0,
					dir: !0,
					div: !0,
					dl: !0,
					fieldset: !0,
					footer: !0,
					form: !0,
					h1: !0,
					h2: !0,
					h3: !0,
					h4: !0,
					h5: !0,
					h6: !0,
					header: !0,
					hgroup: !0,
					hr: !0,
					menu: !0,
					nav: !0,
					ol: !0,
					p: !0,
					pre: !0,
					section: !0,
					table: !0,
					ul: !0
				},
				rp: {
					rp: !0,
					rt: !0
				},
				rt: {
					rp: !0,
					rt: !0
				},
				tbody: {
					tbody: !0,
					tfoot: !0
				},
				td: {
					td: !0,
					th: !0
				},
				tfoot: {
					tbody: !0
				},
				th: {
					td: !0,
					th: !0
				},
				thead: {
					tbody: !0,
					tfoot: !0
				},
				tr: {
					tr: !0
				}
			},
			doNotIndent: {
				pre: !0
			},
			allowUnquoted: !0,
			allowMissing: !1
		} : {
			autoSelfClosers: {},
			implicitlyClosed: {},
			contextGrabbers: {},
			doNotIndent: {},
			allowUnquoted: !1,
			allowMissing: !1
		},
		e = b.alignCDATA,
		f, g, m, n;
	return {
		startState: function () {
			return {
				tokenize: h,
				cc: [],
				indented: 0,
				startOfLine: !0,
				tagName: null,
				context: null
			}
		},
		token: function (a, b) {
			a.sol() && (b.startOfLine = !0, b.indented = a.indentation());
			if (a.eatSpace()) return null;
			n = g = f = null;
			var c = b.tokenize(a, b);
			b.type = g;
			if ((c || g) && c != "comment") {
				m = b;
				for (;;) {
					var d = b.cc.pop() || s;
					if (d(g || c)) break
				}
			}
			return b.startOfLine = !1, n || c
		},
		indent: function (a, b, d) {
			var f = a.context;
			if (a.tokenize != i && a.tokenize != h || f && f.noIndent) return d ? d.match(/^(\s*)/)[0].length : 0;
			if (e && /<!\[CDATA\[/.test(b)) return 0;
			f && /^<\//.test(b) && (f = f.prev);
			while (f && !f.startOfLine) f = f.prev;
			return f ? f.indent + c : 0
		},
		compareStates: function (a, b) {
			if (a.indented != b.indented || a.tokenize != b.tokenize) return !1;
			for (var c = a.context, d = b.context;; c = c.prev, d = d.prev) {
				if (!c || !d) return c == d;
				if (c.tagName != d.tagName) return !1
			}
		},
		electricChars: "/"
	}
}), CodeMirror.defineMIME("application/xml", "xml"), CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
	name: "xml",
	htmlMode: !0
}), CodeMirror.tagRangeFinder = function (a, b, c) {
	var d = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
		e = d + "-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
		f = new RegExp("^[" + d + "][" + e + "]*"),
		g = a.getLine(b),
		h = !1,
		i = null,
		j = 0;
	while (!h) {
		j = g.indexOf("<", j);
		if (-1 == j) return;
		if (j + 1 < g.length && g[j + 1] == "/") {
			j++;
			continue
		}
		if (!g.substr(j + 1).match(f)) {
			j++;
			continue
		}
		var k = g.indexOf(">", j + 1);
		if (-1 == k) {
			var l = b + 1,
				m = !1,
				n = a.lineCount();
			while (l < n && !m) {
				var o = a.getLine(l),
					p = o.indexOf(">");
				if (-1 != p) {
					m = !0;
					var q = o.lastIndexOf("/", p);
					if (-1 != q && q < p) {
						var r = g.substr(q, p - q + 1);
						if (!r.match(/\/\s*\>/)) return c === !0 && l++, l
					}
				}
				l++
			}
			h = !0
		} else {
			var s = g.lastIndexOf("/", k);
			if (-1 == s) h = !0;
			else {
				var r = g.substr(s, k - s + 1);
				r.match(/\/\s*\>/) || (h = !0)
			}
		}
		if (h) {
			var t = g.substr(j + 1);
			i = t.match(f), i ? (i = i[0], -1 != g.indexOf("</" + i + ">", j) && (h = !1)) : h = !1
		}
		h || j++
	}
	if (h) {
		var u = "(\\<\\/" + i + "\\>)|(\\<" + i + "\\>)|(\\<" + i + "\\s)|(\\<" + i + "$)",
			v = new RegExp(u, "g"),
			w = "</" + i + ">",
			x = 1,
			l = b + 1,
			n = a.lineCount();
		while (l < n) {
			g = a.getLine(l);
			var y = g.match(v);
			if (y) for (var z = 0; z < y.length; z++) {
				y[z] == w ? x-- : x++;
				if (!x) return c === !0 && l++, l
			}
			l++
		}
		return
	}
}, CodeMirror.braceRangeFinder = function (a, b, c) {
	var d = a.getLine(b),
		e = d.lastIndexOf("{");
	if (e < 0 || d.lastIndexOf("}") > e) return;
	var f = a.getTokenAt({
		line: b,
		ch: e
	}).className,
		g = 1,
		h = a.lineCount(),
		i;
	a: for (var j = b + 1; j < h; ++j) {
		var k = a.getLine(j),
			l = 0;
		for (;;) {
			var m = k.indexOf("{", l),
				n = k.indexOf("}", l);
			m < 0 && (m = k.length), n < 0 && (n = k.length), l = Math.min(m, n);
			if (l == k.length) break;
			if (a.getTokenAt({
				line: j,
				ch: l + 1
			}).className == f) if (l == m)++g;
			else if (!--g) {
				i = j;
				break a
			}++l
		}
	}
	if (i == null || i == b + 1) return;
	return c === !0 && i++, i
}, CodeMirror.indentRangeFinder = function (a, b) {
	var c = a.getOption("tabSize"),
		d = a.getLineHandle(b).indentation(c),
		e;
	for (var f = b + 1, g = a.lineCount(); f < g; ++f) {
		var h = a.getLineHandle(f);
		if (!/^\s*$/.test(h.text)) {
			if (h.indentation(c) <= d) break;
			e = f
		}
	}
	return e ? e + 1 : null
}, CodeMirror.newFoldFunction = function (a, b, c) {
	function e(a, b) {
		for (var c = 0; c < d.length; ++c) {
			var e = a.lineInfo(d[c].start);
			if (!e) d.splice(c--, 1);
			else if (e.line == b) return {
				pos: c,
				region: d[c]
			}
		}
	}

	function f(a, b) {
		a.clearMarker(b.start);
		for (var c = 0; c < b.hidden.length; ++c) a.showLine(b.hidden[c])
	}
	var d = [];
	return b == null && (b = '<div style="position: absolute; left: 2px; color:#600">&#x25bc;</div>%N%'), function (g, h) {
		g.operation(function () {
			var i = e(g, h);
			if (i) d.splice(i.pos, 1), f(g, i.region);
			else {
				var j = a(g, h, c);
				if (j == null) return;
				var k = [];
				for (var l = h + 1; l < j; ++l) {
					var m = g.hideLine(l);
					m && k.push(m)
				}
				var n = g.setMarker(h, b),
					o = {
						start: n,
						hidden: k
					};
				g.onDeleteLine(n, function () {
					f(g, o)
				}), d.push(o)
			}
		})
	}
}, function () {
	function a(a, b, c, d) {
		this.atOccurrence = !1, this.cm = a, d == null && typeof b == "string" && (d = !1), c = c ? a.clipPos(c) : {
			line: 0,
			ch: 0
		}, this.pos = {
			from: c,
			to: c
		};
		if (typeof b != "string") this.matches = function (c, d) {
			if (c) {
				var e = a.getLine(d.line).slice(0, d.ch),
					f = e.match(b),
					g = 0;
				while (f) {
					var h = e.indexOf(f[0]);
					g += h, e = e.slice(h + 1);
					var i = e.match(b);
					if (!i) break;
					f = i, g++
				}
			} else var e = a.getLine(d.line).slice(d.ch),
				f = e.match(b),
				g = f && d.ch + e.indexOf(f[0]);
			if (f) return {
				from: {
					line: d.line,
					ch: g
				},
				to: {
					line: d.line,
					ch: g + f[0].length
				},
				match: f
			}
		};
		else {
			d && (b = b.toLowerCase());
			var e = d ?
			function (a) {
				return a.toLowerCase()
			} : function (a) {
				return a
			}, f = b.split("\n");
			f.length == 1 ? this.matches = function (c, d) {
				var f = e(a.getLine(d.line)),
					g = b.length,
					h;
				if (c ? d.ch >= g && (h = f.lastIndexOf(b, d.ch - g)) != -1 : (h = f.indexOf(b, d.ch)) != -1) return {
					from: {
						line: d.line,
						ch: h
					},
					to: {
						line: d.line,
						ch: h + g
					}
				}
			} : this.matches = function (b, c) {
				var d = c.line,
					g = b ? f.length - 1 : 0,
					h = f[g],
					i = e(a.getLine(d)),
					j = b ? i.indexOf(h) + h.length : i.lastIndexOf(h);
				if (b ? j >= c.ch || j != h.length : j <= c.ch || j != i.length - h.length) return;
				for (;;) {
					if (b ? !d : d == a.lineCount() - 1) return;
					i = e(a.getLine(d += b ? -1 : 1)), h = f[b ? --g : ++g];
					if (g > 0 && g < f.length - 1) {
						if (i != h) return;
						continue
					}
					var k = b ? i.lastIndexOf(h) : i.indexOf(h) + h.length;
					if (b ? k != i.length - h.length : k != h.length) return;
					var l = {
						line: c.line,
						ch: j
					},
						m = {
							line: d,
							ch: k
						};
					return {
						from: b ? m : l,
						to: b ? l : m
					}
				}
			}
		}
	}
	a.prototype = {
		findNext: function () {
			return this.find(!1)
		},
		findPrevious: function () {
			return this.find(!0)
		},
		find: function (a) {
			function d(a) {
				var c = {
					line: a,
					ch: 0
				};
				return b.pos = {
					from: c,
					to: c
				}, b.atOccurrence = !1, !1
			}
			var b = this,
				c = this.cm.clipPos(a ? this.pos.from : this.pos.to);
			for (;;) {
				if (this.pos = this.matches(a, c)) return this.atOccurrence = !0, this.pos.match || !0;
				if (a) {
					if (!c.line) return d(0);
					c = {
						line: c.line - 1,
						ch: this.cm.getLine(c.line - 1).length
					}
				} else {
					var e = this.cm.lineCount();
					if (c.line == e - 1) return d(e);
					c = {
						line: c.line + 1,
						ch: 0
					}
				}
			}
		},
		from: function () {
			if (this.atOccurrence) return this.pos.from
		},
		to: function () {
			if (this.atOccurrence) return this.pos.to
		},
		replace: function (a) {
			var b = this;
			this.atOccurrence && (b.pos.to = this.cm.replaceRange(a, b.pos.from, b.pos.to))
		}
	}, CodeMirror.defineExtension("getSearchCursor", function (b, c, d) {
		return new a(this, b, c, d)
	})
}(), function () {
	function b() {
		this.marked = []
	}

	function c(a) {
		return a._matchHighlightState || (a._matchHighlightState = new b)
	}

	function d(a) {
		var b = c(a);
		for (var d = 0; d < b.marked.length; ++d) b.marked[d].clear();
		b.marked = []
	}

	function e(b, e, f) {
		d(b), f = typeof f != "undefined" ? f : a;
		if (b.somethingSelected() && b.getSelection().replace(/^\s+|\s+$/g, "").length >= f) {
			var g = c(b),
				h = b.getSelection();
			b.operation(function () {
				if (b.lineCount() < 2e3) for (var a = b.getSearchCursor(h); a.findNext();)(a.from().line !== b.getCursor(!0).line || a.from().ch !== b.getCursor(!0).ch) && g.marked.push(b.markText(a.from(), a.to(), e))
			})
		}
	}
	var a = 2;
	CodeMirror.defineExtension("matchHighlight", function (a, b) {
		e(this, a, b)
	})
}(), function () {
	function a(a, c, d, e) {
		b(a, c, e) ? (a.replaceSelection("\n\n</" + e + ">", "end"), a.indentLine(d.line + 1), a.indentLine(d.line + 2), a.setCursor({
			line: d.line + 1,
			ch: a.getLine(d.line + 1).length
		})) : (a.replaceSelection("</" + e + ">"), a.setCursor(d))
	}

	function b(a, b, d) {
		if (typeof b == "undefined" || b == null || b == 1) b = a.getOption("closeTagIndent");
		return b || (b = []), c(b, d.toLowerCase()) != -1
	}

	function c(a, b) {
		if (a.indexOf) return a.indexOf(b);
		for (var c = 0, d = a.length; c < d; ++c) if (a[c] == b) return c;
		return -1
	}

	function d(a, b, c) {
		a.replaceSelection("/" + c + ">"), a.setCursor({
			line: b.line,
			ch: b.ch + c.length + 2
		})
	}
	CodeMirror.defaults.closeTagEnabled = !0, CodeMirror.defaults.closeTagIndent = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"], CodeMirror.defineExtension("closeTag", function (b, c, e) {
		if (!b.getOption("closeTagEnabled")) throw CodeMirror.Pass;
		var f = b.getOption("mode");
		if (f == "text/html") {
			var g = b.getCursor(),
				h = b.getTokenAt(g),
				i = h.state;
			if (i.mode && i.mode != "html") throw CodeMirror.Pass;
			if (c == ">") {
				var j = i.htmlState ? i.htmlState.type : i.type;
				if (h.className == "tag" && j == "closeTag") throw CodeMirror.Pass;
				b.replaceSelection(">"), g = {
					line: g.line,
					ch: g.ch + 1
				}, b.setCursor(g), h = b.getTokenAt(b.getCursor()), i = h.state, j = i.htmlState ? i.htmlState.type : i.type;
				if (h.className == "tag" && j != "selfcloseTag") {
					var k = i.htmlState ? i.htmlState.context.tagName : i.tagName;
					k.length > 0 && a(b, e, g, k);
					return
				}
				b.setSelection({
					line: g.line,
					ch: g.ch - 1
				}, g), b.replaceSelection("")
			} else if (c == "/" && h.className == "tag" && h.string == "<") {
				var k = i.htmlState ? i.htmlState.context ? i.htmlState.context.tagName : "" : i.context.tagName;
				if (k.length > 0) {
					d(b, g, k);
					return
				}
			}
		}
		throw CodeMirror.Pass
	})
}()