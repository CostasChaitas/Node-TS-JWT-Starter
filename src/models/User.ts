import * as mongoose from "mongoose";

const UserSchema:object = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});

mongoose.model('User', UserSchema);


export const User:mongoose.model = mongoose.model('User');