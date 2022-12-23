const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");


const loginUser = async (e) => {
  e.preventDefault();
  console.log(email.value, password.value);
  try {
    const data = {
      email: email.value,
      password: password.value,
    };
    const response = await axios.post("http://localhost:3000/user/login", data);
    console.log(response.data);
      localStorage.setItem("usertoken",response.data.token);
      window.location.href="./chatWindow.html";
      if(response.status==200){
        alert(response.data.msg);
      }
      } catch (error) {
    console.log(error);
    if (error.response.status == 400) {
         alert(error.response.data.msg);
    }else if (error.response.status == 401) {
        alert(error.response.data.msg);
        }
        else if (error.response.status == 404) {
            alert(error.response.data.msg);
            } 
    else if (error.response.status == 500) {
        alert(error.response.data.msg);
        }
  }
};
form.addEventListener("submit",loginUser);