import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
	google_UserID: {
		type: String,
		required: function () {
			return this.loginType === "google"
		},
	},
	email: {
		type: String,
		required: function () {
			return this.loginType === "username" || this.loginType === "google"
		},
	},
	username: {
		type: String,
		required: function () {
			return this.loginType === "twitter" || this.loginType === "username"
		},
	},
	name: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
		required: false,
	},
	password: {
		type: String,
		required: function () {
			return this.loginType === "username"
		},
	},
	loginType: {
		type: String,
		required: true,
		enum: ["username", "google", "twitter"],
	},
	phone: {
		type: String,
		required: false,
	},
	address: {
		type: String,
		required: false,
	}
})


const User = mongoose.model('User',userSchema);

export default User;


