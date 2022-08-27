<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
    <el-input v-model="listQuery.uid" placeholder="平台UID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-input v-model="listQuery.api_path" placeholder="请求路径" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
    <el-date-picker style="margin-right:10px;"
      v-model="listQuery.ymd"
      type="date"
      format="yyyyMMdd"
      value-format="yyyyMMdd"
      placeholder="请求日期">
    </el-date-picker>
      <el-input v-model="listQuery.req_time" placeholder="耗时时长(s)" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <el-radio-group v-model="listQuery.status" @change="handleFilter" style="width: 150px;margin-right:10px;">
            <el-radio :label=0 >正常</el-radio>
            <el-radio :label=1 >异常</el-radio>
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
      <el-table-column label="请求日期" align="center" prop="ymd" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.ymd }}</span>           
        </template>
      </el-table-column>  
      <el-table-column label="所属游戏" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.game_id | showGame }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="平台UID" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>                  
      <el-table-column label="API路径" align="center" prop="api_path" width="320">
        <template slot-scope="scope">
          <span>{{ scope.row.api_path }}</span>           
        </template>
      </el-table-column>
      <el-table-column align="center" prop="req_time" label="耗时时长(s)" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.req_time }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="状态" align="center" prop="status" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status | showStatus }}</span>    
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="请求参数" align="center" prop="req_body" width="320">
        <template slot-scope="scope">
          <span>{{ scope.row.req_body }}</span>           
        </template>
      </el-table-column>       
      <el-table-column v-if="showReviewer" label="返回参数" align="center" prop="resp_err_body" width="320">
        <template slot-scope="scope">
          <span>{{ scope.row.resp_err_body }}</span>           
        </template>
      </el-table-column>               
      <el-table-column v-if="showReviewer" align="center" prop="create_time" label="请求时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

  </div>
</template>

<script>
import { minigamePlatLog } from '@/api/minigame/log'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigamePlatLog',
  components: { Pagination },
  directives: { waves },
  filters: {
    showStatus(status) {
      const showMap = {
        0: '正常',
        1: '异常'
      }
      return showMap[status]
    },  
    showGame(gameId){
      const gameMap = {
        101: '星际海盗',
        102: '屠龙少年',
      }
      return gameMap[gameId]      
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
        uid: '',
        api_path: '',
        ymd: "",
        req_time:"",
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
      minigamePlatLog(this.listQuery).then(response => {
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
        uid: '',
        api_path: '',
        ymd: "",
        req_time:"",
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
