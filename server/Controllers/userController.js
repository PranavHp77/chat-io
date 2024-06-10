const userModel = require("../Models/userModal");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, "accessToken")
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email })

        if (user) return res.status(400).json("User exists");
        if (!name || !email || !password)
            return res.status(400).json("Missing information");
        if (!validator.isEmail(email))
            return res.status(400).json("Invalid information");
        if (!validator.isStrongPassword(password))
            return res.status(400).json("Weak password");

        user = new userModel({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()
        const token = createToken(user?._id)
        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user)
            return res.status(400).json("User doesnt exists");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.status(400).json("Incorrect password");

        const token = createToken(user?._id)
        res.status(200).json({ _id: user._id, name: user.name, email, token })
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }

}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        let user = await userModel.findById(userId)
        if (!user)
            return res.status(400).json("User doesnt exists");
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

const getUsers = async (req, res) => {
    try {
        let users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

module.exports = { registerUser, loginUser, findUser,getUsers }