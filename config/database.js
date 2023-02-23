const mongoose = require("mongoose");
const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then(() => console.log('Database Connection is successful'))

};

module.exports = connectDatabase