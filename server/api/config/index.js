module.exports = {
    "JWT": {
        "SECRET": process.env.JWT_SECRET || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9eyJpZCI6IjY0NjY5OGUwZTUzYmI4MWVhYzlmYTc4NSIsImV4cCI6MTQ5NDg5NDk2NDMyMDAwfQv0SJjaBuR7SrLmvhVWxAiKgz4T4_rX55wHlD9CfBW10lmYTc4NSIsImV4cCI6MTQ5NDg5NDk2NDMyiLCJhbGciOiJI",
        "EXPIRE_TIME": !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 24*60*60
    }
}