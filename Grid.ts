import Vec2 from './Vec2';

export default class Grid {
	_tiles: number[][];

	constructor(len: number) {
		this._tiles = new Array<Array<number>>(len);
		for (let i = 0; i < len; ++i) {
			this._tiles.push(new Array(len));
		}
	}
}