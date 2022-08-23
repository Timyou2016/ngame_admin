<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
    <el-select v-model="listQuery.game_id" style="margin-right:10px;" placeholder="请选择游戏" @change="handleFilter">
        <el-option
        v-for="item in games"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
    </el-select> 
    <el-input v-model="listQuery.config_key" placeholder="配置KEY" style="width: 200px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column label="所属游戏" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.game_id | showGame }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="配置KEY" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.config_key }}</span>
        </template>
      </el-table-column>       
      <el-table-column label="配置Value" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.config_value }}</span>
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
          <span>{{ scope.row.update_time | formateDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

  </div>
</template>

<script>
import { minigameGameConfigList } from '@/api/minigame/common'
import { parseTime } from '@/utils/index'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameGameCongfigList',
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
      games:[{
        value:101,
        label:"星际海盗"
      },
      {
        value:102,
        label:"屠龙少年"
      }
      ],      
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageNum: 20,
        config_key:'',
        game_id: '',
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
      minigameGameConfigList(this.listQuery).then(response => {
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
        config_key:'',
        game_id: '',     
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
