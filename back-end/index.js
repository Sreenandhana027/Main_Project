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

// ❌ REMOVE THIS LINE
// app.use(cors())

// ✅ KEEP ONLY THIS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://main-project-no53.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// *middleware
app.use(express.json())
app.use(router)
app.use('/uploads', express.static('./uploads'))

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(PORT, () => {
    console.log(`CareerPort on port ${PORT}`);
})