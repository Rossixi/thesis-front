<template>
  <div class="app-container">
    <router-view></router-view>

    <el-form>
      <el-form-item label="用户账号">
        <el-input v-model="user.T_USER_ID" clearable></el-input>
      </el-form-item>

      <el-form-item label="用户名称">
        <el-input v-model="user.T_USERNAME" clearable></el-input>
      </el-form-item>

      <el-form-item label="用户密码">
        <el-input :type="pwdType" v-model="user.T_PASSWORD" clearable></el-input>
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input :type="pwdType" clearable></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="user.T_MOBILE" clearable></el-input>
      </el-form-item>

      <el-form-item label="用户邮箱">
        <el-input v-model="user.T_EMAIL" clearable></el-input>
      </el-form-item>

      <!--用户头像-->
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

<!--        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>-->
<!--        &lt;!&ndash; <el-input v-model="user.T_PHOTO" clearable></el-input> &ndash;&gt;-->
<!--        <image-cropper-->
<!--          v-show="imagecropperShow"-->
<!--          :width="300"-->
<!--          :height="300"-->
<!--          field="file"-->
<!--          :url="BASE_API+'/sys/uploadAvatar'"-->
<!--          @close="close"-->
<!--          @crop-upload-success="uploadsucess"-->
<!--          />-->
      </el-form-item>

      <el-form-item label="用户权限">
        <el-select v-model="roleId" clearable placeholder="请选择权限信息" :onchange="handlerSelectChange()">
          <el-option
            v-for="item in rolelist"
            :key="item.T_ROLE_ID"
            :label="item.T_ROLE_NAME"
            :value="item.T_ROLE_ID">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="saveUserInfo">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import user from '@/api/custome/user.js'
  import {getRoles} from '@/api/role/role.js'

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
          T_ROLE: {
            T_ROLE_ID: ''
          }
        },
        rolelist: {},
        pwdType: 'password',
        BASE_API: process.env.BASE_API, // 接口API地址
        headers: {token: getToken()},
        avatar: '',
        roleId: ''
      }
    },

    created() {
      this.initRoles()
    },

    methods: {

      beforeRemove(file, fileList){
        return this.$confirm(`确定移除 ${ file.name }？`,'提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
      },

      uploadSuccess(data) {
        this.user.T_PHOTO = data.OUT_DATA.data
        //显示头像信息
        this.avatar = this.BASE_API + '/avatar/' + data.OUT_DATA.data
      },

      //初始化权限信息
      initRoles() {
        getRoles().then(response => {
          this.rolelist = response.OUT_DATA.data
        })
      },

      //下拉框选择
      handlerSelectChange() {
        console.log('------')
        this.user.T_ROLE.T_ROLE_ID = this.roleId
      },

      //保存用户信息
      saveUserInfo() {
        user.saveUser(this.user)
        .then(response => {
          this.user = {}
          this.$message({
            type: "success",
            message: "添加成功"
          })
        })
      }

    }
  }

</script>

<style>
</style>
