<script>
  export default {
    name: 'Login',
    data() {
      return {
        // login form data
        loginForm: {
          username: '',
          password: ''
        },
        // login form rules
        loginRules: {
          username: [
              { required: true, message: 'Please input username', trigger: 'blur' },
              { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
          ],
          password: [
              { required: true, message: 'Please input password', trigger: 'blur' },
              { min: 5, max: 10, message: 'Length should be 5 to 10', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // reset login form
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      // login
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (valid) {
            // make api request
            this.$axios.post('/login', this.loginForm).then(res => {
              // if api success
              if (res.status === 200) {
                console.log(res.data)
                const message = res.data.message
                const token = res.data.token
                if (message == 'success') {
                  // save token to session storage
                  window.sessionStorage.setItem('token', token)
                  // show success message
                  ElMessage({ message: 'Login success',type: 'success', })
                  // redirect to home page
                  this.$router.push('/home')
                }
                else {
                  // show error message
                  ElMessage({ message: 'Login failed, username or password is wrong.', type: 'error' })
                }
              }
              else{
                // show error message
                ElMessage({ message: 'Login failed, can not connect to server.', type: 'error' })
              }
            })
          }
          else {
            return false
          }
        })
      }
    }
  }
</script>

<template>
    <div class="login_container">
        <div class="login_box">
            <!-- Avatar -->
            <div class="avatar_box">
                <img src="/src/assets/logo.png" alt="avatar"/>
            </div>
            <!-- Login form -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
              <!-- user name -->
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="User"></el-input>
              </el-form-item>
              <!-- password -->
              <el-form-item prop="password">
                <el-input  v-model="loginForm.password" prefix-icon="Lock" type="password" @keyup.enter="login"></el-input>
              </el-form-item>
              <!-- buttons -->
              <el-form-item class="btns">
                <el-button type="info" @click="login" >Login</el-button>
                <el-button type="info" @click="resetLoginForm">Reset</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="less" scoped>
.login_container {
    background-color: #1f1c1c;
    background-size: cover;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: white 1px solid;
        padding: 2px;
        background-color: white;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}

.btns  {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>