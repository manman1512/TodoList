<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <input v-model="username" type="text" placeholder="enter username" name="username" />
    <input v-model="email" type="text" placeholder="enter email" name="email" />
    <input v-model="password" type="password" placeholder="enter password" name="password" />
    <!-- <input
      type="password"
      placeholder="enter confirm password"
      name="psw-confirm"
    /> -->
    <div class="remember">
      <input type="checkbox" checked="checked" name="remember" />
      Remember me
    </div>
    <button style="margin: 15px 0px" @click="handleRegister">Sign Up</button>
    <p>
      Already have an account?
      <a href="/login">Login</a>
    </p>
  </div>
</template>

<script>
import axiosClient from "../../axiosClient/index";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      email: "",
    }
  },
  methods: {
    handleRegister() {
      const data = {
        username: this.username,
        password: this.password,
        email: this.email,
      }
      axiosClient.post("api/auth/signup",data).then(res => {
        this.$swal({
          title: "Success",
          text: "Register success",
          icon: "success",
          showConfirmButton: false,
          timer: 500
        });
        this.$router.push("/login")
      }).catch(err => {
        if(err.response.status === 400){
          this.$swal({
            title: "Error",
            text: "Plase retype username password and email",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  }
};
</script>

<style scoped>
.signup {
  width: 400px;
  height: 400px;
  border: 2px solid rgb(214, 212, 212);
  border-radius: 10px;
  text-align: center;
  margin: 90px auto;
}
.signup a {
  text-decoration: none;
}
h2 {
  color: #868787;
  font-family: sans-serif;
}

.signup input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;

  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}

.signup input:focus {
  outline: none;
}
.signup button {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: none;
  background-color: #40eded;
  color: white;
}
.signup button:hover {
  font-size: 15px;
}
.remember {
  margin-bottom: 10px;
}
</style>
