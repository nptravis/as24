import { distributionByMake } from '../../aggregations/distributionByMake';
import { Request, Response } from 'express';
import { statusCodes } from '../../constants/statusCodes';
import { processFile } from '../../utils/processFile';
import fs from 'fs';
import { validateContactRow, validateListingRow } from '../../utils/validateCSVs';
import { averagePricePerSellerType } from '../../aggregations/averagePricePerSellerType';

const uploadCSVs = async (req: Request, res: Response): Promise<void> => {
	try {
		const files = req.files as {
			contacts: Express.Multer.File[],
			listings: Express.Multer.File[],
		}

		const contactsResp = await processFile<ContactsRow>({
			location: files.contacts[0].path, 
			options: {headers: true}, 
			fileName: 'contacts.json', 
			newPath: 'data', 
			validate: validateContactRow
		})

		const listingsResp = await processFile<ListingsRow>({
			location: files.listings[0].path, 
			options: {headers: true}, 
			fileName: 'listings.json', 
			newPath: 'data', 
			validate: validateListingRow
		})

		if(listingsResp instanceof Error){
			res.status(statusCodes.serverError).send({error: listingsResp.toString()});
			return;
		}

		// data is valid, create aggregation files
		const avgPrice = averagePricePerSellerType(listingsResp)
		const distByMake = distributionByMake(listingsResp)
		fs.writeFileSync('data/averagePricePerSellerType.json', JSON.stringify(avgPrice), {encoding: 'utf8'});
		fs.writeFileSync('data/distributionByMake.json', JSON.stringify(distByMake), {encoding: 'utf8'});

		res.status(statusCodes.success).send({message: 'ok'})
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
};

export const filesController = {
	uploadCSVs,
};