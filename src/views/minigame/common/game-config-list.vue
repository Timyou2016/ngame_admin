<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
    <select-game ref="refSelectGame" @changeSelect="selectGameId" :value=listQuery.game_id :status=1 style="margin-right:10px;"></select-game>
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
      <el-table-column label="ID" prop="id" sortable="departmentTable" align="center" width="150" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="所属游戏" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ games[scope.row.game_id] }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="配置KEY" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.config_key }}</span>
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
     <el-table-column label="Actions" align="center" class-name="small-padding fixed-width" min-width="200">
        <template slot-scope="scope">    
      <el-button type="success" icon="el-icon-edit" @click="onCreate(scope.row)" size="mini">编 辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="onDelete(scope.row)" size="mini"/>             
        </template>
      </el-table-column>        
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />

  </div>
</template>

<script>
import { minigameGameConfigList,minigameDeleteGameConfig } from '@/api/minigame/common'
import { parseTime } from '@/utils/index'
import SelectGame from '@/layout/components/Minigame/selectGame'
import { gamesMap } from '@/utils/minigame'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameGameCongfigList',
  components: { Pagination,SelectGame},
  directives: { waves },
  filters: {
    showStatus(status) {
      const showMap = {
        0: '正常',
        1: '异常'
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
        config_key:'',
        game_id: 0,
        status:"",
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
    selectGameId(e){
      this.listQuery.game_id = e
      this.handleFilter()
    },    
    async init(){
        this.games = await gamesMap(1)
        //await this.getList()
    },
    onCreate(row){
      if (row) {
        this.$router.push({name:'GameConfigEdit',query: {id:row.id}})
      }else{
        this.$router.push({name:'GameConfigEdit'})
      }
    },     
    onDelete(row){
      this.$confirm('确认删除吗?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await minigameDeleteGameConfig({id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })             
            this.getList()
          })           
        })
        .catch(err => { console.error(err) })
    },        
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
        game_id: this.listQuery.game_id,
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
