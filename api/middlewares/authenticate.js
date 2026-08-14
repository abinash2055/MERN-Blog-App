import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token) {
            const err = new Error('Unauthorized')
            err.statusCode = 403
            return next(err)
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodeToken

        next()
    } catch (error) {
        const err = new Error('Unauthorized')
        err.statusCode = 401
        return next(err)
    }
}