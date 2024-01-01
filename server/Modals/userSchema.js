import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    google_UserID : {
        type: String,
        required: false,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true,
        unique: false
    },

    phone : {
        type: String,
        required: false,
        unique: true,
    },

    profilePic : {
        type: String,
        required: false,
    },
    password: String
})

// export default userSchema; to export only one model

// To import multiple models
module.exports = mongoose.model("User",userSchema);


