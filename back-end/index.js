// **import  dotenv
require('dotenv').config()
// ** express
const express = require('express')
// * import cors
const cors = require('cors')

// *import config/db
require('./config/db')

// *import router (folder and files)
const router = require('./router/router')

// *create app using express
const app = express()
app.use(cors())

// *middleware
// * to parse
app.use(express.json())
app.use(router)
app.use('/uploads', express.static('./uploads'))


// **to change the port(live port)
// const PORT = 3000 || process.env.PORT
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("Welcome")
})
app.listen(PORT, () => {
    console.log(` CareerPort  on port ${PORT}`);

})
