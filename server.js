const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
// const dotenv = require("dotenv");
const dotenv = require('dotenv').config();
// dotenv.config({ path: "config/config.env" })
const port = process.env.PORT || 9000;
const stripe = require("stripe")('sk_test_51L0l3aDIahaKXnTe0u0ZQPqD2DoWj712k0z4mFTJED9ymPTPnJVstJxcSkeB6LqTsMs2qfhrfCAYzU7wztrdvpY200muWiDZT3');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

// connecting to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(port, () => {
    // console.log(`server is working on http://localhost:${process.env.PORT}`)
    console.log(`server is working on ${port}`)
})

app.get('/hello', (req, res) => {
    res.send('Hello Hello working! YaY!');
});
app.post("/create-payment-intent", async (req, res) => {
    const price = req.body.price;
    console.log(price)
    const amount = price;

    const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        "payment_method_types": [
            "card"
        ]
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    })

})
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});