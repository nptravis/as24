import { Request, Response } from 'express';
import { statusCodes } from '../../constants/statusCodes';
import multer from 'multer';
import * as csv  from 'fast-csv';
import fs from 'fs';
import { validateCSV } from '../../utils/validateCSVs';
import { validContactsHeaders, validContactsRow } from '../../constants/validCSVData';

const supportedCSVs: multer.Field[] = [
	{name: 'contacts', maxCount: 1},
	{name: 'listings', maxCount: 1}
]

const uploadCSVs = async (req: Request, res: Response): Promise<void> => {
	try {
		// @ts-ignore
		const contactsFile = req.files['contacts'][0]
		// @ts-ignore
		const listingsFile = req.files['listings'][0]

		const contactsRows: string[][] = [];
		const listingsRows: string[][] = [];

        if (!fs.existsSync('data')){
            fs.mkdirSync('data');
        }

		// open contacts file and validate
		csv.parseFile(contactsFile.path, {headers: true}).on('data', (data) => {
			contactsRows.push(data)
		}).on('end', () => {
			fs.unlinkSync(contactsFile.path);   // remove temp file
            fs.writeFile('data/contacts.txt', JSON.stringify(contactsRows), function (err) {
                if (err) return console.log(err);
              });
			const errors = validateCSV(contactsRows, validContactsHeaders, validContactsRow)
		})

		// open listings file and validate
		csv.parseFile(listingsFile.path, {headers: true}).on('data', (data) => {
			listingsRows.push(data)
		}).on('end', () => {
			fs.unlinkSync(listingsFile.path);   // remove temp file
            fs.writeFile('data/listings.txt', JSON.stringify(listingsRows), function (err) {
                if (err) return console.log(err);
              });
			const errors = validateCSV(listingsRows, validContactsHeaders, validContactsRow)
		})

		res.status(statusCodes.success).send({content: 'upload successful'});
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
};

export const fileUploaderController = {
	uploadCSVs,
};