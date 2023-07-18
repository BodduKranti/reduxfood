const mongoose = require('mongoose');

const DB = 'mongodb+srv://bkrantikumar2:admin123@cluster0.ubkkm99.mongodb.net/foodDb?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Database is connected"))
.catch((error)=>console.log(error))