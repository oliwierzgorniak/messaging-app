import { Router } from "express";
import { prisma } from "../index";
import { RequestWithSession } from "../types";
const router = Router();

router.post("/signup", async (req, res) => {
  if (!req.body?.name || !req.body?.password) {
    res
      .status(400)
      .json({ result: "error", content: "Email or password missing" });
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      password: req.body.password,
    },
  });

  // @ts-ignore
  req.session.userId = user.id;

  res.json({
    result: "success",
    content: "Signed up and loged in successfully!",
  });
});

router.post("/login", async (req, res) => {
  if (!req.body?.name || !req.body?.password) {
    res
      .status(400)
      .json({ result: "error", content: "Email or password missing" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      name: req.body.name,
      password: req.body.password,
    },
  });

  if (!user) {
    res.status(400).json({
      result: "error",
      content: "Email or password is incorrect",
    });
  } else {
    // @ts-ignore
    req.session.userId = user.id;
    res.json({
      result: "success",
      content: "User loged in successfully",
    });
  }
});

router.get("/chats", async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      // @ts-ignore
      id: req.session.userId,
    },
  });

  if (!user) {
    res.status(400).json({
      result: "error",
      content: "You are not logged in",
    });
    return;
  }

  const users = await Promise.all(
    user.chats.map(async (userId) => {
      const u = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (u) {
        return { id: userId, name: u.name };
      }
    })
  );

  res.json({
    result: "success",
    content: users,
  });
});

export default router;
