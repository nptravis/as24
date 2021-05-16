import { AxiosRequestConfig } from 'axios';

interface IConfig {
    axios: AxiosRequestConfig
    frontendURL: string;
    backendURL: string;
}

export const config: IConfig = {
    frontendURL: 'http://localhost:3001',
    backendURL: 'http://localhost:3000',
    axios: {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3001',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
    }
}

