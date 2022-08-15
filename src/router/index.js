import { Router } from "express";
import { productsTest } from "../controller/testController.js";
import { getAllProductsController,getOneProductController, postNewProduct } from "../controller/productsController.js";
import { cartControllerGet, cartControllerPost, cartControllerProductsPost, cartControllerDelete, cartControllerProductDelete } from "../controller/cartController.js";
import { loginController } from "../controller/loginController.js";
import { successLoginController } from "../controller/successLoginController.js";
import { loginMiddleware } from "../middleware/loginMiddleware.js";
import { logOutController } from "../controller/logoutController.js";
import { chatController } from "../controller/chatController.js";

const router = Router()

//Rutas Test
router.get('/products-test', loginMiddleware, productsTest)

router.get('/chat', loginMiddleware, chatController)

//Rutas Login
router.get('/login', loginController)
router.get('/loginSucces', successLoginController )
router.get('/logout', loginMiddleware, logOutController)

//Rutas de Producto
router.get('/products/', loginMiddleware, getAllProductsController)
router.get('/products/all', loginMiddleware, getAllProductsController)
router.get('/products/:id', loginMiddleware, getOneProductController)
router.post('/products', loginMiddleware, postNewProduct )

//Rutas de carritos
router.get('/carts/:id/products', cartControllerGet)
router.post('/carts', cartControllerPost)
router.post('/carts/:id/products', cartControllerProductsPost)
router.delete('/carts/:id', cartControllerDelete)
router.delete('/carts/:id/products/:id_prod', cartControllerProductDelete)

export default router