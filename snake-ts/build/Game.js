export var InterruptCode;
(function (InterruptCode) {
    InterruptCode[InterruptCode["EXIT"] = 0] = "EXIT";
    InterruptCode[InterruptCode["PAUSE"] = 1] = "PAUSE";
    InterruptCode[InterruptCode["RESET"] = 2] = "RESET";
    InterruptCode[InterruptCode["NONE"] = 3] = "NONE";
})(InterruptCode || (InterruptCode = {}));
;
var GameState;
(function (GameState) {
    GameState[GameState["GAME_OVER"] = 0] = "GAME_OVER";
    GameState[GameState["RUNNING"] = 1] = "RUNNING";
    GameState[GameState["PAUSED"] = 2] = "PAUSED";
    GameState[GameState["MENU"] = 3] = "MENU";
})(GameState || (GameState = {}));
;
export default class Game {
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
//# sourceMappingURL=Game.js.map