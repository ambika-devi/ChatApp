const { Router } = require("express");
const router = Router();
const userAuthentication= require("../middleware/authentication");
const chatController = require("../controllers/chat");

router.post("/chatmessage",userAuthentication.authenticateToken,chatController.postChatMessage);

router.get("/allchats",userAuthentication.authenticateToken,chatController.getAllChats);

module.exports = router;