import Vec2 from './Vec2';

type Loggish = Vec2[] | Vec2Log;

export function isVec2Log(log: Loggish): log is Vec2Log {
	return (log as Vec2Log).log !== undefined;
}


function loggishToVec2 (loggish: Loggish): Vec2[] {
	return isVec2Log(loggish) ? loggish.log : loggish;
}

export default class Vec2Log {
	private _log: Vec2[];

	// `pre_log` can be used to mock a history on construction
	constructor(pre_log?: Vec2[] | Vec2Log) {
		this._log = pre_log !== undefined ? loggishToVec2(pre_log) : [];
		if (this._log.length === 0) {
			this._log.push(new Vec2(0, 0));
		}
	}

	push(entry: Vec2): Vec2[] {
		this._log.push(entry);
		return this._log;
	}

	get log() {
		return this._log;
	}
}
