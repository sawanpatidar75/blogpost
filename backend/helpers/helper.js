let jwt = require('jsonwebtoken');


exports.generateToken = async (payload, private_key, expire) => {
    const expiresIn = expire ? expire : `${1 * 30 * 24 * 60 * 60}s`
    return await Promise.resolve(jwt.sign(payload, private_key, { expiresIn: expiresIn }))
}