<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
    <el-input v-model="listQuery.id" placeholder="游戏ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-input v-model="listQuery.name" placeholder="游戏名称" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-radio-group placeholder="游戏状态" v-model="listQuery.status" @change="handleFilter" style="width: 360px;margin-right:10px;">
        <el-radio :label=0 >删除</el-radio>
        <el-radio :label=1 >正常</el-radio>
        <el-radio :label=2 >维护</el-radio>
        <el-radio :label=3 >规划中</el-radio>
    </el-radio-group>
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
      <el-table-column label="名称" align="center" prop="name" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>           
        </template>
      </el-table-column>
      <el-table-column label="描述" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>  
       <el-table-column label="游戏图标" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.icon" width="50" height="50" />
        </template>
      </el-table-column>         
      <el-table-column label="入口地址" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>       
      <el-table-column label="入口地址(手机)" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile_url }}</span>
        </template>
      </el-table-column> 
      <el-table-column label="入口地址(PC)" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pc_url }}</span>
        </template>
      </el-table-column>        
      <el-table-column label="状态" align="center" prop="status" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status | showStatus }}</span>    
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="AdminId" align="center" prop="admin_id" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_id }}</span>           
        </template>
      </el-table-column>                    
      <el-table-column v-if="showReviewer" align="center" prop="create_time" label="添加时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | formateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" align="center" prop="update_time" label="更新时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time | formateDate}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

  </div>
</template>

<script>
import { minigameGameList } from '@/api/minigame/common'
import { parseTime } from '@/utils/index'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameGameList',
  components: { Pagination },
  directives: { waves },
  filters: {
    showStatus(status) {
      const showMap = {
        0: '删除',
        1: '正常',
        2: '维护',
        3: '规划中',
      }
      return showMap[status]
    },   
    formateDate(time) {
        if (time == 0){
            return ""
        }
        return parseTime(time)
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
        name: '',
        id:'',
        status:"",
        sort: '-id'
      },
      showReviewer: false,
    }
  }, 
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = this.listQuery
      if (params.status === ""){
        params.status = -1
      }
      minigameGameList(params).then(response => {
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
        name: '',
        id:'',
        status:"",     
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
