<template>

  <div class="login">
    <h2>Login</h2>
    <input type="text" placeholder="username" v-model="username">
    <input type="password" placeholder="password" v-model="password">
    <button @click="handleLogin">Login</button>
    <p>
      <router-link to="forgot">Forgot-password?</router-link>
      <router-link style="margin: 0px 15px" to="register">Register</router-link>
    </p>
  </div>

  <!-- <input type="text" v-model="username">
  <input type="text" v-model="password">
  <button @click="handleLogin">Click</button> -->
</template>

<script>
import axiosClient from "../../axiosClient/index";
export default {
  name: "Login",
  data(){
    return{
      username: "",
      password: "",
    }
  },
  methods: {
    handleLogin() {
      const data = {
        username: this.username,
        password: this.password,
      }
      axiosClient.post("api/auth/signin",data).then(res => {
        const {data} = res;
        const {token, message} = data;
        if(token){
          localStorage.setItem("token", token);
          console.log(this.$swal);
          this.$swal.fire({
            title: "Success",
            text: message,
            icon: "success",
            position: "top-left",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.$router.push("/");
          });         
        }
      }).catch(err => {
        console.log(err);
      })

      
    }
}
}
</script>

<style scoped>
  .login{
    width: 300px;
    height: 310px;
    border: 2px solid rgb(214, 212, 212);
    border-radius: 10px;
    text-align: center;
    margin: 100px auto;
  }
  .login h2{
    color: #868787;
    font-family: sans-serif;
  }
  /* .forgot input{
    width: 200px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid grey;
    padding-left: 20px;
  } */
  .login input{
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
  .login input:focus{
    outline: none;
  }
  .login button{
    width: 200px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 15px;
    border: none;
    background-color: #40eded;
    color: white;
  }
  .login button:hover{
    font-size: 15px;
  }
  a{
    text-decoration: none;
  }

</style>