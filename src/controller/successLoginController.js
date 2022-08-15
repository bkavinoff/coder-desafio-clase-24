
const successLoginController = (req, res) => {
    req.session.user = req.query.nickname

    res.redirect("/api/products/all")
}

export { successLoginController }