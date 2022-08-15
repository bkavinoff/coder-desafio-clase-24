const loginMiddleware = (req, res, next) => {
    if(!req.session.user) {
        res.redirect("/api/login")
    } else {
        console.log(`Ingreso el usuario ${req.session.user}`)
        return next()
    }
}

export { loginMiddleware }