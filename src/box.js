var { vec, dot } = require("./math");

function createBox(el) {
  if (!el) return;
  var r = el.getBoundingClientRect();
  if (r.height > 0 || r.width > 0) {
    return new Box(el, r);
  }
}

function Box(el, r) {
  this.el = el;
  this._r = r;
}

Box.prototype.contains = function(pos, base) {
  var c = this.center();
  var v = vec(c, this.bound(base.down));
  var h = vec(c, this.bound(base.right));
  var x = vec(c, pos);
  return (
    2 * Math.abs(dot(v, x)) <= this._r.height &&
    2 * Math.abs(dot(h, x)) <= this._r.width
  );
};

Box.prototype.center = function() {
  return {
    x: this._r.left + this._r.width  / 2,
    y: this._r.top  + this._r.height / 2,
  };
};

Box.prototype.bound = function(d) {
  return {
    x: this._r.left + this._r.width  * (1 + d.x) / 2,
    y: this._r.top  + this._r.height * (1 + d.y) / 2,
  };
};

module.exports = { Box, createBox };
