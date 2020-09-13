"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3003;
const server = express_1.default();
server.use(express_1.default.static(`public`));
server.get(`/`, (req, res) => {
    console.log(`req.`);
    res.sendFile(`./public/index.html`, { root: __dirname });
});
server.get(`/bundle.js`, (req, res) => {
    console.log(`asked for bundle, giving: ${__dirname + `/public/bundle.js`}`);
    res.sendFile(__dirname + `/public/bundle.js`);
});
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
