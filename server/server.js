
import {connectMongoDB} from './data/database.js'
import cloudinary from 'cloudinary'
import {app} from './app.js'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 4000
connectMongoDB()



app.listen(PORT, () => {
	console.log(`Server is running at PORT: ${PORT}`)
})

export {cloudinary}