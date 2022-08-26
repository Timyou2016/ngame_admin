<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.uid" placeholder="平台UID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.game_uid" placeholder="游戏ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.plunder_id" placeholder="掠夺ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" multiple placeholder="日志状态" style="margin-right:10px;">
            <el-option
            v-for="item in statusMap"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
      </el-select>      
      <el-date-picker style="margin-right:10px;"
      <el-date-picker style="margin-right:10px;"
      v-model="listQuery.ymd"
      type="date"
      format="yyyyMMdd"
      value-format="yyyyMMdd"
      placeholder="获得日期">
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
      <el-table-column label="ID" prop="id" sortable="sspRewardTable" align="center" width="120" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>  
      <el-table-column label="平台UID" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>  
       <el-table-column label="游戏ID" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.game_uid }}
        </template>
      </el-table-column>   
       <el-table-column label="掠夺ID" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.plunder_id }}
        </template>
      </el-table-column>               
       <el-table-column label="掠夺状态" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.status | showStatus}}
        </template>
      </el-table-column> 
      <el-table-column label="获得日期" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ymd }}</span>
        </template>
      </el-table-column>      
      <el-table-column v-if="showReviewer" align="center" prop="create_time" label="获得时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />
  </div>
</template>

<script>
import { minigameSspUserPlunderLog } from '@/api/minigame/ssp'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const statusMap = {
0: '开始掠夺',
1: '已扣费',
2: '开到大奖',
3: '已扣除押金',
4: '完成攻击',
5: '已发奖',
}
export default {
  name: 'MinigameSspPlunderLog',
  components: { Pagination },
  directives: { waves },
  filters: { 
     showStatus(status) {
      return statusMap[status]
    },     
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      statusMap:[{
          value: 0,
          label: '开始掠夺'
        }, {
          value: 1,
          label: '已扣费'
        }, {
          value: 2,
          label: '开到大奖'
        }, {
          value: 3,
          label: '已扣除押金'
        }, {
          value: 4,
          label: '已发奖'
        }],
      listLoading: true,
      listQuery: {
        page: 1,
        pageNum: 20,
        uid: "",
        plunder_id: '',
        status:[],
        game_uid: '',
        ymd: '',
        sort: '-id'
      },
      showReviewer: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init(){
        await this.getList()
    },           
    getList() {
      this.listLoading = true
      minigameSspUserPlunderLog(this.listQuery).then(response => {
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
        uid: "",
        plunder_id: '',
        status:[],
        game_uid: '',
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
