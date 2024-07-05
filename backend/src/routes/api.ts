import { Router } from "express";
import { prisma } from "../index";
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

router.get("/messages", async (req, res) => {
  // @ts-ignore
  if (!req.query.contact) {
    res.status(400).json({
      result: "error",
      content: "no contact param",
    });
    return;
  }

  // @ts-ignore
  if (!req.session.userId) {
    res.status(400).json({
      result: "error",
      content: "no userId in session",
    });
    return;
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              // @ts-ignore
              sender: req.session.userId,
            },
            {
              recipient: +req.query.contact,
            },
          ],
        },
        {
          AND: [
            {
              // @ts-ignore
              recipient: req.session.userId,
            },
            {
              sender: +req.query.contact,
            },
          ],
        },
      ],
    },
  });

  res.json({ result: "success", content: messages });
});

router.get("/name", async (req, res) => {
  // @ts-ignore
  const userId: number | undefined = req.session.userId;

  if (!userId) {
    res.status(400).json({
      result: "error",
      content: "no user id on session",
    });

    return;
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    res.status(400).json({
      result: "error",
      content: "no user found",
    });

    return;
  }

  res.json({
    result: "success",
    content: user.name,
  });
});

router.get("/users", async (req, res) => {
  // @ts-ignore
  const userId: number | undefined = req.session.userId;

  if (!userId) {
    res.status(400).json({
      result: "error",
      content: "no user id on session",
    });

    return;
  }

  let users;

  if (req.query.string && req.query.string !== "") {
    users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: req.query.string.toString().toLocaleLowerCase(),
        },
      },
      take: 50,
    });
  } else {
    users = await prisma.user.findMany({
      take: 50,
    });
  }

  // @ts-ignore
  const me = await prisma.user.findFirst({ where: { id: userId } });
  if (!me) {
    res.status(400).json({
      result: "error",
      content: "no user found",
    });

    return;
  }

  const usersWithoutMe = users.filter((user) => user.id !== userId);
  const usersFormatted = usersWithoutMe.map((user) => {
    return {
      id: user.id,
      name: user.name,
      isAdded: me.chats.includes(user.id),
    };
  });

  res.json({
    result: "success",
    content: usersFormatted,
  });
});

router.post("/add-chat", async (req, res) => {
  if (!req.body.userId) {
    res.status(400).json({
      result: "error",
      content: "no userId in body",
    });
    return;
  }

  // @ts-ignore
  if (!req.session.userId) {
    res.status(400).json({
      result: "error",
      content: "no userId in session",
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      // @ts-ignore
      id: req.session.userId,
    },
  });

  if (!user) {
    res.status(400).json({
      result: "error",
      content: "no user found with provided user id",
    });

    return;
  }

  if (!user.chats.includes(req.body.userId)) user.chats.push(req.body.userId);

  await prisma.user.update({
    where: {
      // @ts-ignore
      id: req.session.userId,
    },
    data: {
      chats: user.chats,
    },
  });

  res.json({ result: "success", content: "chat added" });
});

export default router;
