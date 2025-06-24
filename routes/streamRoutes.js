const express = require("express");
const { StreamChat } = require("stream-chat");
// const isAuthenticated = require("../middlewares/isAuthenticated");
const protect = require("../middlewares/protect");

const router = express.Router();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error(
    "Missing Stream credentials. Check your environment variables."
  );
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

/**
 * @route   POST /api/stream/get-token
 * @desc    Generate a Stream token for authenticated users
 * @access  Private
 */
// CHANGED TO GET
router.get("/get-token", protect, async (req, res) => {
  console.log(req.user);
  try {
    const { _id, username } = req.user || {};
    // TRY LOOGING THE ID AND NAME FROM YOUR REQUEST FIRST

    if (!_id || !username) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const userId = _id.toString();
    const user = { id: userId, username };

    // Ensure user exists in Stream backend
    await streamClient.upsertUser(user);

    // Generate token
    const token = streamClient.createToken(userId);

    // ✅ Return both token and user so frontend can use `user.id`
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Stream token generation error:", error);
    res.status(500).json({ error: "Failed to generate Stream token" });
  }
});

/**
 * @route   POST /api/stream/token
 * @desc    Generate a Stream token for any userId from request body (no auth)
 * @access  Public
 */
router.post("/token", async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const userName = name || "Anonymous";
    const user = { id: userId, name: userName };

    await streamClient.upsertUser(user);
    const token = streamClient.createToken(userId);

    res.status(200).json({
      token,
      user: {
        id: userId,
        name: name,
        role:"admin",
        image: `https://getstream.io/random_png/?name=${name}`,
      },
    });
  } catch (error) {
    console.error("Public token generation error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

module.exports = router;
