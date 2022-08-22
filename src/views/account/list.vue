<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.account" placeholder="Account" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" placeholder="Nickname" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.tel" placeholder="Tel" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <select-role ref="refSelectRole" @changeSelect="selectRole" :value=listQuery.roles style="display:inline-block;margin-right:10px;"></select-role>
      <select-department ref="refSelectDepartment" :value=listQuery.departments @changeSelect="selectDepartment" style="display:inline-block;margin-right:10px;"></select-department>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-s-open" @click="resetQuery">
        重置
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
      <el-table-column label="员工名称" width="120">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="登录账号" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="角色" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.roles.length == 0"></span>
          <span v-if="scope.row.roles.length == 1">{{ scope.row.role_name }}</span>
          <el-tooltip v-if="scope.row.roles.length > 1" class="item" effect="dark" content="点击查看已分配角色" placement="top-start"> 
              <el-link  :underline="false" @click="showRoles(scope.row)"><i class="el-icon-view el-icon--right" ></i> </el-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="部门" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.department_parent_id == 0">{{ scope.row.department_name }}</span>
          <el-tooltip v-if="scope.row.department_parent_id != 0" class="item" effect="dark" content="查看所有父级部门" placement="top-start"> 
              <el-link  :underline="false" @click="showDepartments(scope.row)">{{ scope.row.department_name }}<i class="el-icon-view el-icon--right" ></i> </el-link>
          </el-tooltip>         
        </template>
      </el-table-column>            
      <el-table-column label="员工编号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>      
      <el-table-column label="邮箱" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.wechat }}</span>
        </template>
      </el-table-column>    
      <el-table-column label="手机" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column> 
      <el-table-column v-if="showReviewer" class-name="sex-col" label="性别" width="60" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.sex | showSex }}</span>
        </template>
      </el-table-column>                       
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter" effect="dark">{{ scope.row.status | showStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" align="center" prop="create_at" label="创建时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" align="center" prop="update_at" label="最近更新时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.update_at }}</span>
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
    <change-pwd ref="refChangePwd"></change-pwd> 
    <show-user-roles ref="refShowUserRoles"></show-user-roles> 
    <show-parent-departments ref="refShowParentDepartments"></show-parent-departments> 
  </div>
</template>

<script>
import { userList,userDelete } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ChangePwd from '@/layout/components/Account/changePwd'
import SelectRole from '@/layout/components/Account/selectRole'
import SelectDepartment from '@/layout/components/Account/selectDepartment'
import ShowUserRoles from '@/layout/components/Account/showUserRoles'
import ShowParentDepartments from '@/layout/components/Account/showParentDepartments'
export default {
  name: 'AccountList',
  components: { Pagination,ChangePwd ,SelectRole ,SelectDepartment ,ShowUserRoles,ShowParentDepartments},
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        //draft: 'gray',
        1: 'danger'
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
        departments:[],
        sort: '-id'
      },
      showReviewer: false,
      dialogFormVisible: false,
      dialogStatus: '',
    }
  },
  created() {
    this.getList()
  },
  methods: {
    showRoles(row){
      console.log("role-user:",row)
      this.$refs.refShowUserRoles.setUser(row)
    },
    showDepartments(row){
      console.log("departs-user:",row)
      this.$refs.refShowParentDepartments.setUser(row)
    },
    selectRole(e){
      console.log(e)
      this.listQuery.roles = e
    },
    selectDepartment(e){
      this.listQuery.departments = e
      console.log(e)
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
      }).catch((err) => {
          console.log(err)
          this.listLoading = false
      }) 
    }, 
    onCreate(row){
      if (row) {
        this.$router.push({name:'AccountCreate',query: {id:row.id}})
      }else{
        this.$router.push({name:'AccountCreate'})
      }
    },
    onChange(row){
      let from
      console.log("userId:",this.$store.state.user.id)
      let fromKey = "AcountList_"+ this.$store.state.user.id
      console.log("fromKey:",fromKey)
      from = this.$md5(fromKey).toUpperCase()
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
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageNum: 20,
        account: '',
        nickname: '',
        tel: '',
        roles:[],
        departments:[],
        sort: '-id'
      }
      this.handleFilter()
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
