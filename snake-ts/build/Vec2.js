export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static from(vec_like) {
        return new Vec2(vec_like.x, vec_like.y);
    }
    static invert(vec) {
        return new Vec2(-vec.x, -vec.y);
    }
    static inversionOf(vec_a, vec_b) {
        return vec_a.x === vec_b.x && vec_a.y === -vec_b.y;
    }
    static add(vec_a, vec_b) {
        return new Vec2(vec_a.x + vec_b.x, vec_a.y + vec_b.y);
    }
    inversionOf(other) {
        return Vec2.inversionOf(this, other);
    }
    invert() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
}
export class Direction {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
Direction.UP = new Direction(0, 1);
Direction.RIGHT = new Direction(1, 0);
Direction.DOWN = new Direction(0, -1);
Direction.LEFT = new Direction(-1, 0);
//# sourceMappingURL=Vec2.js.map