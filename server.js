// ✅ Import express
const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const admin = require("./config/firebase"); // ✅ add this

// ✅ Create app
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running with MongoDB 🚀");
});

app.post("/register", async (req, res) => {
  console.log("register api call ");

  try {
    let { name, email, fcmToken } = req.body;

    // 🔹 Trim values
    name = name?.trim();
    email = email?.trim().toLowerCase();

    if (!name || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 🔹 Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      // ✅ UPDATE FCM TOKEN if user exists
      userExist.fcmToken = fcmToken || userExist.fcmToken;
      await userExist.save();

      return res.status(200).json({
        success: true,
        message: "User already exists, token updated ✅",
        data: userExist,
      });
    }

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      fcmToken, // ✅ SAVE TOKEN
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully ✅",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.patch("/update", async (req, res) => {
  try {
    const { id, fcmToken } = req.body;

    const user = await User.findByIdAndUpdate(id, { fcmToken }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/send-notification", async (req, res) => {
  console.log("Notification api call ");

  try {
    const { fcmToken, title, body } = req.body;

    if (!fcmToken || !title || !body) {
      return res.status(400).json({ error: "All fields required" });
    }

    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
    };

    const response = await admin.messaging().send(message);

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
