import * as mongoose from 'mongoose';

export interface IPhoto extends mongoose.Document{
  album : mongoose.Types.ObjectId;
  caption: string;
  fileUrl: string;
  fileName:string;
  username:string;
}

let photoSchema = new mongoose.Schema({
  caption:{
    type:String,
  },
  fileUrl:{
    type: String,
    required: true
  },
  fileName : {
    type: String,
    required: true
  },
  username: {
    type:String,
    required: true
  }
});

export default mongoose.model<IPhoto>("Photo", photoSchema);
