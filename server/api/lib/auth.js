const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("../config");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = function() {
    let strategy = new Strategy({
        secretOrKey: config.JWT.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken
    }, async (payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id
                }
            });
    
            if(user) {
                done(null, {
                    exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME
                })
            } else {
                done(new Error('User not found.'), null);
            }
        } catch(err) {
            done(err, null)
        }
    });

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session: false});
        }
    }
}