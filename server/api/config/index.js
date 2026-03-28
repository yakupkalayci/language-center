module.exports = {
    JWT: {
        SECRET: process.env.JWT_SECRET,
        EXPIRE_TIME: !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME))
            ? parseInt(process.env.TOKEN_EXPIRE_TIME)
            : 24 * 60 * 60,
    },
    SECURITY: {
        BCRYPT_SALT_ROUNDS: !isNaN(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            ? parseInt(process.env.BCRYPT_SALT_ROUNDS)
            : 10,
    },
};