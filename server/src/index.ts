import { validContactsHeaders, validContactsRow } from './constants/validCSVData';
import { validateCSV } from './utils/validateCSVs';
import { statusCodes } from './constants';
import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import { config } from './config';
import { Server } from 'http';
import multer from 'multer';
import * as csv  from 'fast-csv';
import fs from 'fs';

var upload = multer({dest: 'uploads/', preservePath: true});
export const app = express();

// Middleware
app.disable('x-powered-by');
app.use(cors(config.cors));
app.use(json());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

const supportedCSVs: multer.Field[] = [
	{name: 'contacts', maxCount: 1},
	{name: 'listings', maxCount: 1}
]

app.post('/upload-csv', upload.fields(supportedCSVs), function(req, res) {
	try {
		// @ts-ignore
		const contactsFile = req.files['contacts'][0]
		// @ts-ignore
		const listingsFile = req.files['listings'][0]

		const contactsRows: string[][] = [];
		const listingsRows: string[][] = [];

		// open contacts file
		csv.parseFile(contactsFile.path).on('data', (data) => {
			contactsRows.push(data)
		}).on('end', () => {
			fs.unlinkSync(contactsFile.path);   // remove temp file
			const errors = validateCSV(contactsRows, validContactsHeaders, validContactsRow)
		})

		// open listings file
		csv.parseFile(listingsFile.path).on('data', (data) => {
			listingsRows.push(data)
		}).on('end', () => {
			fs.unlinkSync(listingsFile.path);   // remove temp file
			const errors = validateCSV(listingsRows, validContactsHeaders, validContactsRow)
		})

		res.status(statusCodes.success).send({content: 'upload successful'});
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
})

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

export const stop = (): void => {
	try {
		server.close();
	} catch (err) {
		console.error(err);
	}
};