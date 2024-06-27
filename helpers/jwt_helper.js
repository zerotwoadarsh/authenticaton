const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User.model');

module.exports = {
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject)=>{
            const payload = {
                name: "adarsh"
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '20s',
                issuer: 'yourdomain.com',
                audience: UserId
            }
            // const payload = {
            //     name: "John Doe",
            // }
            // const secret = "super secret"
            // const options ={}
            jwt.sign(payload, secret, options, (err, token)=>{
                if(err){
                    return reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if(!req.headers['authorization']) return next(createError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
            if(err){
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (UserId) => {
        return new Promise((resolve, reject)=>{
            const payload = {
                name: "adarsh"
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: '1y',
                issuer: 'yourdomain.com',
                audience: UserId
            }
            jwt.sign(payload, secret, options, (err, token)=>{
                if(err){
                    return reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject)=>{
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload)=>{
                if(err) return reject(createError.Unauthorized())
                const UserId = payload.aud

                resolve(UserId)
            })
        })

    }


}