const mongoose = require('mongoose');

require('dotenv').config({ path: './TEST.env' })
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DB_NAME = process.env.DB_NAME
mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.cj5ir.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('connected successfully');
}).catch((error) => {
    console.log(error);
})