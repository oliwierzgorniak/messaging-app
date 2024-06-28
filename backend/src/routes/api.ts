import { Router } from "express";
import { prisma } from "../index";
const router = Router();

router.get("/login", (req, res) => {});

router.post("/signup", async (req, res) => {
  if (!req.body?.email || !req.body?.password) {
    res
      .status(400)
      .json({ result: "error", content: "email or password missing" });
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
    },
  });

  // @ts-ignore
  req.session.userId = user.id;

  res.json({
    result: "success",
    content: "signed up and loged in successfullsy",
  });
});

export default router;
