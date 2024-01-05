import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    google_UserID : {
        type: String,
        required: false,
        unique: true
    },
    email : {
        type: String,
        required: false,
        unique: true
    },
    Username:{
        type: String,
        required: false,
        unique: true
    },
    name : {
        type: String,
        required: true,
    },

    profilePic : {
        type: String,
        required: false,
    },
    password: {
        type:String,
        required: false,
    },
    loginType:{
        type:String,
        required: true,
    },
    phone: String
})

// export default userSchema; to export only one model

// To import multiple models

const User = mongoose.model('User',userSchema);

export default User;


