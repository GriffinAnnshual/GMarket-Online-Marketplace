
import {connectMongoDB} from './data/database.js'
import {connectRedis} from './data/redis.js'

// import cloudinary from 'cloudinary'
import {app} from './app.js'

const PORT = process.env.PORT || 4000




const Redisclient = connectRedis();
connectMongoDB();

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})


export { Redisclient }