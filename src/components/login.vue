<template>
 <div class="login">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model.trim="userName" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input @keyup.enter="loging" v-model.trim="passWord" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click='loging' name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      /* 帐号 */
      userName: "",
      /* 密码 */
      passWord: ""
    };
  },
  methods: {
    /* 登录点击事件 */
    loging() {
      /* 判断输入是否为空 */
      if (this.userName == "" || this.passWord == "") {
        this.$message({
          message: "嗨佬,用户名和密码不允许为空!!!",
          type: "warning"
        });
        return;
      }
      /* 发送axios */
      this.$axios
        .post("site/account/login", {
          user_name: this.userName,
          password: this.passWord
        })
        .then(rep => {
          /* 判断登录是否成功 */
          console.log(rep);
          if (rep.data.status === 0) {
            /* 提示登录成功 */
            this.$message({
              message: "恭喜你,登录成功!!!",
              type: "success"
            });
             this.$store.state.isLogin = true;
            /* 跳转到上一页 */
            this.$router.go(-1);
          } else {
            this.$message.error("帐号或密码错误,请重新输入!!!");
          }
        });
    }
  }
};
</script>

<style>
</style>
