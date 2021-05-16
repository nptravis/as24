import axios, { AxiosResponse } from 'axios';
import { config } from '../config/config';

export const getAveragePricePerSellerType = async (): Promise<AxiosResponse<ContentResponse<AveragePricePerSellerType[]>>> => {
    let response: AxiosResponse<ContentResponse<AveragePricePerSellerType[]>>;
    try {
        response = await axios.get(`${config.backendURL}/statistics/average-price-per-seller-type`, config.axios);
    } catch (err) {
        response = err;
    }
    return response;
}

export const getDistributionByMake = async (): Promise<AxiosResponse<ContentResponse<DistributionByMake[]>>> => {
    let response: AxiosResponse<ContentResponse<DistributionByMake[]>>;
    try {
        response = await axios.get(`${config.backendURL}/statistics/distribution-by-make`, config.axios);
    } catch (err) {
        response = err;
    }
    return response;
}