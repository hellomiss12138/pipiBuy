<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderData.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderData.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderData.area}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderData.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderData.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderData.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <!-- 二维码 -->
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderid"
                    :options="{ size: 300 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* 导入二维码插件 */
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  name: "paymoney",
  data: function() {
    return {
      /* 订单id */
      orderid: "",
      /* 订单数据 */
      orderData: {}
    };
  },
  components: {
    [VueQrcode.name]: VueQrcode
  },
  created() {
    /* 获取订单id */
    this.orderid = this.$route.params.orderid;
    /* 获取订单数据 */
    this.$axios
      .get(`site/validate/order/getorder/${this.orderid}`)
      .then(rep => {
        this.orderData = rep.data.message[0];
      });

    /* 设置定时器,判断是否支付完成 */
    setInterval(() => {
      /* 获取订单数据 */
      this.$axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(rep => {
          if (result.data.message[0].status === 2) {
            // 已经支付成功
            // 提示用户
            this.$Message.success("恭喜你,支付成功,安心等待快递吧!!!");
            // 跳转到支付成功页
            this.$router.push("/paySuccess");
          }
        });
    }, 2000);
  }
};
</script>

<style>
</style>
