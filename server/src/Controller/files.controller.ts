import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../Models/File";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import https from "https";
import createEmailTemplate from "../utils/emailTemp";

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

    const { fileName, format, sizeInBytes } = file;
    return res.status(200).json({
      name: fileName,
      sizeInBytes,
      format,
      id,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const downloadFileById = async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "file doesnt exist" });
    }

    if (file.secure_url) {
      const url = file.secure_url.toString();
      https.get(url, (fileStream) => fileStream.pipe(res));
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const sendEmail = async (req: express.Request, res: express.Response) => {
  const { id, emailFrom, emailTo } = req.body;

  const file = await File.findById(id);
  if (!file) {
    return res.status(404).json({ message: "file doesnt exist" });
  }

  let transporter = nodemailer.createTransport({
    //@ts-ignore
    host: process.env.SENDINBLUE_SMTP_HOST!,
    port: process.env.SENDINBLUE_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDINBLUE_SMTP_USER, // generated ethereal user
      pass: process.env.SENDINBLUE_SMTP_PASSWORD, // generated ethereal password
    },
  });

  const { fileName, sizeInBytes } = file;

  const fileSize = `${(Number(sizeInBytes) / (1024 * 1024)).toFixed(2)} MB`;
  const downloadLink = `${process.env.API_BASE_ENDPOINT_CLIENT}download/${id}`;

  const mailOptions = {
    from: emailFrom, // sender address
    to: emailTo, // list of receivers
    subject: "File Shared with you ✔", // Subject line
    text: `${emailFrom} sharre a file with you`, // plain text body
    html: createEmailTemplate(emailFrom, emailTo, downloadLink, fileName, fileSize), // html body
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500);
    }

    file.sender = emailFrom
    file.reciever = emailTo

    await file.save();
    return res.status(200).json({message : 'Email Sent'})
  });
};
