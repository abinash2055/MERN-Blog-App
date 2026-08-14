import User from "../models/user.model.js"
import { handleError } from "../helpers/handleError.js"
import cloudinary from "../config/cloudinary.js"
import bcryptjs from 'bcryptjs'

export const getUser = async (req, res, next) => {
    try {
        const { userid } = req.params
        const user = await User.findOne({ _id: userid }).lean().exec()

        if (!user) {
            next(handleError(404, 'User not Found....'))
        }
        res.status(200).json({
            success: true,
            message: 'User data Found....',
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const updateUser = async (req, res, next) => {
    try {
        let data = JSON.parse(req.body.data)
        const { userid } = req.params

        const user = await User.findById(userid)
        if (!user) {
            return next(handleError(404, 'User not Found....'))
        }

        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if (data.password && data.password.length >= 8) {
            const hashedPassword = bcryptjs.hashSync(data.password)
            user.password = hashedPassword
        }

        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader
                    .upload(req.file.path,
                        {
                            folder: 'MERN-Blog-App',
                            resource_type: 'auto',
                            transformation: [
                                { width: 200, height: 200, crop: 'fill', gravity: 'auto' },
                                { quality: 'auto', fetch_format: 'auto' }
                            ]
                        }
                    )
                user.avatar = uploadResult.secure_url
            } catch (error) {
                return next(handleError(500, error.message))
            }
        }

        await user.save()

        const newUser = user.toObject({ getters: true })
        delete newUser.password

        res.status(200).json({
            success: true,
            message: 'Profile Updated....',
            user: newUser
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully....'
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}