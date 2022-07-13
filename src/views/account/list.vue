<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.account" placeholder="Account" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" placeholder="Nickname" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.tel" placeholder="Tel" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <select-role ref="refSelectRole" @changeSelect="selectRole" style="display:inline-block;margin-right:10px;"></select-role>
      <select-department ref="refSelectDepartment"  style="display:inline-block;margin-right:10px;"></select-department>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>
    <div class="top-container" style="margin: 5px 10px;">
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="onCreate">
        创建
      </el-button>
    </div>  
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="userTable" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="NickName" width="120">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="Account" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Role" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="Department" width="110" align="center">
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
      <el-table-column v-if="showReviewer" class-name="sex-col" label="Sex" width="60" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.sex | showSex }}</span>
        </template>
      </el-table-column>                       
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | showStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" align="center" prop="create_at" label="CreatedAt" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">    
      <el-button type="success" icon="el-icon-edit" @click="onCreate(scope.row)" size="mini">编 辑</el-button>
      <el-button type="primary" icon="el-icon-edit"  @click="onChange(scope.row)" size="mini">修改密码</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="onDelete(scope.row)" size="mini"/>             
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <change-pwd ref="refChangePwd"></change-pwd>  
  </div>
</template>

<script>
import { userList,userDelete } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ChangePwd from '@/layout/components/Account/changePwd'
import SelectRole from '@/layout/components/Account/selectRole'
import SelectDepartment from '@/layout/components/Account/selectDepartment'
export default {
  name: 'AccountList',
  components: { Pagination,ChangePwd ,SelectRole ,SelectDepartment},
  directives: { waves },
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
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageNum: 20,
        account: '',
        nickname: '',
        tel: '',
        roles:[],
        sort: '-id'
      },
      showReviewer: false,
      temp: {
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectRole(e){
      console.log(e)
      this.listQuery.roles = e
    },
    selectDepartment(e){
      
    },
    getList() {
      this.listLoading = true
      userList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }, 
    onCreate(row){},
    onChange(row){
      let from
      console.log("userId:",this.$store.state.user.id)
      from = this.$md5("AcountList_"+ this.$store.state.user.id).toUpperCase()
      console.log("from:",from)
      this.$refs.refChangePwd.changePwding(row,false,from)
    },
    onDelete(row){
      this.$confirm('确认删除吗?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await userDelete({id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })             
            this.getList()
          })           
        })
        .catch(err => { console.error(err) })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
      }
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
