export const SessionConfig = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false
    },
    resave: false,
    saveUninitialized: false
};
//# sourceMappingURL=session.config.js.map