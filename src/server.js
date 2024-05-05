import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(errorHandler);
const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));