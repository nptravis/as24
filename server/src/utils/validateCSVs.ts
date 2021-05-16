export const validateCSV = (rows: any[], validHeaders: string[], validRow: (string|number)[]): string[] | null => {
    const errors: string[] = [];
    for(let i = 0; i < rows.length; i++){
        if(i === 0){
            // validate headers
            const error = validateHeaders(rows[i], validHeaders)
            if(error){
                errors.push(error);
            }
        } else {
            const error = validateRow(rows[i], validRow, i)
            if(error){
                errors.push(error);
            }
        }
    }
   return errors.length > 0 ? errors : null;
}

const validateHeaders = (headers: string[], validHeaders:  string[]): string | null => {
    try {
        if(headers.length !== validHeaders.length){
            throw new Error('There is not enough headers.')
        }
    
        validHeaders.forEach((validHeader, index) => {
            if (headers[index] !== validHeader){
                throw new Error(`${headers[index]} is not a valid header, it should be: ${validHeader}`)
            }
        })
    } catch(err){
        return err.toString();
    }
    return null
}

const validateRow = (row: (string|number)[], validRow: (string|number)[], rowNumber: number): string | null => {
    try {
        validRow.forEach((validValue, index) => {
            if (typeof validValue !== typeof row[index]){
                throw new Error(`${typeof row[index]} is not a valid type for row number: ${rowNumber}, it should be: ${typeof validValue}`);
            }
        })
    } catch (err){
        return err.toString();
    }
    return null
}