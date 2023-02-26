import express from 'express'
import { downloadFileById, getFileById, upload, uploadFiles } from '../Controller/files.controller'

const router = express.Router()

router.post("/upload" , upload.single("myFile") , uploadFiles)
router.get("/:id/download" , downloadFileById)
router.get("/:id" , getFileById)

export default router