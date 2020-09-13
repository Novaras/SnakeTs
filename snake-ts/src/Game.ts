import Snake from "./Snake";
import Grid from "./Grid";
import { Direction } from "./Vec2";

export enum InterruptCode { EXIT, PAUSE, RESET, NONE };
enum GameState { GAME_OVER, RUNNING, PAUSED, MENU };

export type MainFunction = (snake: Snake) => Promise<[InterruptCode, Direction]>;
export type EvalFunction = (snake: Snake) => GameState;

export default class Game {
	private _tick = 0;
	private _state: GameState = GameState.RUNNING;

	constructor(
		public readonly snake: Snake,
		public readonly grid: Grid,
		public readonly mainFn: MainFunction,
		public readonly evalFn: EvalFunction = () => GameState.RUNNING
	) { }

	get tick() {
		return this._tick;
	}

	get state() {
		return this._state;
	}

	private handleInterrupt(code: InterruptCode): GameState {
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
