<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.name" placeholder="部门名称" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <select-department ref="refSearchDepartment" :value=searchDepartments @changeSelect="searchDepartment" style="display:inline-block;margin-right:10px;"></select-department>
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
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="onShowForm('create')">
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
      <el-table-column label="ID" prop="id" sortable="departmentTable" align="center" width="150" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>        
      <el-table-column label="部门名称" align="center" width="320">
        <template slot-scope="scope">
          <span v-if="scope.row.parent_id == 0">{{ scope.row.name }}</span>
          <el-tooltip v-if="scope.row.parent_id > 0" class="item" effect="dark" content="查看所有父级部门" placement="top-start"> 
              <el-link  :underline="false" @click="showParent(scope.row)">{{ scope.row.name }}<i class="el-icon-view el-icon--right" ></i> </el-link>
          </el-tooltip>            
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
      <el-button type="success" icon="el-icon-edit" @click="onShowForm('update',scope.row)" size="mini">编 辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="onDelete(scope.row)" size="mini"/>             
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 450px; margin-left:50px;">
        <el-form-item label="父级部门" prop="parent_id">
          <select-department ref="refSelectDepartment" placeholder="顶级部门" :value=createDepartments  @changeSelect="selectDepartment" style="display:inline-block;margin-right:10px;"></select-department>
        </el-form-item>      
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onCreate()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <show-parent-departments ref="refShowParentDepartments"></show-parent-departments> 
  </div>
</template>

<script>
import { departmentList,departmentCreate,departmentDelete,departmentInfo } from '@/api/department'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import SelectDepartment from '@/layout/components/Account/selectDepartment'
import ShowParentDepartments from '@/layout/components/Account/showParentDepartments'
export default {
  name: 'DepartmentList',
  components: { Pagination , SelectDepartment,ShowParentDepartments},
  directives: { waves },
  filters: {
  
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
        name: '',
        parent_id: 0,
        sort: '-id'
      },
      searchDepartments:[],
      createDepartments:[],
      showReviewer: false,
      temp: {
        id:0,
        parent_id:0,
        name:''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑部门',
        create: '创建部门'
      },
      rules: {
        name: [{ required: true, message: '部门名称必填', trigger: 'blur' }]
      },
    }
  }, 
  created() {
    this.getList()
  },
  methods: {
    onCancel() {
      this.resetTemp()
      this.dialogFormVisible = false
    },    
    showParent(row){
        this.$refs.refShowParentDepartments.setDepartment(row)
    },
    searchDepartment(e){
      this.searchDepartments = e
      if (e.length > 0){
        this.listQuery.parent_id = e[e.length-1]
      }else{
        this.listQuery.parent_id = 0
      }
      console.log(this.searchDepartments)
      console.log(this.listQuery)
    },  

    selectDepartment(e){
      this.createDepartments = e
      if (e.length > 0){
        this.temp.parent_id = e[e.length-1]
      }else{
        this.temp.parent_id = 0
      }
      console.log(this.createDepartments)
      console.log(this.temp)
      console.log(e)
    },    
    getList() {
      this.listLoading = true
      departmentList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }, 
    onShowForm(ActName,row){
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = ActName
      if(row){
        departmentInfo({id:row.id}).then(response => {
          let data = response.data
          this.temp.id = data.id
          this.temp.name = data.name
          this.temp.parent_id = data.parent_id
          this.createDepartments = data.departments        
        }).catch((err) => {
          console.log(err)
        })         

      }
    },
    onCreate(row){
      departmentCreate(this.temp).then(response => {
        this.resetTemp()
        this.dialogFormVisible = false
        this.getList()
        this.$refs.refSearchDepartment.departmentTree()
        this.$refs.refSelectDepartment.departmentTree()
      })      
    },

    onDelete(row){
      this.$confirm('确认删除吗?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await departmentDelete({id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })             
            this.getList()
            this.$refs.refSearchDepartment.departmentTree()
            this.$refs.refSelectDepartment.departmentTree()            
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
        id:0,
        parent_id:0,
        name:''    
      }
      this.createDepartments = []
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageNum: 20,
        name: '',
        parent_id: 0,
        sort: '-id'
      }
      this.searchDepartments = []
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
