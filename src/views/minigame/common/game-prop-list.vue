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
    <el-input v-model="listQuery.prop_id" placeholder="道具ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />

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
      <el-table-column label="所属游戏" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.game_id | showGame }}</span>
        </template>
      </el-table-column>   
      <el-table-column label="道具ID" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_id }}</span>
        </template>
      </el-table-column>       
      <el-table-column label="道具名称" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_name }}</span>
        </template>
      </el-table-column>                     
      <el-table-column label="道具英文名称" align="center" prop="prop_name_en" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_name_en }}</span>           
        </template>
      </el-table-column>
      <el-table-column align="center" prop="prop_desc" label="道具描述" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_desc }}</span>
        </template>
      </el-table-column> 
      <el-table-column align="center" prop="prop_desc_en" label="道具英文描述" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_desc_en }}</span>
        </template>
      </el-table-column>  
      <el-table-column align="center" prop="prop_exp" label="过期时间" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_exp | showExp }}</span>
        </template>
      </el-table-column>            
      <el-table-column v-if="showReviewer" label="备注" align="center" prop="prop_mark" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.prop_mark }}</span>    
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
import { minigameGamePropList,minigameGamePropDelete } from '@/api/minigame/common'
import { parseTime } from '@/utils/index'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameGamePropList',
  components: { Pagination },
  directives: { waves },
  filters: {
    showExp(exp) {
      if(exp == 0){
        return "永久有效"
      }
      return exp/3600 + " H"
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
        prop_id:'',
        game_id: '',
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
      minigameGamePropList(this.listQuery).then(response => {
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
        this.$router.push({name:'MinigameGamePropEdit',query: {id:row.id}})
      }else{
        this.$router.push({name:'MinigameGamePropEdit'})
      }
    },
    onDelete(row){
      this.$confirm('确认删除吗?', '', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await minigameGamePropDelete({id:row.id}).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
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
        prop_id:'',
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
