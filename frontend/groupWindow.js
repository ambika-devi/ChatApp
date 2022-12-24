const chatBtn = document.querySelector("#contact-btn");
const createGroupBtn = document.querySelector("#create-group-btn");

const onChatClick = () => {
  console.log("clicked");
  window.location.href = "./chatWindow.html";
};
onCreateGroupBtnClick = () => {
  window.location.href = "./createGroupWindow.html";
};
chatBtn.addEventListener("click", onChatClick);
createGroupBtn.addEventListener("click", onCreateGroupBtnClick);