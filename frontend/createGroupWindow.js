const chatBtn = document.querySelector("#contact-btn");
const groupBtn = document.querySelector("#group-btn");
const toast=document.querySelector(".toast-msg");
const createGrpName = document.querySelector("#create-groupname");
const grpNameAdd = document.querySelector("#create-groupname-user");
const grpNameAddUserMail = document.querySelector("#create-groupname-useremail");
const radioTrue = document.querySelector("#admin-yes");
const radioFalse = document.querySelector("#admin-no");
const grpNameRemove = document.querySelector("#remove-groupname");
const grpNameEmailRemove = document.querySelector("#remove-email");
const usersBox = document.querySelector("#user-list");
const groupsBox = document.querySelector("#group-list");

axios.defaults.headers["Authorization"] = localStorage.getItem("usertoken");
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

//to create a new group
const createGroup = async (e) => {
  e.preventDefault();
  //console.log(createGrpName.value);
  try {
    const data = { groupName: createGrpName.value };
    //console.log(data);
    const response = await axios.post(
      `http://localhost:3000/group/creategroup`,
      data
    );
    //console.log(response);
    if (response.status == 201) {
      createGrpName.value = "";
      getGroups();
      createToast(response.data.msg, "green");
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 500) {
      createToast(error.response.data.msg);
    }
  }
};

//to add new user or update admin status
const addUserToGroup = async (e) => {
  try {
    e.preventDefault();
    const groupName = grpNameAdd.value;
    const userEmail = grpNameAddUserMail.value;
    const isAdmin = radioTrue.checked === true ? true : false;
    // console.log(groupName, userEmail);
    // console.log(isAdmin);
    const data = { groupName, email: userEmail, admin: isAdmin };
    const response = await axios.post(
      "http://localhost:3000/group/adduser",
      data
    );
    //console.log(response);
    if (response.status == 201) {
      grpNameAdd.value = "";
      grpNameAddUserMail.value = "";
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

//to delete user from group
const removeFromGroup = async (e) => {
  try {
    e.preventDefault();
    const data = {
      groupName: grpNameRemove.value,
      email: grpNameEmailRemove.value,
    };
    const response = await axios.post(
      "http://localhost:3000/group/deleteuser",
      data
    );
    //console.log(response);
    if (response.status == 200) {
      grpNameRemove.value = "";
      grpNameEmailRemove.value = "";
      createToast(response.data.msg, "green");
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 400) {
      createToast(error.response.data.msg);
    } else if (error.response.status == 404) {
      createToast(error.response.data.msg);
    } else if (error.response.status == 500) {
      createToast(error.response.data.msg);
    }
  }
};

//to display users in group
const displayUser = ({ id, email }) => {
  const html = `<li class="list-group-item">${email} <input type='hidden' class='user-id' value='${id}' /></li>`;
  usersBox.insertAdjacentHTML("beforeend", html);
};

//to get users from the group
const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/group/allusers");
    // console.log(response);
    const users = response.data.users;
    // localStorage.setItem("users", JSON.stringify(users));
    users.forEach((user) => {
      displayUser(user);
    });
  } catch (error) {
    console.log(error);
    if (error.response.status == 500) {
      createToast(error.response.data.msg);
    }
  }
};

//to display groups
const displayGroup = ({ id, groupName }) => {
  const html = `<li class="list-group-item">${groupName} <input type='hidden' class='group-id' value='${id}' /></li>`;
  groupsBox.insertAdjacentHTML("beforeend", html);
};

//to get all the users group
const getGroups = async () => {
  try {
    const response = await axios.get("http://localhost:3000/group/allgroups");
    // console.log(response.data.groups);
    const groups = response.data.groups;
    // localStorage.setItem("users", JSON.stringify(users));
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


//to change chat window
const onChatClick = () => {
  console.log("clicked");
  window.location.href = "./chatWindow.html";
};

//to change group window
onGroupBtnClick = () => {
  window.location.href = "./groupWindow.html";
};

const onDOMLoaded = () => {
    getUsers();
    getGroups();
  };
  
  document.addEventListener("DOMContentLoaded", onDOMLoaded);
chatBtn.addEventListener("click", onChatClick);
groupBtn.addEventListener("click", onGroupBtnClick);

