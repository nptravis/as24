import { Router } from 'express';
import { filesController } from './files.controller';
import multer from 'multer';
import fs from 'fs';

const router = Router();
const upload = multer({dest: 'uploads/', preservePath: true});

const supportedCSVs: multer.Field[] = [
	{name: 'contacts', maxCount: 1},
	{name: 'listings', maxCount: 1}
]

router.post('/upload-csv', upload.fields(supportedCSVs),  filesController.uploadCSVs);

// here more routes could be added...

export const filesRouter = router;
