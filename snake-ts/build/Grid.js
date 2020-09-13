export default class Grid {
    constructor(len) {
        this._tiles = new Array(len);
        for (let i = 0; i < len; ++i) {
            this._tiles.push(new Array(len));
        }
    }
}
//# sourceMappingURL=Grid.js.map