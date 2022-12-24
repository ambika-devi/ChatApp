const chatBtn = document.querySelector("#contact-btn");
const groupBtn = document.querySelector("#group-btn");

const onChatClick = () => {
  console.log("clicked");
  window.location.href = "./chatWindow.html";
};
onGroupBtnClick = () => {
  window.location.href = "./groupWindow.html";
};
chatBtn.addEventListener("click", onChatClick);
groupBtn.addEventListener("click", onGroupBtnClick);