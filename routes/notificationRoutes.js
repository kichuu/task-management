import express from "express";

const router = express.Router();

// Send Notification (Placeholder)
router.post("/", (req, res) => {
  const { message, recipient } = req.body;
  res.status(200).json({ message: "Notification sent", recipient });
});

export default router;
