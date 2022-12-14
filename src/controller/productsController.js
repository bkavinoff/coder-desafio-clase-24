import { productDAO } from "../DAO/productDAO.js"

const getAllProductsController = async (req, res) => {
    const { user } = req.session
    const products = await productDAO.getAll()
    const invalidProduct = false;

    res.render("productsTemplate.ejs", { user, products, invalidProduct })
}

const getOneProductController = async (req, res) => {
    const { id } = req.params
    const { user } = req.session
    const products = await productDAO.getById(id)
    const invalidProduct = false;

    res.render("productsTemplate.ejs", { user, products, invalidProduct })
}

const postNewProduct = async (req, res) => {
    const newProduct = req.body
    const { user } = req.session
    let invalidProduct = false;

    //verifico que lleguen todos los campos
    if(newProduct.title === '' || newProduct.stock === '' || newProduct.price === '' || newProduct.code === '' || newProduct.description === '' || newProduct.thumbnail === ''){
        invalidProduct = true
    }else{
        await productDAO.createDocument(newProduct)
    }

    const products = await productDAO.getAll()

    res.render("productsTemplate.ejs", { user, products, invalidProduct })
}

export { getAllProductsController, getOneProductController, postNewProduct }