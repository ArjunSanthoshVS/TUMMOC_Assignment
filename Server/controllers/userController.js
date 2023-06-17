require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { User } = require('../models/userSchema');
const { City } = require('../models/citySchema');

module.exports = {
    signup: async (req, res) => {
        try {
            console.log(req.body);
            const isExisting = await User.findOne({ email: req.body.email })
            if (isExisting) {
                return res.status(409).send({ message: "User with given email already Exist!" });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await User.create({ ...req.body, password: hashedPassword })
            const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "5h" })
            return res.status(201).json({ newUser, token })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body);
            const user = await User.findOne({ email: req.body.data.email })
            console.log(user);
            if (!user) {
                console.log('qwerty');
                return res.status(400).send({ message: "User credentials are wrong" })
            }
            const checkPass = await bcrypt.compare(req.body.data.password, user.password)
            if (!checkPass) {
                console.log('qwerty');
                return res.status(400).send({ message: "User credentials are wrong" })
            }
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "5h" })
            return res.status(201).json({ user, token, msg: "Work" })
        } catch (error) {
            return res.status(500).send({ message: "Internal Server Error" });
        }
    },
    google: async (req, res) => {
        try {
            const data = req.headers.authorization
            let result = data.split(' ')[1]
            result = jwt.decode(result)
            const email = result.email
            const name = result.given_name
            const googleId = result.sub

            let user = await User.findOne({ email: email })

            if (!user) {
                user = await User.create({ ...req.body, email, name, googleId })
            }
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "10h" })
            return res.status(201).json({ user, token })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    city: async (req, res) => {
        try {
            console.log(req.body);
            await City.create(req.body)
            return res.status(201).json({ msg: "Created" })
        } catch (error) {
            console.log(error);
        }
    },
    cities: async (req, res) => {
        try {
            const result = await User.aggregate([
                {
                    $lookup: {
                        from: 'cities',
                        localField: '_id',
                        foreignField: 'userId',
                        as: 'cityData'
                    }
                },
                {
                    $unwind: '$cityData'
                }
            ]);

           return res.status(200).json(result)
        } catch (error) {
            console.log(error);
        }
    }
}