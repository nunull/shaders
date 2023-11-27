const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.static('shaders'))

app.listen(port, () => {
	console.log(`listening on ${port}`)
})