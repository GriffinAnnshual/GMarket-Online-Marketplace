import {connectMongoDB} from './data/database.js'
import {app} from './app.js'



const PORT = process.env.PORT || 4000
connectMongoDB()


app.listen(PORT, () => {
	console.log(`Server is running at PORT: ${PORT}`)
})
