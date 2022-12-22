const form = document.querySelector("form");
const userName = document.querySelector("#name");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const toast = document.querySelector(".toast-msg");

const createToast = (msg, color = "red") => {
  console.log("toast created");
  const div = document.createElement("div");
  div.innerHTML = msg;
  div.style.backgroundColor = color;
  div.style.padding = "1rem 2rem";
  div.style.borderRadius = "4px";
  div.style.color = "#fff";
  toast.insertAdjacentElement("beforeend", div);
  setTimeout(() => {
    console.log("toast removed");
    div.remove();
  }, 5000);
};
const registerUser = async (e) => {
e.preventDefault();
  //console.log(userName.value, phone.value, email.value, password.value);
  try {
     const data = {
        name: userName.value,
      phone: phone.value,
       email: email.value,
        password: password.value,
         };
          const response = await axios.post("http://localhost:3000/user/register",data);
    console.log(response);
    if (response.status == 201) 
    alert(response.data.msg);
    //createToast(response.data.msg, "green");
  } catch (error) {
    console.log(error);
    if (error.response.status == 400) {
        alert(error.response.data.msg);  
      //createToast(error.response.data.msg);
      } else if (error.response.status == 500) {
        alert(error.response.data.msg);
        //createToast(error.response.data.msg);
      }
  }
};
form.addEventListener("submit", registerUser);