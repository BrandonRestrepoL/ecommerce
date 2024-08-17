import Router from "express-promise-router";
import {
  loginHandler,
  getUserHandler,
  signupHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/user.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateSchema";
import { loginSchema, signupSchema } from "../schemas/user.schema";
import { productSchema } from "../schemas/product.schema";
import { productHandler } from "../controllers/product.controller";

const router = Router();

router.post("/register", validateSchema(signupSchema), signupHandler);

router.post("/login", validateSchema(loginSchema), loginHandler);

router.post("/product", validateSchema(productSchema), productHandler)

router.get("/getProfile", requireAuth, getUserHandler);

router.put("/updateUser", requireAuth, updateUserHandler);

router.delete("/deleteUser", requireAuth, deleteUserHandler);

export default router;