import fs from 'fs';

export const initalizeDirectories = () => {

    if (!fs.existsSync('uploads')){
        fs.mkdirSync('uploads');
    }

    if (!fs.existsSync('data')){
        fs.mkdirSync('data');
    }

}