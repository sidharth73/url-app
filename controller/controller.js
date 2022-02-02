const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './TEST.env' })
exports.register = function (req,res) {
    try {
        const { username,email,password,passwordCheck } = req.body;

        if (password !== passwordCheck) {
            res.send('Both password should be same');
            return
        }

        const saltRounds = 10;
        const myPlainTextPassword = req.body.password;
        const hashedPassword = bcrypt.hashSync(myPlainTextPassword, saltRounds);
        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        newuser.save(function (err,result) {
            if (err) {
                console.log(err);
            }else{
                console.log(result);
            }
        })
        res.send('user saved successfully');
    } catch (error) {
        res.status(500).json({err: error.message || 'Error while registeration'});
    }
}

exports.login = async function (req,res) {
    try {
        if (!req.body) {
            res.status(406).json({ err: "You have to fill the email and password" });
            return
        }

        const { email,password } = req.body;
        console.log(password);

        if (!email || !password) {
            return res.status(505).json({ err: 'Not all fields have been entered' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(406).json({ err:"Invalid credentials" })
        }
        console.log(password);
        const checkPassword = bcrypt.compareSync(password,user.password);
        if (!checkPassword) {
            return res.status(406).json({ err: "Invalid credentials" });
        }

        const JWT_TOKEN = process.env.JWT_TOKEN;

        const token = jwt.sign({id:user._id},JWT_TOKEN);
        
        res.json({ token, userId:user._id, username: user.username, email: user.email })
        res.send('user saved successfully');
    } catch (error) {
        res.status(500).json({err: error.message || 'Error while login'});
    }
}