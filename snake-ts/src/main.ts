// ok make a loop

// have a Game obj? or just a flag for now

import Game, { MainFunction, EvalFunction, InterruptCode } from './Game';
import Snake from './Snake';
import { Direction } from './Vec2';
import Grid from './Grid';

// main works by allowing some timeframe for user input to come in
// if input -> turn the snake if possible, break
// if none -> wait for timeout, break
const main: MainFunction = async (snake) => {
	enum VALID_KEY {
		UP = `UP`,
		RIGHT = `RIGHT`,
		DOWN = `DOWN`,
		LEFT = `LEFT`,
		UNKNOWN = `UNKNOWN`,
		NONE = `NONE`
	};
	const keyToVK = (key_str: string): VALID_KEY => {
		switch (key_str) {
			case `ArrowUp`: return VALID_KEY.UP;
			case `ArrowRight`: return VALID_KEY.RIGHT;
			case `ArrowDown`: return VALID_KEY.DOWN;
			case `ArrowLeft`: return VALID_KEY.LEFT;
			default: return VALID_KEY.UNKNOWN;
		}
	};
	const vkToDir = (vk_code: VALID_KEY): Direction | undefined => {
		switch (vk_code) {
			case VALID_KEY.UNKNOWN:
			case VALID_KEY.NONE:
				return;
			default:
				return Direction[vk_code];
		}
	}
	const dir = await new Promise<Direction>(res => {
		setTimeout(() => res(snake.heading), 400); // maybe expose `400` in global space?
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
