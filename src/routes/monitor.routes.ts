import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

router.get("/ping", (req, res) => {
  res.send("pong");
});

export default router;
