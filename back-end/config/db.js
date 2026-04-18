const  mongoose=require('mongoose');

mongoose.connect(process.env.ConnectionString).then(res => {
    console.log("MongoDB connected......");

})
    .catch(err => {
        console.log("MongoDB connection Error", err);

    })