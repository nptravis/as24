import { IConfig } from './../types/utils.d';

export const config: IConfig = {
    cors: {
        origin: 'http://localhost:3001',
        credentials: true,
    },
    port: '3000',
}