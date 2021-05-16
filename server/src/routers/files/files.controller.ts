import { distributionByMake } from '../../aggregations/distributionByMake';
import { Request, Response } from 'express';
import { statusCodes } from '../../constants/statusCodes';
import multer from 'multer';
import * as csv  from 'fast-csv';
import fs from 'fs';
import { validateCSV } from '../../utils/validateCSVs';
import { validContactsHeaders, validContactsRow } from '../../constants/validCSVData';
import { averagePricePerSellerType } from '../../aggregations/averagePricePerSellerType';

const uploadCSVs = async (req: Request, res: Response): Promise<void> => {
	try {
		// @ts-ignore
		const contactsFile = req.files['contacts'][0]
		// @ts-ignore
		const listingsFile = req.files['listings'][0]

		const contactsRows: ContactsRow[] = [];
		const listingsRows: ListingsRow[] = [];

		// open contacts file and validate
		csv.parseFile(contactsFile.path, {headers: true}).on('data', (data) => {
			contactsRows.push(data)
		}).on('end', () => {
			const error = validateCSV(contactsRows, validContactsHeaders, validContactsRow)
			if(error){
				res.status(statusCodes.genericError).send({error: error.message}).end();
				return;
			}

			fs.writeFileSync('data/contacts.json', JSON.stringify(contactsRows), {encoding: 'utf8'});
			fs.unlinkSync(contactsFile.path);   // remove temp file
			
			// open listings file and validate
			csv.parseFile(listingsFile.path, {headers: true}).on('data', (data) => {
				listingsRows.push(data)
			}).on('end', () => {
				const error = validateCSV(listingsRows, validContactsHeaders, validContactsRow)
				if(error){
					res.status(statusCodes.genericError).send({error: error.message}).end();
					return;
				}

				const avgPrice = averagePricePerSellerType(listingsRows)
				const distByMake = distributionByMake(listingsRows)
				fs.writeFileSync('data/averagePricePerSellerType.json', JSON.stringify(avgPrice), {encoding: 'utf8'});
				fs.writeFileSync('data/distributionByMake.json', JSON.stringify(distByMake), {encoding: 'utf8'});
				fs.unlinkSync(listingsFile.path);   // remove temp file

				res.status(statusCodes.success).send({content: 'upload successful'});
			})
		})
		
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
};

export const filesController = {
	uploadCSVs,
};