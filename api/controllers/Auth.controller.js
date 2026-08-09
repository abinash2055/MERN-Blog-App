import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const checkuser = await User.findOne({ email })

        if (checkuser) {
            return next(handleError(409, 'User Already Registered....'))
        }

        const hashedPassword = bcryptjs.hashSync(password)

        // register user  
        const user = new User({ name, email, password: hashedPassword })

        await user.save();

        res.status(200).json({ success: true, message: 'Registeration Successfully....' })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return next(handleError(404, 'Invalid Login Credentials....'))
        }
        const hashedPassword = user.password

        const comparePassword = bcryptjs.compare(password, hashedPassword)
        if (!comparePassword) {
            return next(handleError(404, 'Invalid Login Credentials....'))
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)


        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Logged In Successfully....'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body
        let user
        user = await User.findOne({ email })
        if (!user) {
            const password = Math.random().toString()
            const hashedPassword = bcryptjs.hashSync(password)
            const newUser = new User({
                name, email, password: hashedPassword, avatar
            })
            user = await newUser.save()
        } else {
            user = await User.findByIdAndUpdate(user._id,
                { name, avatar },
                { new: true }
            )
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        const newUser = user.toObject({ getters: true })
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Logged In Successfully....'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const Logout = async (req, res, next) => {
    try {

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })

        res.status(200).json({
            success: true,
            message: 'Logout Successfully....'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
