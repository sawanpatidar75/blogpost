const mongoose = require('mongoose');

console.log("Database connection.");
let url = `${process.env.DB_URL}/${process.env.DB_NAME}`
console.log("Database URL: ",url);
mongoose.connect(
    url,
    {
        useNewUrlParser: false,
        useUnifiedTopology: false,
    }
).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch((err) => {
    console.log(`Database connection error: ${err}`);
})
