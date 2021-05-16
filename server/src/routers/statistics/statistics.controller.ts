import { Request, Response } from 'express';
import { statusCodes } from '../../constants/statusCodes';
import fs from 'fs';


const averagePricePerSellerType = async (req: Request, res: Response): Promise<void> => {
	try {

        fs.readFile('data/averagePricePerSellerType.json', 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            res.status(statusCodes.success).send({content: JSON.parse(data)});
          });
		
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
};

const distributionByMake = async (req: Request, res: Response): Promise<void> => {
	try {

        fs.readFile('data/distributionByMake.json', 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            res.status(statusCodes.success).send({content: JSON.parse(data)});
          });
		
	} catch (err){
		res.status(statusCodes.serverError).send({error: err.toString()});
	}
};

export const statisticsController = {
	averagePricePerSellerType,
    distributionByMake
};
