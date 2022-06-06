<template>
    <div class="forgot">
        <h2>Forgot Password</h2>
            <input type="email" id="email" v-model="email" placeholder="email">
            <p>Password: {{password}}</p>
        <button @click='handleSubmit'>Submit</button>
    </div>
</template>
<script>
import axiosClient from "../../axiosClient/index";
export default {
    name: 'Forgot',
    data(){
        return {
            email: '', 
            password: "",
        }
    },
    methods: {
        async handleSubmit(){
            // console.log(this.email);
            try {
                const response = await axiosClient.post('/api/auth/forgot', {
                    email: this.email
                });
                console.log(response);
                const data = response.data;
                this.password = data.password;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
.forgot{
    width: 300px;
    height: 250px;
    border: 2px solid rgb(214, 212, 212);
    border-radius: 10px;
    text-align: center;
    margin: 100px auto;
  }
  .forgot h2{
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
  .forgot input{
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
  .forgot input:focus{
    outline: none;
  }
  .forgot button{
    width: 200px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 15px;
    border: none;
    background-color: #40eded;
    color: white;
  }
  .forgot button:hover{
    font-size: 15px;
  }
</style>