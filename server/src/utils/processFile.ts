import {ParserOptionsArgs, CsvParserStream, parseFile} from 'fast-csv';
import fs from 'fs';

interface ProcessParams {
	location: string;
	options: ParserOptionsArgs;
	fileName: string;
	newPath: string;
	validate: (data: unknown) => boolean;
}

export async function processFile<T>(params: ProcessParams): Promise<Error | T[]>{
	const {location, options, fileName, newPath, validate} = params;
	const rows: T[] = [];
	let error: Error|null = null;

	const stream = parseFile<T, T>(location, options)
		.validate(validate)
		.on('error', err => error = err)
		.on('data', (row: T) => rows.push(row))
		.on('data-invalid', row => console.error(`Invalid row: ${JSON.stringify(row)}`));
	
	await streamComplete<T>(stream)

	if(error) return error;

	fs.writeFileSync(`${newPath}/${fileName}`, JSON.stringify(rows), {encoding: 'utf8'});
	fs.unlinkSync(location);   // remove temp file
	return rows;
}

function streamComplete<T>(stream: CsvParserStream<T, T>) {
    return new Promise((res) => {
        stream.on('end', res)
    })
}

