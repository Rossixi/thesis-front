<template>
  <div class="app-container">
    <router-view></router-view>
    <el-form>
      <el-form-item label="用户账号">
        <el-input v-model="user.T_USER_ID" disabled></el-input>
      </el-form-item>

      <el-form-item label="用户名称">
        <el-input v-model="user.T_USERNAME" disabled></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="user.T_MOBILE"></el-input>
      </el-form-item>

      <el-form-item label="用户邮箱">
        <el-input v-model="user.T_EMAIL"></el-input>
      </el-form-item>

      <el-form-item label="用户头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="avatar"/>

        <el-upload
          :headers="headers"
          :action="BASE_API+'/sys/uploadAvatar'"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="uploadSuccess">
          <el-button type="primary" icon="el-icon-upload" >更换头像</el-button>
        </el-upload>

      </el-form-item>

      <el-form-item label="用户权限">
        <el-select v-model="roleId" clearable :placeholder="rolename" :blur="handlerUpdateRole()">
          <el-option
            v-for="item in rolelist"
            :key="item.T_ROLE_ID"
            :label="item.T_ROLE_NAME"
            :value="item.T_ROLE_ID">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="upadteUserInfo">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import user from '@/api/custome/user.js'
  import {getRoles} from '@/api/role/role.js'
  import {deletefile} from "@/api/system/sys";
  import { getToken } from '@/utils/auth'
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: { ImageCropper, PanThumb },

    data() {
      return {
        user: {
          T_USER_ID: '',
          T_USERNAME: '',
          T_PASSWORD: '',
          T_MOBILE: '',
          T_EMAIL: '',
          T_PHOTO: '',
          T_ROLE_ID: ''
        },
        rolelist: {},
        pwdType: 'password',
        BASE_API: process.env.BASE_API, // 接口API地址
        headers: {token: getToken()},
        roleId: '',
        rolename: '',
        avatar: '',  //头像
        photo: ''  //图片地址
      }
    },

    created() {
      this.init()
      this.getUserInfo()  //初始化用户信息
      this.getRoleInfo()  //获取权限信息
    },

    methods: {
      init() {
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.user.T_USER_ID = id
        }
      },

      //获取用户信息
      getUserInfo() {
        user.getUserInfoById(this.user.T_USER_ID)
        .then(response => {
          this.user = response.OUT_DATA.data
          this.photo = response.OUT_DATA.data.T_PHOTO
          this.avatar = this.BASE_API + '/avatar/' + response.OUT_DATA.data.T_PHOTO
          //显示权限信息
          this.rolename = response.OUT_DATA.data.T_ROLE.T_ROLE_NAME
        })
      },

      //获取权限信息
      getRoleInfo() {
        getRoles().then(response => {
          this.rolelist = response.OUT_DATA.data
        })
      },

      //删除文件
      beforeRemove(file, fileList){
        return this.$confirm(`确定移除 ${ file.name }？`,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletefile(this.user.T_PHOTO)  //删除文件
          .then( result => {
            //删除用户头像存储信息
            this.user.T_PHOTO = this.photo

            //返回用户头像
            this.avatar = this.BASE_API + '/avatar/' + this.photo
          })
        })
      },

      //上传成功
      uploadSuccess(data) {
        this.user.T_PHOTO = data.OUT_DATA.data
        //显示头像信息
        this.avatar = this.BASE_API + '/avatar/' + data.OUT_DATA.data
      },

      //下拉框选择
      handlerUpdateRole() {
        console.log('---------')
        this.user.T_ROLE_ID = this.roleId
      },

      //保存更新内容
      upadteUserInfo(){
        user.updateUserInfo(this.user)
        .then(response => {
          this.$message({
            type: "success",
            message: "修改成功"
          })
        })
      }

    }
  }
</script>

<style>
</style>
