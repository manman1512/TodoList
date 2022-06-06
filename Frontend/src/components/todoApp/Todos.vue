<template>
  <div id="container">
    <button @click="handleLogOut" class="logout-btn">Log out</button>
    <div id="bg">
    <header id="header">
      <h1>MY NOTES</h1>
    </header>
    <AddTodo @add-item="handleAddNote" @change-level="handleChangeLevel" />

    <div id="itemsTodo">
      <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :level="level"
      @item-completed="handleItemCompleted"
      @delete-item="handleDeleteItem"
      />
    </div>
  </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import Service from "../../services/note.service";
export default {
  name: "Todos",
  components: { TodoItem, AddTodo },

  data(){
    return{
      todos: [],
      level: "all",
      token: localStorage.getItem("token"),
    }
  },
  methods:{
    handleAddNote(item){
      Service.createNote(item,this.token).then(res=>{
        const {_id:id, content, level, isCompleted} = res.data;
        this.todos.push({id, content, level, isCompleted});
        this.$swal({
          title: "Success",
          text: "Note added",
          showConfirmButton: false,
          icon: "success",
          timer: 999,
          position: "top-end",  
        })
      }).catch(error=>{
        if(error.status === 400){
          this.$swal({
            title: "Error",
            text: "Please enter a valid note",
            icon: "error",
            showConfirmButton: false,
            timer: 999
            })
        }
      })
        
      
    },
    handleChangeLevel(level){
      this.level = level;
    },
    handleItemCompleted(id){
      const todo = this.todos.filter(value=>value.id === id);
      const isCompleted = todo[0].isCompleted;
      Service.updateNote(id, {isCompleted: !isCompleted},this.token).then(res=>{
        console.log(res);
        this.todos.forEach(value=>{
          if(value.id === id){
            value.isCompleted = !isCompleted;
          }
        })
        this.$swal({
          title: "Success",
          text: "Note updated",
          showConfirmButton: false,
          icon: "success",
          timer: 999,
          position: "top-end",  
        })
      }).catch(error=>{
        this.$swal({
          title: "Error",
          text: "Please enter a valid note",
          icon: "error",
          showConfirmButton: false,
          timer: 999
          })
      })
      
    },
    handleDeleteItem(id){
      Service.deleteNoteById(id,this.token).then(res=>{
        this.todos = this.todos.filter(value=>value.id !== id);
        this.$swal({
          title: "Success",
          text: "Note deleted",
          showConfirmButton: false,
          icon: "success",
          timer: 999,
          position: "top-end",  
        })
      }).catch(error=>{
        this.$swal({
          title: "Error",
          text: "Please enter a valid note",
          icon: "error",
          showConfirmButton: false,
          timer: 999
          })
      })
    },
    handleLogOut(){
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    isLoggedIn(){
      const token = localStorage.getItem("token");
      return token ? true : false;
    },
    handleGetAllNote(){
      Service.getAllNote(this.token)
      .then(res => {
        const {data} = res;
        data.forEach(item=>{
          const {_id : id, content, level, isCompleted} = item;
          this.todos.push({
            id,
            content,
            level,
            isCompleted,
          })
        })
      })
      .catch(err => {
        if(err.status === 401){
          this.$swal({
            title: "Expired",
            text: "Your session is expired",
            icon: "warning",
            position: "top-end",
            showConfirmButton: false,
          })
          this.$router.push("/login");
        }else if(err.status === 400){
          this.handleLogOut();
        }
              console.log(err);
      })
    }

  },
  created(){
    this.isLoggedIn() ? null : this.$router.push("/login");
    this.handleGetAllNote();
  }
};
</script>

<style scoped>
#container{
  position: relative;
}
.logout-btn{
  position: absolute;
  right: 10px;
}
#itemsTodo{
    height: 300px;
    overflow-y: auto;
}
#bg{
  padding: 2rem 3rem 3rem;
  max-width: 650px;
  margin: 10px auto;
  border-radius: 20px;
  background-color: #40eded;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
#header {
    text-align: center;
    color:#FFF;

    letter-spacing:0.05em;
    border-bottom:1px solid rgba(255,255,255,.3);
}
</style>
