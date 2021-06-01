<<<<<<< Updated upstream:src/views/userMana/user/info/index.vue
<template>
  <div class="app-container">
    <router-view></router-view>
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-from-inline">
      <el-form-item>
        <el-input v-model="user.T_USER_ID" placeholder="用户账号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="user.T_USERNAME" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="user.T_MOBILE" placeholder="用户手机号码"></el-input>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getUserListByCond()">查询</el-button>
      <el-button type="warning" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="list"
       border
       fit
       highlight-current-row>

    <el-table-column prop="T_USER_ID" label="用户账号" />

    <el-table-column prop="T_USERNAME" label="用户名称" />

    <el-table-column prop="T_MOBILE" label="手机号码" />

    <el-table-column prop="T_EMAIL" label="用户邮箱" />

    <el-table-column prop="T_ROLE.T_ROLE_NAME" label="用户权限" />

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">

        <el-button type="infor" size="mini"  icon="el-icon-edit" @click="editUserById(scope.row.T_USER_ID)" circle>修改</el-button>

        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserInfoById(scope.row.T_USER_ID)" circle>删除</el-button>
      </template>
    </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getUserList"
    />
  </div>
</template>

<script>

  import user from '@/api/custome/user.js'

  export default {
    data() {
      return {
        list: null,
        page: 1,
        limit: 20,
        total: 0,
        user: {} //查询条件实体
      }
    },

    created() {
      this.getUserList();
    },

    methods:{
      getUserList(page = 1){
        this.page = page;
        user.getUserInfoList(this.page)
        .then(response => {
          const data = response.OUT_DATA.data;
          this.list = data.list
          this.total = data.total
        })
        .catch(error => {

        })
      },

      //条件查询用户信息
      getUserListByCond(page = 1) {
        this.page = page
        user.getUserInfoListByCond(page, this.user)
        .then(response => {
          const data = response.OUT_DATA.data;
          this.list = data.list
          this.total = data.total
        })
      },

      //删除用户信息
      removeUserInfoById(userId) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user.removeUserInfoByUserId(userId)
          .then(response => {
            this.$message({
              type: 'success',
              "message": '删除成功'
            })
            this.getUserList();
          })
        })
      },

      //修改：路由到修改界面
      editUserById(userId) {
        this.$router.push({path: '/userMana/user/edit/' + userId})
      },

      //清空
      resetData() {
        this.user = {}
        this.getUserList();
      }

    }
  }

</script>

<style>
</style>
=======
<template>
  <div class="app-container">

    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-from-inline">
      <el-form-item>
        <el-input v-model="user.T_USER_ID" placeholder="用户账号"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="user.T_USERNAME" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input v-model="user.T_MOBILE" placeholder="用户手机号码"></el-input>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getUserListByCond()">查询</el-button>
      <el-button type="warning" @click="resetData()">清空</el-button>
    </el-form>

    <el-table
      :data="list"
       border
       fit
       highlight-current-row>

    <el-table-column prop="T_USER_ID" label="用户账号" />

    <el-table-column prop="T_USERNAME" label="用户名称" />

    <el-table-column prop="T_MOBILE" label="用户手机号码" />

    <el-table-column prop="T_EMAIL" label="用户邮箱" />

    <el-table-column prop="T_ROLE.T_ROLE_NAME" label="用户权限" />

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">

        <el-button type="infor" size="mini"  icon="el-icon-edit"  circle>修改</el-button>

        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserInfoById(scope.row.T_USER_ID)" circle>删除</el-button>
      </template>
    </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getUserList"
    />
  </div>
</template>

<script>

  import user from '@/api/custome/user.js'

  export default {
    data() {
      return {
        list: null,
        page: 1,
        limit: 20,
        total: 0,
        user: {} //查询条件实体
      }
    },

    created() {
      this.getUserList();
    },

    methods:{
      getUserList(page = 1){
        this.page = page;
        user.getUserInfoList(this.page)
        .then(response => {
          const data = response.OUT_DATA.data;
          this.list = data.list
          this.total = data.total
        })
        .catch(error => {

        })
      },

      getUserListByCond(page = 1) {
        this.page = page
        user.getUserInfoListByCond(page, this.user)
        .then(response => {
          const data = response.OUT_DATA.data;
          this.list = data.list
          this.total = data.total
        })
      },

      //删除用户信息
      removeUserInfoById(userId) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user.removeUserInfoByUserId(userId)
          .then(response => {
            this.$message({
              type: 'success',
              "message": '删除成功'
            })
            this.getUserList();
          })
        })
      },

      //清空
      resetData() {
        this.user = {}
        this.getUserList();
      }

    }
  }

</script>

<style>
</style>
>>>>>>> Stashed changes:src/views/user/index.vue
