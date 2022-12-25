const chatBtn = document.querySelector("#contact-btn");
const sendBtn=document.querySelector("#btn-send-msg")
const createGroupBtn = document.querySelector("#create-group-btn");
const toast=document.querySelector(".toast-msg");
const chatMessages = document.querySelector("#chat-messages");
const groupsBox = document.querySelector("#group-list");
const textBox = document.querySelector("#input-msgbox");
const groupMessages = document.querySelector("#group-messages");
const groupMessageHeader = document.querySelector("#message-card-header");

axios.defaults.headers["Authorization"] = localStorage.getItem("usertoken");


let groupId;

//to create toast messages
const createToast = (msg, color = "orangered") => {
  const div = document.createElement("div");
  div.innerHTML = msg;
  div.style.backgroundColor = color;
  div.style.padding = "1rem 2rem";
  div.style.borderRadius = "4px";
  div.style.color = "#fff";
  toast.insertAdjacentElement("beforeend", div);
  setTimeout(() => {
    div.remove();
  }, 2000);
};
//to switch to contact chats
const onChatClick = () => {
  console.log("clicked");
  window.location.href = "./chatWindow.html";
};

//to switch the group creation
 const onCreateGroupBtnClick = () => {
  window.location.href = "./createGroupWindow.html";
};


//clicking on groups gives all the messages in that group
const onGroupsClick = (e) => {
    if (e.target.className == "list-group-item") {
      const groupName = e.target.textContent;
      const id = +e.target.children[0].value;
      groupId = id;
      const html = `Message to Group: ${groupName} <input type='hidden' id='groupmsg-header-user-id' value='${id}'/>`;
      groupMessageHeader.innerHTML = html;
      groupMessages.innerHTML = "";
      getGroupMessages(id);
    }
  };

  //to send messages
  const sendMsg = async (e) => {
    const text = textBox.value;
    const toGroup = +document.querySelector("#groupmsg-header-user-id").value;
  
    if (!text || !toGroup)
      return createToast("Choose the contact to whom message has to be sent");
    try {
      const data = {
        groupMessage: text,
        groupId: toGroup,
      };
      const response = await axios.post(
        `http://localhost:3000/group/sendgroupmessage`,
        data
      );
      if (response.status == 201) {
        textBox.value = "";
        getGroupMessages(groupId);
        // createToast(response.data.msg, "green");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        createToast(error.response.data.msg);
      } else if(error.response.status == 500) {
        createToast(error.response.data.msg);
      }
    }
  };

  //to add group message to the message box
  const addToGroupCard = ({ message, userName }) => {
    // console.log(chatMessage, name);
    const html = `<li class="list-group-item">${userName}: ${message}</li>`;
    groupMessages.insertAdjacentHTML("beforeend", html);
  };

  //to find all the group messages which are associated with the group
  const getGroupMessages = async (toGroupId = 0) => {
    try {
      if (toGroupId == 0) return;
      groupMessages.innerHTML = "";
      const response = await axios.get(
        `http://localhost:3000/group/allgroupmessages/${toGroupId}`
      );
      // console.log(response);
      if (response.status == 200 && response.data.groupMessages) {
        const groupMsg = response.data.groupMessages;
  
        groupMsg.forEach((message) => {
          addToGroupCard(message);
        });
        // createToast(response.data.msg, "green");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 500) {
        createToast(error.response.data.msg);
      }
    }
  };

  //to dispaly each user in the groupbox
  const displayGroup = ({ id, groupName }) => {
    const html = `<li class="list-group-item" style='cursor:pointer;'>${groupName} <input type='hidden' class='group-id' value='${id}' /></li>`;
    groupsBox.insertAdjacentHTML("beforeend", html);
  };

  //to find all the groups which are associated with the user
  const getGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/group/allusergroups"
      );
      // console.log(response);
      const groups = response.data.userGroups;
      groups.forEach((group) => {
        displayGroup(group);
      });
    } catch (error) {
      console.log(error);
       if (error.response.status == 500) {
      createToast(error.response.data.msg);
    }
    }
  };
  
  const onPageLoaded = () => {
    getGroups();
    setInterval(() => {
      getGroupMessages(groupId); //starting default will be 0
    }, 5000);
  };
  
  document.addEventListener("DOMContentLoaded", onPageLoaded);
chatBtn.addEventListener("click", onChatClick);
createGroupBtn.addEventListener("click", onCreateGroupBtnClick);
sendBtn.addEventListener("click",sendMsg);
groupsBox.addEventListener("click",onGroupsClick);