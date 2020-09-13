import Vec2 from './Vec2';
export function isVec2Log(log) {
    return log.log !== undefined;
}
function loggishToVec2(loggish) {
    return isVec2Log(loggish) ? loggish.log : loggish;
}
export default class Vec2Log {
    constructor(pre_log) {
        this._log = pre_log !== undefined ? loggishToVec2(pre_log) : [];
        if (this._log.length === 0) {
            this._log.push(new Vec2(0, 0));
        }
    }
    push(entry) {
        this._log.push(entry);
        return this._log;
    }
    get log() {
        return this._log;
    }
}
//# sourceMappingURL=Vec2Log.js.map