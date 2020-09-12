import Vec2, { Direction } from './Vec2';

export default class Snake {
	private _displacement = new Vec2(0, 0);
	private _heading = Direction.UP;
	private _speed: number;
	private _tail: Vec2[];

	constructor(speed: number, tail?: Vec2[]) {
		this._speed = speed;
		this._tail = tail ?? [];
	}

	static from(other: Snake): Snake {
		return new Snake(other.speed, other.tail);
	}

	get displacement() {
		return this._displacement;
	}

	get heading() {
		return this._heading;
	}

	get speed(): number {
		return this._speed;
	}

	get tail(): Vec2[] {
		return this._tail;
	}

	turn(direction: Direction): [boolean, Direction] {
		const can_turn: boolean = !(direction as Vec2).inversionOf(this.heading as Vec2) || direction === this.heading;
		if (can_turn) {
			this._heading = direction;
		}
		return [can_turn, this.heading];
	}

	go(): Vec2 {
		if (this.heading === Direction.UP) {
			this._displacement.y += 1;
		} else if (this.heading === Direction.RIGHT) {
			this._displacement.x += 1;
		} else if (this.heading === Direction.DOWN) {
			this._displacement.y -= 1;
		} else if (this.heading === Direction.LEFT) {
			this._displacement.x -= 1;
		}
		return this.displacement;
	}
}