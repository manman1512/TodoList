<template>
    <!-- <p class="todo-item is-completed"> -->
    <p v-if="todo.level === level || level === 'all'" :class="['todo-item', todo.isCompleted ? 'is-completed' : '', todo.level === 'low'? 'low': todo.level === 'medium'? 'medium': 'high']">
        <input 
        type="checkbox" 
        :checked="todo.isCompleted"
        @change= "markItemCompleted"
        style="margin: 0px 10px"
        :id="todo.id"
        />
        <label :for="todo.id">{{todo.content}}</label>
        <button class="del" @click= "deleteItem">Delete</button>
    </p>
</template>

<script>

export default {
    name: "TodoItem",
    props: {
        todo: Object,
        level: String
    },
    setup(props, context){
        const markItemCompleted = () =>{
            context.emit('item-completed', props.todo.id);
        }
        const deleteItem = () =>{
            context.emit('delete-item', props.todo.id); 
        }

        return {markItemCompleted, deleteItem}
    }
}
</script>

<style scoped>
.del{
    /* border: none; */
    display: none;
    position: absolute;
    right: 10px;
    float: right;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
    border: none;
    padding: 5px;
    border-radius: 5px;
}
.todo-item:hover .del{
    display: inline-block;
}

.todo-item {
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    border-radius: 20px;
}
.low{
    background-color: rgb(90, 127, 231);
    font-style:italic;
}
.medium{
    background-color: rgb(240, 163, 47);
    font-style:italic;
}
.high{
    background-color: #FF6666;
    font-style:italic;
}

.is-completed{
    text-decoration: line-through;
}


</style>