module.exports = {
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRE_TIME: !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME))
            ? parseInt(process.env.TOKEN_EXPIRE_TIME)
            : 15 * 60, // default access token: 15 minutes
        REFRESH_EXPIRE_TIME: !isNaN(parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME))
            ? parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME)
            : 7 * 24 * 60 * 60, // default refresh token: 7 days
    },
    SECURITY: {
        BCRYPT_SALT_ROUNDS: !isNaN(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
            : 10,
    },
};