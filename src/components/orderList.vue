<template>
  <div class="bg-wrap" style="min-height: 765px;">
    <div class="sub-tit">
      <ul>
        <li class="selected">
          <a href="/user/order-list.html">交易订单</a>
        </li>
      </ul>
    </div>
    <div class="table-wrap">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
        <tbody>
          <tr>
            <th width="16%" align="left">订单号</th>
            <th width="10%">姓名</th>
            <th width="12%">订单金额</th>
            <th width="11%">下单时间</th>
            <th width="10%">状态</th>
            <th width="12%">操作</th>
          </tr>
          <tr v-for="(item) in orderData" :key="item.id">
            <td>{{item.order_no}}</td>
            <td align="left">{{item.accept_name}}</td>
            <td align="left">
              <strong style="color: red;">￥{{item.order_amount}}</strong>
              <br>在线支付
            </td>
            <td align="left">{{item.complete_time | shortTime}}</td>
            <td align="left">{{item.statusName}}</td>
            <td align="left">
              <router-link :to="'/vipContent/orderDetails/'+item.id">查看订单</router-link>
              <br>
              <router-link :to="'/paymoney/'+item.id" v-show="item.status==1">|去付款
                <br>
              </router-link>
              <a href="javascript:void(0)">|取消</a>
              <br>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="page-foot">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data: function() {
    return {
      /* 当前页码 */
      pageIndex: 1,
      /* 页容量 */
      pageSize: 10,
      /* 订单数据 */
      orderData: [],
      /* 页面数据总数 */
      orderNum: 0
    };
  },
  methods: {
    /* 获取页面数据 */
    queryData() {
      /* 获取页面数据 */
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(rep => {
          console.log(rep);
          this.orderNum = rep.data.totalcount;
          this.orderData = rep.data.message;
        });
    },
    /* 改变每页条数 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryData();
    },
    /* 改变当前页码 */
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.queryData();
    }
  },
  created() {
    /* 获取页面数据 */
    this.queryData();
  }
};
</script>

<style>
</style>
