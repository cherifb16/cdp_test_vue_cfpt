<template>
    <div>
      <h1>liste des tâches à accomplir</h1>
      <!-- formulaire de saisie des tâches -->
      <form @submit.prevent="addTodo()">
        <el-input placeholder="todo" v-model="todo"></el-input>
      </form>
      <el-row :gutter="12">
      <TodoItem v-for="( todo, index ) in todos" :key="index" :todo="todo" @removeToDo="removeTodo"/>
      <TodoItem v-for="( issue, index ) in issues" :key="issue.id" :issue="issue.title" :index="index" @closeIssue="closeIssue" />
    </el-row>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TodoItem from '@/components/TodoItem.vue';
  const client = axios.create({
    baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
    headers: {
      'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type':'application/json',
    },
  })
  
  export default {
    name: 'TodosIssues',
    components: {
    TodoItem
  },
    data () {
      return {
        todo: '',
        todos: [],
        issues: []
      }
    },
    methods: {
      // Gérer les taches à partir d'ici
      addTodo(){
        this.todos.push(this.todo);
        this.todo= '';
      },
      removeTodo(index){
        this.todos.splice(index, 1);
      },
      // Gérer les issues à partir d'ici
      closeIssue(index){
        const target = this.issues[index];
        client.patch(`/issues/${target.number}`,
            {
              state: "closed"
            },
          )
          .then(() => {
           this.issues.splice(index, 1);
        })
      },
      getIssues() {
        client.get('issues')
          .then((res) => {
            this.issues = res.data
        })
      }
    },
    created() {
      this.getIssues();
    }
  }
  </script>
  