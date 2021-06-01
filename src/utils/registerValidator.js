// import { ref } from "vue";


// export const registerUser = function(){
//   name: "",
//   email = "",
//   password = "",
//   password2 = "",
//   role = "",
// };

//  // 验证注册表单规则
//  export const registerRules = function(){
//   name: [
//     {
//       message: "用户名不能为空...",
//       required: true,
//       trigger: "blur",
//     },
//     {
//       min: 2,
//       max: 30,
//       message: "长度在2-30个字符之间",
//       trigger: "blur",
//     },
//   ],
//   email: [
//     {
//       type: "email",
//       message: "邮箱输入不正确...",
//       required: true,
//       trigger: "blur",
//     },
//   ],
//   password: [
//     {
//       required: true,
//       message: "密码不能为空...",
//       trigger: "blur",
//     },
//     {
//       min: 6,
//       max: 30,
//       message: "密码长度不能小于6位",
//       trigger: "blur",
//     },
//   ],
//   password2: [
//     {
//       required: true,
//       message: "密码不能为空...",
//       trigger: "blur",
//     },
//     {
//       min: 6,
//       max: 30,
//       message: "密码长度不能小于6位",
//       trigger: "blur",
//     },
//     {
//       validator: validatePass2,
//       trigger: "blur",
//     },
//   ],
// };
// // 两次密码校验方法
// const validatePass2 = (_rule, value, callback) => {
//   if (value === "") {
//     callback(new Error("请再次输入密码"));
//   } else if (value !== registerUser.password) {
//     callback(new Error("两次输入密码不一致!"));
//   } else {
//     callback();
//   }
// };