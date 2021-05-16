import axios, { AxiosResponse } from 'axios';
import { config } from '../config/config';

export const uploadCSVs = async (body: any): Promise<AxiosResponse<ContentResponse<string>>> => {
    let response: AxiosResponse<ContentResponse<string>>;
    console.log('body', body)
    try {
        response = await axios.post(`${config.backendURL}/files/upload-csv`, body);
    } catch (err) {
        response = err;
    }
    return response;
}