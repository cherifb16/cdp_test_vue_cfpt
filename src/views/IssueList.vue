<template>
  <div>
    <h1>issueリスト</h1>
    <el-button type="success" @click="getIssues()">issue取得</el-button>
    <el-row :gutter="12">
      <el-col :span="12" v-for="issue in issues" :key="issue.id">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ issue.title }}</el-col>
            <el-col :span="3">
              <!-- コード1 -->
              <el-button @click="closeIssue(issue.number)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  const client = axios.create({
   baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`, 
    // baseURL: 'https://api.github.com/repos/tendengango/vuejs_todo',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type':'application/json',
      // Add the following
     'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`
       //'Authorization': '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'
    },
  })
  
  export default {
    name: ' IssueList',
    data() {
      return {
        issues: []
      }
    },
    methods: {
    getIssues() {
      client.get('/issues')
        .then((res) => {
          this.issues = res.data;
      })
    },
    // 新しく作成したmethod
    closeIssue(number){
      client.patch(`/issues/${number}`, // --コード2
          {
            state: 'closed'
          },
        )
        .then(() => {
          this.issues.some((v, i) => { // --コード3
            if(v.number == number) this.issues.splice(i, 1); // --コード4
          })
      })
    },
  }
}
</script>
