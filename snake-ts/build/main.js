import Game, { InterruptCode } from './Game';
import Snake from './Snake';
import { Direction } from './Vec2';
import Grid from './Grid';
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
    ;
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
//# sourceMappingURL=main.js.map