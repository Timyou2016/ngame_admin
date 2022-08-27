<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input v-model="listQuery.uid" placeholder="平台UID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.game_uid" placeholder="游戏ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.plunder_id" placeholder="掠夺ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.prop_id" placeholder="道具ID" style="width: 150px;margin-right:10px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
       <el-table-column label="道具ID" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.prop_id }}
        </template>
      </el-table-column> 
      <el-table-column label="获得日期" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ymd }}</span>
        </template>
      </el-table-column>      
      <el-table-column align="center" prop="create_time" label="获得时间" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageNum" @pagination="getList" />
  </div>
</template>

<script>
import { minigameSspUserPlunderReward } from '@/api/minigame/ssp'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'MinigameSspRewardList',
  components: { Pagination },
  directives: { waves },
  filters: {   
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        pageNum: 20,
        uid: "",
        plunder_id: '',
        prop_id: '',
        game_uid: '',
        ymd: '',
        sort: '-id'
      },
    }
  },
  methods: {  
    getList() {
      this.listLoading = true
      minigameSspUserPlunderReward(this.listQuery).then(response => {
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
        prop_id: '',
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
