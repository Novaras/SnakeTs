import express from 'express';

const PORT = 3003;


const server = express();

server.use(express.static(`public`));

server.get(`/`, (req, res: any) => {
	console.log(`req.`);
	res.sendFile(`./public/index.html`, { root: __dirname });
});

server.get(`/bundle.js`, (req, res: any) => {
	console.log(`asked for bundle, giving: ${__dirname + `/public/bundle.js`}`);
	res.sendFile(__dirname + `/public/bundle.js`);
})

server.listen(PORT, () => {
	console.log(`Listening on ${PORT}`);
});