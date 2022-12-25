const { Router } = require("express");
const router = Router();
const userAuthentication = require("../middleware/authentication");
const groupController = require("../controllers/group");

router.post("/createGroup",  userAuthentication.authenticateToken, groupController.postCreateGroup);
router.get("/allusers", userAuthentication.authenticateToken,groupController.getAllUsers);
router.get("/allgroups",userAuthentication.authenticateToken,  groupController.getAllGroups);
router.post("/adduser",userAuthentication.authenticateToken,groupController.postAddUser);
router.post("/deleteuser",  userAuthentication.authenticateToken, groupController.postDeleteUser);
router.get("/allusergroups", userAuthentication.authenticateToken,groupController.getAllUserGroups);
router.get("/allgroupmessages/:groupId",userAuthentication.authenticateToken, groupController.getAllGroupMessages);
router.post("/sendgroupmessage",userAuthentication.authenticateToken, groupController.postSendGroupMessage);
module.exports = router;