import Router from "express-promise-router";
import { validateSchema } from "../middlewares/validateSchema";
import { productSchema } from "../schemas/product.schema";
import { requireAuth } from "../middlewares/requireAuth";
import { createProductHandler, 
         deleteProductHandler,
         getProductHandler,
         updateProductHandler } from "../controllers/product.controller";

const router = Router();

router.post("/createProduct", requireAuth , validateSchema(productSchema), createProductHandler);

router.get("/getProduct/:id", requireAuth, getProductHandler);

router.put("/updateProduct", requireAuth, updateProductHandler);

router.delete("/deleteProduct", requireAuth, deleteProductHandler);

export default router;