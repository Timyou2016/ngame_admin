<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.name" placeholder="路由名称" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.path_name" placeholder="前端标识" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.api_path" placeholder="API访问接口" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <select-regrouter ref="refSearchRegrouter" :value=searchRegrouters @changeSelect="searchRegrouter" style="display:inline-block;margin-right:10px;"></select-regrouter>
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
      <el-table-column label="ID" prop="id" sortable="regrouterTable" align="center" width="150" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>        
      <el-table-column label="路由名称" align="center" width="220px">
        <template slot-scope="scope">
          <span v-if="scope.row.parent_id == 0">{{ scope.row.name }}</span>
          <el-tooltip v-if="scope.row.parent_id > 0" class="item" effect="dark" content="查看所有父级路由" placement="top-start"> 
              <el-link  :underline="false" @click="showParent(scope.row)">{{ scope.row.name }}<i class="el-icon-view el-icon--right" ></i> </el-link>
          </el-tooltip>            
        </template>
      </el-table-column>
      <el-table-column label="前端路由标识" align="center" width="220px">
        <template slot-scope="scope">
          {{ scope.row.path_name }}
        </template>
      </el-table-column>
      <el-table-column label="访问API" align="center" width="220px">
        <template slot-scope="scope">
          {{ scope.row.api_path }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否独立页" width="220px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_show | statusFilter">{{ scope.row.is_show | showStatus }}</el-tag>
        </template>
      </el-table-column>                         
      <el-table-column v-if="showReviewer" align="center" prop="create_at" label="创建时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_at }}</span>
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
        <el-form-item label="父级路由" prop="name">
          <select-regrouter ref="refSelectRegrouter" placeholder="顶级路由" :value=createRegrouters  @changeSelect="selectRegrouter" style="display:inline-block;margin-right:10px;"></select-regrouter>
        </el-form-item>     
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="前端路由标识" prop="path_name">
          <el-input v-model="temp.path_name" />
        </el-form-item>
        <el-form-item label="访问API" prop="api_path">
          <el-input v-model="temp.api_path" />
        </el-form-item>
        <el-form-item label="是否独立页" prop="is_show">
          <el-radio-group v-model="temp.is_show">
            <el-radio :label=0 >否</el-radio>
            <el-radio :label=1 >是</el-radio>
          </el-radio-group>
        </el-form-item>                          
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onCreate()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
    <show-parent-regrouters ref="refShowParentRegrouters"></show-parent-regrouters> 
  </div>
</template>

<script>
import { regrouterList,regrouterCreate,regrouterDelete,regrouterInfo } from '@/api/regrouter'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import SelectRegrouter from '@/layout/components/RegRouter/selectRegrouter'
import ShowParentRegrouters from '@/layout/components/RegRouter/showParentRegrouters'
export default {
  name: 'RegrouterList',
  components: { Pagination , SelectRegrouter,ShowParentRegrouters},
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
        0: '否',
        1: '是'
      }
      return showMap[status]
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
        path_name: '',
        name: '',
        api_path:'',
        parent_id: 0,
        sort: '-id'
      },
      searchRegrouters:[],
      createRegrouters:[],
      showReviewer: false,
      temp: {
        id:0,
        parent_id:0,
        path_name:'',
        name:'',
        api_path:'',
        is_show:0  
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑路由',
        create: '创建创建'
      },
      rules: {
        name: [{ required: true, message: '前端路径必填', trigger: 'blur' }],
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
        this.$refs.refShowParentRegrouters.setRegrouter(row)
    },
    searchRegrouter(e){
      this.searchRegrouters = e
      if (e.length > 0){
        this.listQuery.parent_id = e[e.length-1]
      }else{
        this.listQuery.parent_id = 0
      }
      console.log(this.searchRegrouters)
      console.log(this.listQuery)
    },  

    selectRegrouter(e){
      this.createRegrouters = e
      if (e.length > 0){
        this.temp.parent_id = e[e.length-1]
      }else{
        this.temp.parent_id = 0
      }
      console.log(this.createRegrouters)
      console.log(this.temp)
      console.log(e)
    },    
    getList() {
      this.listLoading = true
      regrouterList(this.listQuery).then(response => {
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
        regrouterInfo({id:row.id}).then(response => {
          let data = response.data
          this.temp.id = data.id
          this.temp.path_name = data.path_name
          this.temp.name = data.name
          this.temp.api_path = data.api_path
          this.temp.is_show = data.is_show
          this.createRegrouters = data.routers       
        }).catch((err) => {
          console.log(err)
        })                 
      }
    },
    onCreate(row){
      regrouterCreate(this.temp).then(response => {
        this.resetTemp()
        this.dialogFormVisible = false
        this.getList()
        this.$refs.refSearchRegrouter.regrouterTree()
        this.$refs.refSelectRegrouter.regrouterTree()
      })      
    },

    onDelete(row){
      this.$confirm('确认删除吗?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await regrouterDelete({id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: 'Delete succed!'
            })             
            this.getList()
            this.$refs.refSearchRegrouter.regrouterTree()
            this.$refs.refSelectRegrouter.regrouterTree()            
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
        path_name:'',
        name:'',
        api_path:'',
        is_show:0    
      }
      this.createRegrouters = []
    },
    resetQuery() {
      this.listQuery = {
        page: 1,
        pageNum: 20,
        path_name: '',
        name: '',
        api_path:'',
        parent_id: 0,
        sort: '-id' 
      }
      this.searchRegrouters = []
      this.handleFilter()
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
