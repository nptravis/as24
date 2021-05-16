export const validateCSV = (rows: any[], validHeaders: string[], validRow: any): Error | null => {
    try {
        // validate headers
        if(typeof rows[0] !== 'object'){
            throw new Error('First item is not an object');
        }
        const headers = Object.keys(rows[0])
        const error = validateHeaders(headers, validHeaders);
        if(error) return error;
        
        // validate rows
        for(let i = 0; i < rows.length; i++){
            const error = validateRow(rows[i], validRow, i+1);
            if(error){
                return error;
            }
        }
        return null;
    } catch (err) {
        return err
    }
}

const validateHeaders = (headers: string[], validHeaders:  string[]): Error | null => {
    try {
        if(headers.length !== validHeaders.length){
            throw new Error('There is not enough headers.')
        }
        
        validHeaders.forEach((header, index) => {
            if (!headers.includes(header)){
                throw new Error(`${header} is a required header.`)
            }
        })
        return null
    } catch(err){
        return err;
    }
}

const validateRow = (row: Record<string, unknown>, validRow: any, rowNumber: number): Error | null => {
    try {
        if (typeof row !== 'object'){
            throw new Error(`row number ${rowNumber} is not a valid object.`)
        }
        Object.keys(row).forEach(key => {
            if (typeof row[key] !== typeof validRow[key]){
                throw new Error(`${typeof row[key]} is not a valid type for row number: ${rowNumber}, it should be: ${typeof validRow[key]}`);
            }
        })

        return null
    } catch (err){
        return err;
    }
}