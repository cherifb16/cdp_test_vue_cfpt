<template>
    <div>
      <h1>TodoList</h1>
      <form @submit.prevent="addTodo()">
        <input v-model="todo">
      </form>
      <el-row :gutter="12">
        <el-col :span="12"  v-for="( todo, index ) in todos" :key="index">
          <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
            <el-row :gutter="12">
              <el-col :span="21">{{ todo }}</el-col>
              <el-col :span="3">
                <el-button @click="removeTodo(index)" type="success" icon="el-icon-check" circle></el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
  </template>

  <script>
export default {
    name: 'TodoList',
    // Ajouter une propriété de données
    data() {
    return {
      todo: '',
      //Ajouter la propriété todos sous forme de tableau.
      todos: [],
    }
  },
  methods: {
    addTodo(){//ajouter les données
      this.todos.push(this.todo); //recuperer et afficher les données de todo et les mettre dans todos
      this.todo = ''; //--2
    },
    removeTodo(index){
        this.todos.splice(index,1);
    }
  }
}
</script>