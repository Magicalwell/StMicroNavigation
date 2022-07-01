<template>
  <div id="login">
    <div class="left">
      <img
        :src="require('@/assets/images/2.jpg')"
        alt=""
        class="login-img-left"
      />
    </div>
    <div class="right">
      <el-form
        class="login-form"
        :rules="rules"
        :model="queryData"
        ref="loginForm"
      >
        <div class="login-title">
          <h2>账号登录</h2>
        </div>
        <el-form-item prop="username">
          <el-input class="input-wrap" v-model.trim="queryData.username">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input-wrap"
            show-password
            v-model.trim="queryData.password"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn" @click="gotohome"
          >登录</el-button
        >
        <div class="login-footer">
          <el-checkbox
            class="auto-login-btn"
            style="color: #4e5969"
            v-model="queryData.autoLogin"
            >自动登录</el-checkbox
          >
          <a href="javascript:;" style="color: #4e5969">忘记密码?</a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryData: {},
      rules: {
        username: [
          {
            required: true,
            message: "输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    gotohome() {
      this.$refs.loginForm.validate((val) => {
        if (val) {
          this.$store.dispatch("login", this.queryData).then((res) => {
            console.log(res);
            this.$router.push("/home");
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  color: #4e5969;
  display: flex;
  > div {
    display: flex;
  }
  .left {
    width: 35%;
    overflow: hidden;
    position: relative;

    .login-img-left {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: fill;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: rgba($color: #000000, $alpha: 0.4);
      transition: all 0.3s ease;
    }
    &:hover {
      &::after {
        background-color: rgba($color: #000000, $alpha: 0.2);
      }
    }
  }
  .right {
    flex: 1;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 45%;
      border: 1px solid #ccc;
      padding: 16px;
      font-size: 14px;
      background-color: #fff;
      ::v-deep .el-input__inner {
        background-color: #f2f3f5;
        &:hover {
          background-color: rgba($color: #000000, $alpha: 0.1);
          border-color: rgba($color: #000000, $alpha: 0.1);
        }
      }
      .login-btn {
        background-color: #165dff;
        font-size: 14px;
        border-color: #165dff;
        margin-top: 1.5rem;
        width: 100%;
      }
    }
    .login-footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      .auto-login-btn {
        padding-left: 5px;
        ::v-deep .el-checkbox__label {
          color: #4e5969 !important;
        }
      }
    }
    .login-title {
      margin-bottom: 20px;
    }
    .el-input__icon {
      color: #4e5969;
    }
  }
}
</style>
