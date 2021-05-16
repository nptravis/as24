import { Router } from 'express';
import { fileUploaderController } from './fileUploader.controller';

const router = Router();

router.post('/upload-csv', fileUploaderController.uploadCSVs);

// here more routes could be added...

export const fileUploaderRouter = router;
