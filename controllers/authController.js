const User = require('./../schemas/user');
const catchAsync = require('./../catchAsync');

exports.signup = catchAsync(async (req, res) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});