(function () {
    'use strict';

    var InterruptCode;
    (function (InterruptCode) {
        InterruptCode[InterruptCode["EXIT"] = 0] = "EXIT";
        InterruptCode[InterruptCode["PAUSE"] = 1] = "PAUSE";
        InterruptCode[InterruptCode["RESET"] = 2] = "RESET";
        InterruptCode[InterruptCode["NONE"] = 3] = "NONE";
    })(InterruptCode || (InterruptCode = {}));
    var GameState;
    (function (GameState) {
        GameState[GameState["GAME_OVER"] = 0] = "GAME_OVER";
        GameState[GameState["RUNNING"] = 1] = "RUNNING";
        GameState[GameState["PAUSED"] = 2] = "PAUSED";
        GameState[GameState["MENU"] = 3] = "MENU";
    })(GameState || (GameState = {}));
    class Game {
        constructor(snake, grid, mainFn, evalFn = () => GameState.RUNNING) {
            this.snake = snake;
            this.grid = grid;
            this.mainFn = mainFn;
            this.evalFn = evalFn;
            this._tick = 0;
            this._state = GameState.RUNNING;
        }
        get tick() {
            return this._tick;
        }
        get state() {
            return this._state;
        }
        handleInterrupt(code) {
            switch (code) {
                case InterruptCode.EXIT:
                    this._state = GameState.GAME_OVER;
                    break;
                case InterruptCode.PAUSE:
                    this._state = GameState.PAUSED;
                    break;
                case InterruptCode.RESET:
                    this._state = GameState.MENU;
                    break;
            }
            return this._state;
        }
        async execute() {
            while (this.state !== GameState.GAME_OVER) {
                const [state, snake] = await this.mainFn(this.snake);
                this._tick += 1;
            }
        }
    }

    class Vec2 {
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
    class Direction {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    Direction.UP = new Direction(0, 1);
    Direction.RIGHT = new Direction(1, 0);
    Direction.DOWN = new Direction(0, -1);
    Direction.LEFT = new Direction(-1, 0);

    class Snake {
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

    class Grid {
        constructor(len) {
            this._tiles = new Array(len);
            for (let i = 0; i < len; ++i) {
                this._tiles.push(new Array(len));
            }
        }
    }

    const main = async (snake) => {
        let VALID_KEY;
        (function (VALID_KEY) {
            VALID_KEY["UP"] = "UP";
            VALID_KEY["RIGHT"] = "RIGHT";
            VALID_KEY["DOWN"] = "DOWN";
            VALID_KEY["LEFT"] = "LEFT";
            VALID_KEY["UNKNOWN"] = "UNKNOWN";
            VALID_KEY["NONE"] = "NONE";
        })(VALID_KEY || (VALID_KEY = {}));
        const keyToVK = (key_str) => {
            switch (key_str) {
                case `ArrowUp`: return VALID_KEY.UP;
                case `ArrowRight`: return VALID_KEY.RIGHT;
                case `ArrowDown`: return VALID_KEY.DOWN;
                case `ArrowLeft`: return VALID_KEY.LEFT;
                default: return VALID_KEY.UNKNOWN;
            }
        };
        const vkToDir = (vk_code) => {
            switch (vk_code) {
                case VALID_KEY.UNKNOWN:
                case VALID_KEY.NONE:
                    return;
                default:
                    return Direction[vk_code];
            }
        };
        const dir = await new Promise(res => {
            setTimeout(() => res(snake.heading), 400);
            document.addEventListener(`keydown`, (ev) => {
                const dir = vkToDir(keyToVK(ev.key));
                if (dir) {
                    res(dir);
                }
            });
        });
        snake.turn(dir);
        snake.go();
        return [InterruptCode.NONE, snake.heading];
    };
    const the_game = new Game(new Snake(1, []), new Grid(7), main);
    the_game.execute();

}());
