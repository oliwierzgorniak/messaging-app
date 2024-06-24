import { Router } from "express";
const router = Router();

router.post("/signup", (req, res) => {
  console.log("sign up route");
});

export default router;
