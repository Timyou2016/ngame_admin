<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="NickName" width="110">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Account" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Role" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Department" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.department_id }}</span>
        </template>
      </el-table-column>            
      <el-table-column label="Number" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>      
      <el-table-column label="Email" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Wechat" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat }}</span>
        </template>
      </el-table-column>    
      <el-table-column label="Tel" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column> 
      <el-table-column class-name="status-col" label="Sex" width="60" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.sex | showSex }}</span>
        </template>
      </el-table-column>                       
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | showStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_at" label="CreatedAt" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_at }}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" label="Action" width="280">
        <template slot-scope="scope">
          <el-button type="primary" @click="onSubmit" size="mini">编 辑</el-button>
          <el-button type="primary" @click="onSubmit" size="mini">变更密码</el-button>
          <el-button @click="onCancel" size="mini">删 除</el-button>        
        </template>
      </el-table-column>     
    </el-table>
  </div>
</template>

<script>
import { userList } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        //draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },    
    showStatus(status) {
      const showMap = {
        0: '正常',
        1: '冻结'
      }
      return showMap[status]
    },
    showSex(sex){
      const sexMap = {
        0: '未知',
        1: '男',
        2: '女'
      }
      return sexMap[sex]      
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      userList({page:1,pageNum:10,t:new Date().getTime()}).then(response => {
        console.log(response.data)
        this.list = response.data.list
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }    
  }
}
</script>
