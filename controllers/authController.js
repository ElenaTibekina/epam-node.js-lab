const jwt = require('jsonwebtoken');
const User = require('./../schemas/user');
const catchAsync = require('./../catchAsync');

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password
    });

    // eslint-disable-next-line no-undef
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        // eslint-disable-next-line no-undef
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});