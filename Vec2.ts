type VectorLike = { x: number, y: number };

export default class Vec2 implements VectorLike {

	constructor(public x: number, public y: number) {
	}

	static from(vec_like: VectorLike): Vec2 {
		return new Vec2(vec_like.x, vec_like.y);
	}

	static invert(vec: Vec2): Vec2 {
		return new Vec2(-vec.x, -vec.y);
	}

	static inversionOf(vec_a: Vec2, vec_b: Vec2): boolean {
		return vec_a.x === vec_b.x && vec_a.y === -vec_b.y;
	}

	static add(vec_a: Vec2, vec_b: Vec2): Vec2 {
		return new Vec2(
			vec_a.x + vec_b.x,
			vec_a.y + vec_b.y
		);
	}

	inversionOf(other: Vec2): boolean {
		return Vec2.inversionOf(this, other);
	}

	invert(): Vec2 {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	add(other: Vec2): Vec2 {
		this.x += other.x;
		this.y += other.y;
		return this;
	}
}

export class Direction implements VectorLike {

	static readonly UP = new Direction(0, 1);
	static readonly RIGHT = new Direction(1, 0);
	static readonly DOWN = new Direction(0, -1);
	static readonly LEFT = new Direction(-1, 0);

	private constructor(public x: number, public y: number) {
	}
}