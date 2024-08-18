import Router from "express-promise-router";
import { validateSchema } from "../middlewares/validateSchema";
import { productSchema } from "../schemas/product.schema";
import { requireAuth } from "../middlewares/requireAuth";
import { createProductHandler, getProductHandler } from "../controllers/product.controller";

const router = Router();

router.post("/createProduct", requireAuth , validateSchema(productSchema), createProductHandler);

router.get("/getProduct/:id", requireAuth, getProductHandler);

export default router;