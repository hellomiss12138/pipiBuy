<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 商品大图展示 -->
                            <div class="pic-box">
                                <!-- 放大镜 -->
                                <ProductZoomer
                                  :base-images="images"
                                  :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{commodityData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{commodityData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{commodityData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{commodityData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{commodityData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                                                </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{commodityData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="$store.commit('increment')" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <Affix>
                                         <li>
                                        <a href="javascript:;" :class="{selected:isShow==0}" @click="isShow=0" >商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="isShow=1" :class="{selected:isShow==1}" >商品评论</a>
                                    </li>
                                    </Affix>
                                </ul>
                            </div>
                            <div v-html="commodityData.goodsinfo.content" class="tab-content entry"  v-show="isShow==0">
                                
                            </div>
                            <div class="tab-content" v-show="isShow==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" @keyup.enter="submitComments" v-model.trim="commentText"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="submitComments">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comment.totalcount==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item) in comment.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | shortTime }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 分页器 -->
                                      <Page :total="comment.totalcount" show-elevator :current='pageIndex' :page-size='pageSize' @on-change='changPage' show-sizer placement='top' :page-size-opts='[6,12,18]' @on-page-size-change='changPageSize' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in commodityData.hotgoodslist" :key="item.id" >
                                        <div class="img-box">
                                           <router-link :to="'/details/'+item.id">
                                            <img :src="item.img_url">
                                           </router-link>
                                        </div>
                                        <div class="txt-box">
                                             <router-link :to="'/details/'+item.id">
                                            {{item.title}}
                                           </router-link>
                                            <span>{{item.add_time | shortTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
            <BackTop></BackTop>
    </div>
</template>

<script>
export default {
  name: "detail",
  data: function() {
    return {
      /* 商品ID */
      artID: {},
      /* 商品数据 */
      commodityData: {},
      /* 购买商品的数量 */
      buyNum: 1,
      /* 显示的模块 */
      isShow: 0,
      /* 评论数据 */
      comment: {},
      /* 当前页码 */
      pageIndex: 1,
      /* 每页显示的条数 */
      pageSize: 6,
      /* 发表的评论 */
      commentText: "",
      /* 放大镜图片 */
      images: {
        // required
        normal_size: [
          /* { id: "unique id", url: "image url" },
          { id: "unique id", url: "image url" } */
        ]
      },
      /* 放大镜的参数 */
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    /* 获取数据,渲染页面 */
    initCreated() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.artID.id}`
        )
        .then(rep => {
          this.commodityData = rep.data.message;
          this.commodityData.imglist.forEach(ele => {
            this.images.normal_size.push({
              id: ele.id,
              url: ele.thumb_path
            });
          });
        });
    },
    /* 获取评论数据 */
    queryComment() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.artID.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(rep => {
          this.comment = rep.data;
        });
    },
    /* 改变评论页码 */
    changPage(page) {
      this.pageIndex = page;
      /* 获取评论数据 */
      this.queryComment();
    },
    /* 提交评论 */
    submitComments() {
      /* 判断输入是否为空 */
      if (this.commentText == "") {
        this.$message({
          message: "评论不可为空,请重新输入!!!",
          type: "warning"
        });
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.artID.id}`, {
            commenttxt: this.commentText
          })
          .then(rep => {
            if (rep.data.status == 0) {
              /* 弹出提示 */
              this.$message({
                message: "恭喜您,评论发表成功(*^__^*) ",
                type: "success"
              });
              /* 分页页码调回第一页 */
              this.pageIndex = 1;
              /* 重新获取评论数据 */
              this.queryComment();
              /* 清空文本框 */
              this.commentText = "";
            } else {
              /* 弹出提示 */
              this.$message.error("糟糕,评论发表失败!!!");
            }
          });
      }
    },
    /* 改变每页显示的页码数 */
    changPageSize(pageSizes) {
      /* 改变每页显示的页码数 */
      this.pageSize = pageSizes;
      /* 分页页码调回第一页 */
      this.pageIndex = 1;
      /* 重新获取评论数据 */
      this.queryComment();
    }
  },
  created() {
    /* 获取传递过来的商品ID */
    this.artID = this.$route.params;
    /* 获取数据,渲染页面 */
    this.initCreated();
    /* 获取评论数据 */
    this.queryComment();
  },
  /* 侦听器 */
  watch: {
    $route(newVal, oldVal) {
      /* 回到顶部 */
      window.scrollTo(0, 0);
      /* 重新获取商品id */
      this.artID = this.$route.params;
      /*初始化购买数量 */
      this.buyNum = 1;
      /* 初始化当前页码 */
      this.pageIndex = 1;
      /* 获取数据,渲染页面 */
      this.initCreated();
      /* 获取评论数据 */
      this.queryComment();
    }
  }
};
</script>

<style>
.goods-tab .tab-head ul li a {
  background-color: #fff;
}

.inline-zoomer-zoomer-box {
  width: 510px ;
}
</style>


