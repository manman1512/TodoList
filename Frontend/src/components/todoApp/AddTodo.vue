<template>
  <div class="container">
    <form @submit.prevent="handleAddItem">
      <input
        type="text"
        placeholder="New note..."
        name="title"
        v-model="content"
        class="inp-note"

      />
      <select v-model="level">
        <option value="">Select one</option>
        <option value="low" selected>Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" class="add-btn">Add note</button>
    </form>
    <select id="level" v-model="levelSelect" @change="handleSelectChange">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="all">All</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "AddTodo",
  data(){
    return{
      level : "",
      content: "",
      levelSelect: "all",
    }
  },
  methods:{
    handleSelectChange(){
      this.$emit("change-level",this.levelSelect)
    },
    handleAddItem(){
      if(this.content.length > 0){
        this.level = this.level ? this.level : "low";
        const item = {
          level: this.level,
          content: this.content,
        }
        this.level = "low",
        this.title = "",
        this.$emit("add-item", item);
      }else{
        this.$swal({
          title: "Empty",
          text: "Please enter a title",
          icon: "warning",
          position: "top-end",
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
  }
};
</script>

<style scoped>

.container {
  display: flex;
  margin: 10px 0px;
}
#level {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
}
form {
  display: flex;
}
form > * {
  margin: 0px 5px;
}
form > select {
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
form > button[type="submit"] {
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  outline: none;
  width: 100px;
  cursor: pointer;
}

input[type="text"] {
  /* số cột*/
  border: 1px solid black;
  padding: 2px 10px;
  font-size: 20px;
  font-weight: bolder;
  border-radius: 15px;
  outline: none;
}
input[type="submit"] {
  flex: 2;
}
</style>
