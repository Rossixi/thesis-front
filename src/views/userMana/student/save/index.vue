<template>
  <div class="app-container">
    <router-view/>

    <el-form  label-width="80px">
      <el-form-item label="学生学号">
        <el-input v-model="student.T_STU_ID" clearable class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="学生姓名">
        <el-input v-model="student.T_STU_NAME" clearable class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="student.T_STU_MOBILE" clearable class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="学生邮件">
        <el-input v-model="student.T_STU_EAMIL" clearable class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="归属学院">
        <el-select v-model="collegeId" clearable placeholder="请选择学院名称" @change="handlerCollegeChange()">
          <el-option
            v-for="item in collegelist"
            :key="item.T_COLLEGE_ID"
            :label="item.T_COLLEGE_NAME"
            :value="item.T_COLLEGE_ID">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="归属专业">
        <el-select v-model="majorId" clearable placeholder="请选择专业名称" @change="handlerMajorChange()">
          <el-option
            v-for="item in majorlist"
            :key="item.T_MAJOR_ID"
            :label="item.T_MAJOR_NAME"
            :value="item.T_MAJOR_ID">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="培养层级">
        <el-radio-group v-model="level">
          <el-radio :label="item.T_STU_TYPE_ID" :key="item.T_STU_TYPE_ID" v-for="item in levellist" @change="handlerLevelChange()">
            {{item.T_STU_TYPE_ZH_NAME}}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="双学位">
        <el-radio v-model="doubleDegree" label="1" @change="handlerDegreeChange()">是</el-radio>
        <el-radio v-model="doubleDegree" label="0" @change="handlerDegreeChange()">否</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="saveStudentInfo">保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  import studentApi from '@/api/custome/student.js'
  import collegeApi from '@/api/collmajor/college.js'
  import majorApi from '@/api/collmajor/major.js'

    export default {
      name: "index",
      data() {
          return {
            student: {},
            collegelist: {},
            collegeId: '',
            majorlist: {},
            majorId: '',
            major: {},
            level: '', //培养层级
            levellist: {},
            doubleDegree: ''
          }
      },

      created() {
        //初始化学院信息
        this.getCollegeInfo()
        //初始化培养层级信息
        this.getStuTypeInfo()
      },

      methods: {
        //初始化学院信息
        getCollegeInfo() {
          collegeApi.getCollegeInfo()
            .then(result => {
              this.collegelist = result.OUT_DATA.data
            })
        },

        //初始化培养层级信息
        getStuTypeInfo() {
          studentApi.getStuTypeInfo()
          .then(result => {
            this.levellist = result.OUT_DATA.data
          })
        },

        //选择学院之后，专业选择框发生改变
        handlerCollegeChange() {
          this.major.T_COLLEGE_ID = this.collegeId
          this.student.T_COLLEGE_ID = this.collegeId
          majorApi.getMajorInfoByCond(this.major)
            .then(result => {
              this.majorId = ''
              this.majorlist = result.OUT_DATA.data
            })
        },

        handlerMajorChange() {
          this.student.T_MAJOR_ID = this.majorId
        },

        //处理选中培养层级
        handlerLevelChange() {
          this.student.T_STU_TYPE_ID = this.level
        },

        handlerDegreeChange() {
          this.student.T_MORE_DEGREE = this.doubleDegree
        },

        saveStudentInfo() {
          studentApi.saveStudentInfo(this.student)
          .then(result => {
            this.student = {}
            this.collegeId = ''
            this.majorId = ''
            this.level = ''
            this.doubleDegree = ''
            this.$message({
              type: "success",
              message: "添加成功"
            })
          })
        }
      }
    }
</script>

<style scoped>
  .input-width {
    width: 70%
  }
</style>
