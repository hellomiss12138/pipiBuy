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
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <div id="orderForm" name="orderForm" url>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="收货人姓名" prop="accept_name">
                  <el-input v-model="ruleForm.accept_name"></el-input>
                </el-form-item>
                <!-- 省市联动选择器 -->
                <div id="citySelect">
                  <span>所属地区</span>
                  <v-distpicker
                    @selected="selectedCode"
                    :province="select.province"
                    :city="select.city"
                    :area="select.area"
                  ></v-distpicker>
                </div>
                <el-form-item label="详细地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                  <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="emali">
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="postcode">
                  <el-input v-model="ruleForm.post_code"></el-input>
                </el-form-item>
              </el-form>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <el-radio v-model="ruleForm.payment_id" label="6">在线支付 手续费：0.00元</el-radio>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>
                  <label>
                    <el-radio-group v-model="ruleForm.express_id">
                      <el-radio @change="expressChange(24)" :label="1">顺丰 费用：24.00元</el-radio>
                      <el-radio @change="expressChange(12)" :label="2">圆通 费用：12.00元</el-radio>
                      <el-radio @change="expressChange(8)" :label="3">韵达 费用：8.00元</el-radio>
                    </el-radio-group>
                    <span class="Validform_checktip"></span>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table"
              >
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="(item) in shopList" :key="item.id">
                    <td width="68">
                      <router-link :to="'/details/'+item.id">
                        <img :src="item.img_url" class="img">
                      </router-link>
                    </td>
                    <td>
                      <router-link :to="'/details/'+item.id">{{item.title}}</router-link>
                    </td>
                    <td>
                      <span class="red">￥{{item.sell_price}}</span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">￥{{item.sell_price*item.buycount}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea
                        name="message"
                        class="input"
                        style="height:35px;"
                        v-model="ruleForm.message"
                      ></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{allNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label
                      id="goodsAmount"
                      class="price"
                    >{{allPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{allPrice+ruleForm.expressMoment}}</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="/cart.html">返回购物车</a>
                    <a id="btnSubmit" @click="submitForm('ruleForm')" class="btn submit">确认提交</a>
                  </p>
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
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  data() {
    /* 手机号码判断逻辑函数 */
    var validatePass = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value) == false) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    /* 电子邮箱判断逻辑函数 */
    var validatePass2 = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value) == false) {
        callback(new Error("请输入正确的电子邮箱"));
      } else {
        callback();
      }
    };
    /* 邮编判断逻辑函数 */
    var validatePass3 = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(?!\d)$/;
      if (reg.test(value) == false) {
        callback(new Error("请输入正确的电子邮箱"));
      } else {
        callback();
      }
    };
    return {
      /* 商品数据 */
      shopList: [],
      /* 省市联动选择器数据 */
      select: { province: "广东省", city: "深圳市", area: "宝安区" },
      /* 表单数据 */
      ruleForm: {
        goodsAmount: 0,
        expressMoment: 24,
        accept_name: "皮皮波",
        address: "皮皮洞1号洞,7号床铺旁边的垃圾桶",
        mobile: "18777777777",
        emali: "pipipi@qq.com",
        post_code: "337777",
        payment_id: "6",
        express_id: 1,
        message: "不要问,问了就是皮",
        goodsids: "",
        cargoodsobj: {},
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        }
      },
      /* 表单规则 */
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "change" },
          { min: 10, message: "长度至少10个字符", trigger: "change" }
        ],
        mobile: [{ validator: validatePass, trigger: "change" }],
        emali: [{ validator: validatePass2, trigger: "change" }],
        post_code: [{ validator: validatePass3, trigger: "change" }]
      }
    };
  },
  /* 局部引入省市联动选择器插件 */
  components: { VDistpicker },
  methods: {
    /* 快递变更 */
    expressChange(value) {
      this.ruleForm.expressMoment = value;
    },
    /* 省市联动选择器 */
    selectedCode(val) {
      console.log(val);
      this.ruleForm.area = val;
    },
    /* 表单提交验证 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /* 验证通过 */
          /* 提交表单 */
          this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(rep => {
              if (rep.data.status === 0) {
                /* 订单提交成功 */
                this.$message({
                  message: "订单提交成功",
                  type: "success"
                });
                /* 删除购物车数据 */
                for (const key in this.ruleForm.cargoodsobj) {
                  this.$store.commit("delCar", key);
                }
                /* 保存订单id */
                let orderid = rep.data.message.orderid;
                /* 跳转至支付中心 */
                this.$router.push(`/paymoney/${orderid}`);
              } else {
                this.$message.error("订单提交失败,请重试!!!");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  computed: {
    /* 商品总数量 */
    allNum() {
      let num = 0;
      this.shopList.forEach(v => {
        num += v.buycount;
      });
      return num;
    },
    /* 商品总价格 */
    allPrice() {
      let price = 0;
      this.shopList.forEach(v => {
        price += v.buycount * v.sell_price;
      });
      /* 将总价格添加至数据中 */
      this.ruleForm.goodsAmount = price;
      return price;
    }
  },
  created() {
    /* 获取传递过来的商品id */
    let ids = this.$route.params.ids;
    this.ruleForm.goodsids = ids;
    /* 获取商品数据 */
    this.$axios.get(`site/validate/order/getgoodslist/${ids}`).then(rep => {
      /* 生成表单数据中的商品对象 id(key):num(value) */
      let cargoodsonj = {};
      /* 获取并改变商品数量 */
      rep.data.message.forEach(v => {
        v.buycount = this.$store.state.carData[v.id];
        cargoodsonj[v.id] = v.buycount;
      });
      /* 将商品对象存到表单数据中 */
      this.ruleForm.cargoodsobj = cargoodsonj;
      this.shopList = rep.data.message;
    });
  }
};
</script>

<style>
#citySelect {
  display: flex;
  font-size: 14px;
  align-items: center;
  padding-bottom: 20px;
}
#citySelect span {
  margin-right: 10px;
  margin-left: 34px;
}
</style>
