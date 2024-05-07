import { Router } from "express";
import { __dirname } from "../path.js";
import CartManager from "../manager/carts.manager.js";

const cartManager = new CartManager(`${__dirname}/data/carts.json`)
const router = Router();

router.post('/', async (req, res, next)=>{
    //crear carrito con un ID y array products
    try {
        const response = await cartManager.createCart();
        res.json(response)
    } catch (error) {
        next(error)
    }
    
})

router.post('/:idCart/product/:idProd', async (req, res, next)=>{
    //consultar los carritos existentes dado un id
    //carritos.products.some(idProd) ---> Buscar si existe el prudcto en el carrito
    //si no existe, creo un nuevo objeto producto con el id y la cantidad
    //push y guardan en el json
    //si existe, le sumo la cantidad
    try {
        const { idProd } = req.params;
        const { idCart } = req.params;
        const response = await cartManager.saveProductToCart(idCart, idProd);
        res.json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:idCart", async (req, res, next) => {
    try {
      const {idCart} = req.params
      res.json(await cartManager.getCartById(idCart))
    } catch (error) {
      next(error);
    }
  });

export default router;