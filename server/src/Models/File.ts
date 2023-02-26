import mongoose , {Document} from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    sizeInBytes: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
    },
    reciever: {
      type: String,
    },
  },
  { timestamps: true }
);

interface IFile extends Document{
    fileName : String,
    format : String,
    secure_url : String,
    sizeInBytes : String,
    sender?:String,
    reciever?:String
}

export default mongoose.model<IFile>("File" , FileSchema)
