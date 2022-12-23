const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./util/database");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const chatRoute=require("./routes/chat");
const User=require('./models/user');
const Chat=require('./models/chat');
const app = express();

app.use(cors({origin:'*'}));//permitted for entire server
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use("/chat",chatRoute);
app.use((req, res) => {
  // console.log(req.body);
  res.status(404).send("<h1>Page not found</h1>");
});

//one to many
User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log("Sequelize sync failed");
    console.log(err);
  });