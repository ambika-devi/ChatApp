const sendBtn = document.querySelector("#btn-send-msg");
const chatMessages = document.querySelector("#chat-messages");
const messageHeader = document.querySelector("#message-card-header");
const usersBox = document.querySelector("#users-list");
const textBox = document.querySelector("#input-msgbox");
const groupBtn = document.querySelector("#group-btn");
const createGroupBtn = document.querySelector("#group-create-btn");
const toast = document.querySelector(".toast-msg");
axios.defaults.headers.common["Authorization"] =localStorage.getItem("usertoken");
let toUserId;


//creating toast messages
const createToast = (msg, color = "orangered") => {
  // console.log("toast creted");
  const div = document.createElement("div");
  div.innerHTML = msg;
  div.style.backgroundColor = color;
  div.style.padding = "1rem 2rem";
  div.style.borderRadius = "4px";
  div.style.color = "#fff";
  toast.insertAdjacentElement("beforeend", div);
  setTimeout(() => {
    // console.log("toast removed");
    div.remove();
  }, 2000);
};

const onUserClick = (e) => {
  if (e.target.className == "list-group-item") {
    //  console.log(e.target.children);
    const name = e.target.textContent;
    const id = +e.target.children[0].value;
    toUserId=id;
    // console.log(name, id);
    const html = `Message to : ${name} <input type='hidden' id='msg-header-user-id' value='${id}'/>`;
    messageHeader.innerHTML = html;
    chatMessages.innerHTML = "";
    getAllChats(id);
  }
};
//adding messages
const addToChatCard = ({ chatMessage, user: { name } }) => {
  // console.log(chatMessage, name);
  const html = `<li class="list-group-item">${name}: ${chatMessage}</li>`;
      chatMessages.insertAdjacentHTML("beforeend", html);
    textBox.value = "";
  };


  //sending single message
const sendMsg = async (e) => {
  //e.preventDefault();
  const text = textBox.value;
  const toUser = +document.querySelector("#msg-header-user-id").value;

  if (!text || !toUser)
    return createToast("Choose the contact to whom message has to be sent");
  try {
    const data = {
      chatMsg: text,
      toUser
    };
    const response = await axios.post(
      `http://localhost:3000/chat/chatmessage`,
      data
    );
     console.log(response);
    if (response.status == 200) {
        addToChatCard(response.data.userName, text);
        text.value="";
      createToast(response.data.msg, "green");
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 400) {
      createToast(error.response.data.msg);
    } else if (error.response.status == 500) {
      createToast(error.response.data.msg);
    }
  }
};


//to get all chats
const getAllChats = async (toUserId=0) => {
    try {
      chatMessages.innerHTML="";
      const response = await axios.get(`http://localhost:3000/chat/allchats/${toUserId}`);
      console.log(response);
      if (response.status == 200 && response.data.chats) {
        const chats = response.data.chats;
        chats.forEach((chat) => {
          addToChatCard( chat);
        });
        //createToast(response.data.msg, "green");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        createToast(error.response.data.msg);
      }else if(error.response.status==401){
        createToast(error.response.data.msg);
      }
    }
  };

  //display users
const displayUser = ({ id, name }) => {
  const html = `<li class="list-group-item" style='cursor:pointer;'>${name} <input type='hidden' class='user-id' value='${id}' /></li>`;
  usersBox.insertAdjacentHTML("beforeend", html);
};
//get all users
const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/chat/allusers");
    // console.log(response);
    const users = response.data.users;
    //localStorage.setItem("users", JSON.stringify(users));
    users.forEach((user) => {
      displayUser(user);
    });
  } catch (error) {
    console.log(error);
  }
};

const onGroupBtnClick = () => {
  window.location.href = "./groupWindow.html";
  };
const onCreateGroupBtnClick = () => {
  window.location.href = "./createGroupWindow.html";
};
  //page refreshing after every five second
  const onPageLoaded=()=>{
   getUsers();
   setInterval(()=>{
    getAllChats(toUserId)     //by default its starting from zero
   },5000)
}


document.addEventListener("DOMContentLoaded",onPageLoaded);
sendBtn.addEventListener("click", sendMsg);
usersBox.addEventListener("click", onUserClick);
groupBtn.addEventListener("click", onGroupBtnClick);
createGroupBtn.addEventListener("click", onCreateGroupBtnClick);