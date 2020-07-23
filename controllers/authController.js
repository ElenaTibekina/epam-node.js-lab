const jwt = require('jsonwebtoken');
const User = require('./../schemas/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const catchAsync = require('./../catchAsync');
const bcrypt = require('bcryptjs');

function verifyJWT(token) {
    let isValid = false;
    if (token) {
        // eslint-disable-next-line no-undef
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                isValid = false;
            } else {
                isValid = true;
            }
        });
    } else {
        isValid = false;
    }
    return isValid;
}

passport.use(new LocalStrategy(
    { session: false },
    ((username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Invalid username' });
            }
            bcrypt.compare(password, user.password).then((res) => {
                if (res) {
                    return done(null, { username, password });
                }
                return done(null, false, { message: 'Invalid password' });
            });
        });
    })
));

passport.use(new BearerStrategy(
    ((token, done) => {
        const isValid = verifyJWT(token);
        if (!isValid) {
            return done(null, false);
        }
        return done(null, token);
    })
));

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