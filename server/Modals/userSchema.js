import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    google_UserID : String,
})

export default userSchema;

