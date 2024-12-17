// import express from "express";
// import { auth } from "../services/firebase.js";

// const router = express.Router();

// // Register User
// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userRecord = await auth.createUser({
//       email,
//       password,
//     });
//     res.status(201).json({ message: "User created successfully", userRecord });
//   } catch (error) {
//     res.status(400).json({ message: "Error creating user", error: error.message });
//   }
// });

// // Login User
// router.post("/login", (req, res) => {
//   res.status(501).json({ message: "Use Firebase SDK for login on the frontend" });
// });

// export default router;
