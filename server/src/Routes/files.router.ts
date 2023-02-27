import express from 'express'
import { downloadFileById, getFileById, sendEmail, upload, uploadFiles } from '../Controller/files.controller'

const router = express.Router()

router.post("/upload" , upload.single("myFile") , uploadFiles)
router.get("/:id/download" , downloadFileById)
router.get("/:id" , getFileById)
router.post("/email" , sendEmail)

export default router