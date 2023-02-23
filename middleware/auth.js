const catchAsyncError = require("./catchAsyncError");
const ErrorHander = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require('../models/userModels')



exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    // const { token } = req.cookies;
    // const token  = req.body.token;
    // console.log(req.headers['token'], 'from auth')
    // const token = req.headers['token'];
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY1ODZjNGY4Mjk3YzA1NzQyYzNjNiIsImlhdCI6MTY3Njk2NDg1MiwiZXhwIjoxNjc5NTU2ODUyfQ.Nkn4S0qBU8YMPSpnGmVKKGA6zbxqOse9FXW4CYUYg1k'
    const token = req.headers['token'];
    // console.log(token)
    //console.log(token)
    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

exports.authorizeRoles = (...roles) => {
    console.log(roles, 'roles')
    return (req, res, next) => {
        console.log(req.user, 'user')
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }
        next();
    };
};