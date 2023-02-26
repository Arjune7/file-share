import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../Models/File";
import dotenv from "dotenv";

dotenv.config();
const storage = multer.diskStorage({});

export let upload = multer({
  storage,
});

export const uploadFiles = async (req: express.Request, res: express.Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "file needed!" });
    console.log(req.file);

    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "shareFiles",
        resource_type: "auto",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Cloudinary Error" });
    }

    const { originalname } = req.file;
    const { secure_url, format, bytes } = uploadedFile;

    const file = await File.create({
      fileName: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });

    res.status(200).json({
      id: file._id,
      downloadLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFileById = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "file doesnt exist" });
    }

    const {fileName , format , sizeInBytes} = file
    return res.status(200).json({
      name : fileName,
      sizeInBytes,
      format,
      id
    })
  } catch (error) {
    return res.status(500).json({ message: "server error" });

  }
};
