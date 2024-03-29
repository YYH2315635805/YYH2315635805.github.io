! function(e, l) {
	"use strict";

	function t(l, t) {
		this.element = l, this.settings = e.extend({}, i, t), this._defaults = i, this._name = s, this.init()
	}
	var s = "scrollie",
		i = {
			direction: "both",
			scrollOffset: 0,
			speed: 2,
			scrollingInView: null,
			ScrollingToTheTop: null,
			ScrollingOutOfView: null,
			scrolledOutOfView: null
		};
	t.prototype = {
		init: function() {
			this._defineElements(), this._scrollEvent()
		},
		_defineElements: function() {
			var l = this;
			l.$scrollElement = e(l.element), l.$elemHeight = l.$scrollElement.outerHeight(), l.$elemPosTop = l.$scrollElement.offset().top, l.$scrollOffset = l.$scrollElement.data("scrollie-offset") || "0" == l.$scrollElement.data("scrollie-offset") ? l.$scrollElement.data("scrollie-offset") : l.settings.scrollOffset, l.$scrollSpeed = l.$scrollElement.data("scrollie-speed") || "0" == l.$scrollElement.data("scrollie-speed") ? l.$scrollElement.data("scrollie-speed") : l.settings.speed
		},
		_inMotion: function(e, l, t, s) {
			var i = this,
				n = -1 * (-1 * (e - t) - l),
				o = -1 * (e - t) / i.$scrollSpeed,
				c = n < l + i.$elemHeight,
				r = n > 0 - i.$scrollOffset,
				f = r && l > n,
				u = r && c,
				h = n > l - i.$scrollOffset && c;
			f && jQuery.isFunction(i.settings.ScrollingToTheTop) && i.settings.ScrollingToTheTop.call(this, this.$scrollElement, i.$scrollOffset, s, n, o, t, e), u && jQuery.isFunction(i.settings.scrollingInView) && i.settings.scrollingInView.call(this, this.$scrollElement, i.$scrollOffset, s, n, o, t, e), h && jQuery.isFunction(i.settings.ScrollingOutOfView) && i.settings.ScrollingOutOfView.call(this, this.$scrollElement, i.$scrollOffset, s, n, o, t, e), c || jQuery.isFunction(i.settings.scrolledOutOfView) && i.settings.scrolledOutOfView.call(this, this.$scrollElement, i.$scrollOffset, s, n, o, t, e)
		},
		_scrollEvent: function() {
			var t = this,
				s = t.settings.direction,
				i = 0,
				n = !0;
			setInterval(function() {
				n = !0
			}, 66), e(l).on("scroll", function() {
				var l = e(this).scrollTop(),
					o = e(this).height(),
					c = l > i ? "up" : "down";
				c === s && n === !0 ? (n = !1, t._inMotion(l, o, t.$elemPosTop, c)) : "both" === s && n === !0 && (n = !1, t._inMotion(l, o, t.$elemPosTop, c)), i = l
			})
		}
	}, e.fn[s] = function(l) {
		return this.each(function() {
			e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new t(this, l))
		})
	}
}(jQuery, window, document);