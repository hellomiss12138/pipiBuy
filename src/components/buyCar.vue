<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" >商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车没有商品时显示内容 -->
                                <tr v-show="shopList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                 <!-- 购物车有商品时显示内容 -->
                                <tr v-for="(item,index) in shopList" :key="item.id">
                                  <td>
                                      <el-switch
                                      v-model="shopList[index].isChecked"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                      </el-switch>
                                  </td>
                                  <td class="lalala">
                                      <img class="shopImg" :src="item.img_url" alt="">
                                      <span class="shopTitle">{{item.title}}</span>
                                  </td>
                                  <td>{{item.sell_price}}</td>
                                  <!-- 计数器 -->
                                  <td>
                                      <el-input-number v-model="shopList[index].buycount"></el-input-number>
                                  </td>
                                  <td>{{item.sell_price*item.buycount}}</td>
                                  <!-- 删除按钮 -->
                                  <td>
                                      <el-button @click="delAffirm(index)" type="danger" icon="el-icon-delete" circle></el-button>
                                  </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrices}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "buyCar",
  data: function() {
    return {
      /* 商品数据 */
      shopList: []
    };
  },
  methods: {
    /* 确定是否删除 */
    delAffirm(index) {
      this.$confirm("您确定要移除改商品么?", "温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "我不删了",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          /* 删除被移除商品的数据 */
          this.$delete(this.shopList, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
    /* 计算商品总价 */
    totalPrices() {
      let pricesNum = 0;
      this.shopList.forEach(v => {
        if (v.isChecked == true) {
          pricesNum += v.sell_price * v.buycount;
        }
      });
      return pricesNum;
    },
    /* 计算商品总数 */
    totalNum() {
      let Num = 0;
      this.shopList.forEach(v => {
        if (v.isChecked == true) {
          Num += v.buycount;
        }
      });
      return Num;
    }
  },
  watch: {
    // 深度 watcher 侦听商品数据改变
    shopList: {
      handler: function(val, oldVal) {
        /* 取出数据库中的值,生成一个 id(key):num(value)的对象 */
        let obj = {};
        val.forEach(v => {
          obj[v.id] = v.buycount;
        });
        /* 将obj对象传入Vuex的数据库中 */
        this.$store.commit("updateCar", obj);
      },
      deep: true
    }
  },
  created() {
    /* 获取购物车数据 */
    let carData = this.$store.state.carData;
    /* 取出商品id */
    let id = "";
    for (const key in carData) {
      id += key + ",";
    }
    id = id.substr(0, id.length - 1);
    /* 获取商品数据 */
    this.$axios.get(`site/comment/getshopcargoods/${id}`).then(rep => {
      this.shopList = rep.data.message;

      this.shopList.forEach(v => {
        /* 将数量添加至商品数据中 */
        v.buycount = carData[v.id];
        /* 给商品添加默认选中属性 */
        this.$set(v, "isChecked", true);
      });
    });
  }
};
</script>

<style>
.lalala {
  display: flex;
  align-items: center;
}
.shopImg {
  height: 100px;
  display: inline-block;
}

.shopTitle {
  margin-left: 10px;
}
</style>
