import express from 'express'
import { getFileById, upload, uploadFiles } from '../Controller/files.controller'

const router = express.Router()

router.post("/upload" , upload.single("myFile") , uploadFiles)
router.get("/:id" , getFileById)

export default router