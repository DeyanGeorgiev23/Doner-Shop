const encryption = require('../utilities/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: (req, res) => {
        let reqUser = req.body;

        if (reqUser.username.length === 0) {
            res.locals.globalError = "Username is required!";
            return res.render('users/register');
        }

        if (reqUser.password.length <= 6) {
            res.locals.globalError = "For more security password have to be over 6 characters!";
            return res.render('users/register');
        }

        if (reqUser.password && reqUser.password !== reqUser.confirmedPassword) {
            res.locals.globalError = "Password don't match";
            return res.render('users/register');
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            salt: salt,
            hashedPass: hashedPassword
        }).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    return res.render('users/register', user);
                }

                res.redirect('/');
            });
        });
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: (req, res) => {
        let reqUser = req.body;
        User
            .findOne({ username: reqUser.username }).then(user => {
                if (!user) {
                    res.locals.globalError = 'Invalid credentials';
                    res.render('users/login');
                    return;
                }

                if (!user.authenticate(reqUser.password)) {
                    res.locals.globalError = 'Invalid credentials';
                    res.render('users/login');
                    return;
                }

                req.logIn(user, (err, user) => {
                    if (err) {
                        res.locals.globalError = err;
                        res.render('users/login');
                    }

                    res.redirect('/');
                });
            });
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};
