const { Router } = require("express");
const router = Router();
const userAuthentication= require("../middleware/authentication");
const chatController = require("../controllers/chat");

router.post("/chatmessage",userAuthentication.authenticateToken,chatController.postChatMessage);

router.get("/allchats/:withUserId",userAuthentication.authenticateToken,chatController.getAllChats);

router.get("/allusers",userAuthentication.authenticateToken,chatController.getAllUser);

module.exports = router;