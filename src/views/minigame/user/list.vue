<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <select-game ref="refSelectGame" @changeSelect="selectGameId" :value=listQuery.game_id :status=1 style="margin-right:10px;"></select-game>
      <el-input v-model="listQuery.uid" placeholder="平台UID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nick_name" placeholder="游戏昵称" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-date-picker style="margin-right:10px;"
      v-model="listQuery.ymd"
      type="date"
      format="yyyyMMdd"
      value-format="yyyyMMdd"
      placeholder="注册日期">
      </el-date-picker>
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
      <el-tag
        v-for="tag in countList"
        :key="tag.name"
        >
        {{tag.name}}:{{tag.count}}
      </el-tag>
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
      <el-table-column label="游戏ID" prop="game_uid" sortable="gameUserTable" align="center" width="120" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.game_uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属游戏" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ games[scope.row.game_id] }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="平台UID" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>  
       <el-table-column label="游戏昵称" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>   
       <el-table-column label="游戏头像" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.head_url" width="50" height="50" />
        </template>
      </el-table-column>              

      <el-table-column label="护卫等级" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column> 
       <el-table-column label="护卫形象" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image_name" width="50" height="50" />
        </template>
      </el-table-column>              
      <el-table-column class-name="game_send_guard-col" label="赠送护卫" width="100" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.game_send_guard | showGuard }}</span>
        </template>
      </el-table-column>                       
      <el-table-column class-name="user_type-col" label="护卫状态" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.user_type | userTypeFilter" effect="dark">{{ scope.row.user_type | showUserType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ymd }}</span>
        </template>
      </el-table-column>      
      <el-table-column v-if="showReviewer" align="center" prop="create_time" label="注册时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" align="center" prop="update_time" label="活跃时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />
  </div>
</template>

<script>
import { minigameUserList ,minigameUserCountList } from '@/api/minigame/user'
import waves from '@/directive/waves' // waves directive
import SelectGame from '@/layout/components/Minigame/selectGame'
import { gamesMap } from '@/utils/minigame'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameUserList',
  components: { Pagination,SelectGame },
  directives: { waves },
  filters: {
    userTypeFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger',
        2: 'gray',
      }
      return statusMap[status]
    },    
    showUserType(status) {
      const showMap = {
        0: '老用户无护卫',
        1: '新用户无护卫',
        2: '有护卫'
      }
      return showMap[status]
    },
    showGuard(sex){
      const guardMap = {
        0: '未赠送',
        1: '已赠送',
      }
      return guardMap[sex]      
    },   
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      countList:null,
      listQuery: {
        page: 1,
        pageNum: 20,
        uid: "",
        nick_name: '',
        ymd: '',
        sort: '-id'
      },
      games:{},
      showReviewer: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init(){
        this.games = await gamesMap(1)
        await this.getCountList()
        await this.getList()
    },  
    selectGameId(e){
      this.listQuery.game_id = e
      this.handleFilter()
    },         
    getList() {
      this.listLoading = true
      minigameUserList(this.listQuery).then(response => {
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
    getCountList() {
      this.listLoading = true
      minigameUserCountList({}).then(response => {
        console.log(response)
        this.countList = response.data
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
      if (prop === 'game_uid') {
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
        uid: "",
        nick_name: '',
        ymd: '',
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
