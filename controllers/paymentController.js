const catchAsyncError = require("../middleware/catchAsyncError");

const stripe = require("stripe")('sk_test_51L0l3aDIahaKXnTe0u0ZQPqD2DoWj712k0z4mFTJED9ymPTPnJVstJxcSkeB6LqTsMs2qfhrfCAYzU7wztrdvpY200muWiDZT3');


exports.processPayment = catchAsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
        payment_method_types: ['card'],
    });

    // const myPayment = await stripe.paymentIntents.create({
    //     amount: 2000,
    //     currency: "usd",
    //     metadata: {
    //         company: "Ecommerce",
    //     },
    // });

    console.log(res)
    res
        .status(200)
        .json({ success: true, client_secret: paymentIntent.client_secret });
});

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEYS });
});