const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("../config");
const prisma = require('./prismaClient');

module.exports = function () {
    const cookieExtractor = function(req) {
        let token = null;
        if (req && req.cookies && req.cookies.access_token) {
            token = req.cookies.access_token;
        }
        return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    let strategy = new Strategy(
        {
            secretOrKey: config.JWT.SECRET,
            jwtFromRequest: cookieExtractor,
        },
        async (payload, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: payload.id,
                    },
                });

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err, null);
            }
        }
    );

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", { session: false });
        },
    };
};
