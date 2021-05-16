import { statusCodes } from './constants/statusCodes';
import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import { config } from './config';
import { Server } from 'http';
import { filesRouter } from './routers/files/files.router';
import { statisticsRouter } from './routers/statistics/statistics.router';
export const app = express();
const pathToFrontendAssets = path.join(__dirname, '/../../client/build');

// Middleware
app.disable('x-powered-by');
app.use(cors(config.cors));
app.use(json());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(pathToFrontendAssets))

// Frontend
app.get('/', function(req, res) {
	const pathToIndex = path.join(__dirname, pathToFrontendAssets, 'index.html')
	res.sendFile(pathToIndex)
	// res.send({message: 'ok'})
})

// API
app.use('/statistics', statisticsRouter)
app.use('/files', filesRouter)

// Health Check
app.get('/ping', function (req, res) {
	try {
		res.status(statusCodes.success).send({content: 'pong'});
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
});

// always keep this as the last route, to catch all undefined routes
app.use('*', function (req, res) {
	res
		.status(statusCodes.notFound)
		.json({ error: 'The route you requested was not found on the server.' });
});

// Start Server
let server: Server;
export const start = async (): Promise<void> => {
	try {
		server = app.listen(config.port, () => {
			console.log(`Server listening at http://localhost:${config.port}`);
		});
	} catch (e) {
		console.error(e);
		stop();
	}
};

// Stop Server
export const stop = (): void => {
	try {
		server.close();
	} catch (err) {
		console.error(err);
	}
};