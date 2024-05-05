import { Router } from "express";
import ProductManager from "../manager/products.manager.js";
import { productValidator } from "../middlewares/product.validator.js";
import { __dirname } from "../path.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/data/products.json`);
router.get("/", async (req, res, next) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts();
        if (limit) {
            const productsSlice = products.slice(0,limit)
            return res.status(200).json(productsSlice);
        } else res.status(200).json(products)
        //throw new Error('error de prueba')
    } catch (error) {
        next(error);
    }
});

router.post("/", productValidator, async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(201).json(product)
    } catch (error) {
        next(error);
    }
})

router.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid)
        if (!product) res.status(404).json({msg: "Product not found"})
        else res.status(200).json(product)
    } catch (error) {
        next(error);
    }
})

router.put("/:idProd", async (req, res, next) => {
    try {
        const {idProd} = req.params;
        const prodUpdate = await productManager.updateProduct(idProd, req.body);
        if (!prodUpdate) res.status(404).json({ msg: "Error updating user" });
        else res.status(200).json(prodUpdate) 
    } catch (error) {
        next(error);
    }
})

router.delete("/:idProd", async (req, res, next) => {
    try {
        const {idProd} = req.params;
        const prodDelete = await productManager.deleteProduct(idProd)
        if(prodDelete) res.status(200).json({msg : `Product id: ${idProd} deleted successfully`})
        else res.status(404).json({ msg: "Error delete product" });
    } catch (error) {
        next(error);
    }
})

export default router;
