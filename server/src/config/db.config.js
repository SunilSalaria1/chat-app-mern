const mongoose = require('mongoose');
const dbConfig = {
    url: "mongodb://127.0.0.1:27017/ChatMania"
};

mongoose.connect(dbConfig.url).then(() => {
    console.log('Connected to the database!');
}).catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});