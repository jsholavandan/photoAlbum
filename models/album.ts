import * as mongoose from 'mongoose';
import {IPhoto} from './photo';

export interface IAlbum extends mongoose.Document{
  username: string;
  albumName: string;
  albumCover:string;
  photos: IPhoto[];
}


let albumSchema = new mongoose.Schema({
  username:{
    type: String,
    required:true
  },
  albumName:{
    type:String,
    required:true
  },
  albumCover:{
    type:String,
    required:true
  },
  photos:[{type:mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
});


export default mongoose.model<IAlbum>('Album', albumSchema);
