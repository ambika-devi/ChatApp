const { Router } = require("express");
const router = Router();
const userAuthentication= require("../middleware/authentication");
const userController = require("../controllers/chat");

router.post("/chatmessage",userAuthentication.authenticateToken,userController.postChatMessage);

module.exports = router;