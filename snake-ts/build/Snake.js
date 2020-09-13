import Vec2, { Direction } from './Vec2';
export default class Snake {
    constructor(speed, tail) {
        this._displacement = new Vec2(0, 0);
        this._heading = Direction.UP;
        this._speed = speed;
        this._tail = tail ?? [];
    }
    static from(other) {
        return new Snake(other.speed, other.tail);
    }
    get displacement() {
        return this._displacement;
    }
    get heading() {
        return this._heading;
    }
    get speed() {
        return this._speed;
    }
    get tail() {
        return this._tail;
    }
    turn(direction) {
        const can_turn = !direction.inversionOf(this.heading) || direction === this.heading;
        if (can_turn) {
            this._heading = direction;
        }
        return [can_turn, this.heading];
    }
    go() {
        if (this.heading === Direction.UP) {
            this._displacement.y += 1;
        }
        else if (this.heading === Direction.RIGHT) {
            this._displacement.x += 1;
        }
        else if (this.heading === Direction.DOWN) {
            this._displacement.y -= 1;
        }
        else if (this.heading === Direction.LEFT) {
            this._displacement.x -= 1;
        }
        return this.displacement;
    }
}
//# sourceMappingURL=Snake.js.map