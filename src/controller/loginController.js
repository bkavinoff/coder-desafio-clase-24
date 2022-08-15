const loginController = async (req, res) => {

    await res.render("loginTemplate.ejs")
    
}

export { loginController }