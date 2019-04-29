<template>
  <div class="contractList">
    <van-search v-model="contractNumbering" placeholder="请输入合同编号" show-action @search="onSearch">
      <div slot="action" class="addContract" @click="addContractDetails">
        <i class="iconfont iconxinzeng1"></i>
      </div>
    </van-search>
    <scroller
      class="scroller-main"
      height="1"
      :on-refresh="onRefresh"
      :on-infinite="onInfinite"
      ref="my_scroller"
    >
      <div class="contractItem">
        <div
          class="item"
          @click="getContractDetails({id:item.Contract_ID})"
          v-for="(item,key) in getContract.list"
          :key="key"
        >
          <div
            class="status"
            :style="{backgroundColor:contractState[item.Contract_State].color}"
          >{{contractState[item.Contract_State].name}}</div>
          <div class="headerInfo">
            <div class="Numbering">合同编号: {{item.Contract_Num}}</div>
            <div class="clientName">客户名称: {{item.Customer_Name}}</div>
            <div class="productName">产品名称: {{item.Product_Name}}</div>
          </div>
          <van-row class="otherInfo">
            <van-col span="8">
              <p>开始时间</p>
              <p>{{item.Contract_LendingSTime | formatDate}}</p>
            </van-col>
            <van-col span="8">
              <p>结束时间</p>
              <p>{{item.Contract_LendingETime | formatDate}}</p>
            </van-col>
            <van-col span="8">
              <p>出借金额</p>
              <p>￥{{item.Contract_LendingAmount}}</p>
            </van-col>
          </van-row>
        </div>
      </div>
    </scroller>
    <van-popup
      class="contract-info-popup"
      v-model="getContract.contractInfoState"
      position="right"
      :overlay="true"
    >
      <contract-info></contract-info>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"; // vuex 辅助函数
import contractInfo from "@/components/contractInfo";
import { setTimeout } from "timers";
export default {
  components: { contractInfo },
  data() {
    return {
      page: 1,
      article: 4,
      num: 5,
      contractNumbering: "",
      contractState: [
        "",
        {
          name: "待审核",
          id: 1,
          color: "#FFB800"
        },
        {
          name: "审核通过",
          id: 2,
          color: "#01AAED"
        },
        {
          name: "合同已终止",
          id: 3,
          color: "#FF5722"
        }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      return value.slice(0, value.length - 9);
    }
  },
  computed: {
    ...mapState({
      getContract: state => state.contract
    })
  },
  methods: {
    // 格式化时间
    format(date, format) {},
    // 执行 vuex Actions 获取合同列表
    contractList(fun) {
      this.getContractList({
        page: this.page,
        article: this.article,
        contractNumbering: this.contractNumbering,
        success(res) {
          return fun(res);
        }
      });
    },
    //搜索
    onSearch() {
      this.page = 1;
      this.contractList();
    },
    // 下拉刷新
    onRefresh(done) {
      this.page = 1;
      this.contractList(res => {
        done();
      });
    },
    // 上拉加载
    onInfinite(done) {
      let _this = this;
      this.contractList(res => {
        if (res.list.length < this.article) {
          _this.$refs.my_scroller.finishInfinite(true);
        } else {
          _this.page++;
          _this.$refs.my_scroller.finishInfinite();
        }
      });
    },
    ...mapMutations({
      contractInfoStateChanges: "contractInfoStateChanges",
      addcontract: "addcontract",
      addContractDetails: "addContractDetails"
    }),
    ...mapActions({
      getContractDetails: "getContractDetails",
      getContractList: "getContractList"
    })
  }
};
</script>

<style scoped lang="less">
.addContract {
  width: 0.7rem;
  text-align: center;
  height: 34px;
  i {
    font-size: 0.7rem;
    color: #ffb800;
    position: relative;
    top: 0.055rem;
  }
}
.contract-info-popup {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
.scroller-main {
  height: calc(100% - 54px) !important;
  top: 54px !important;
  .contractItem {
    box-sizing: border-box;
    padding: 0 0.2rem;
    border: 0;
    .item {
      background-color: #fff;
      margin-top: 0.2rem;
      box-sizing: border-box;
      padding: 0.2rem;
      border-radius: 0.05rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0px 2px 5px #ccc;
      .status {
        color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.1rem 0.2rem;
        border-radius: 0 0 0 0.05rem;
      }
      .headerInfo {
        font-size: 0.26rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #d8d8d8;
        .Numbering,
        .clientName,
        .productName {
          padding: 0.1rem 0;
        }
      }
      .otherInfo {
        padding-top: 0.2rem;
        text-align: center;
        > div {
          border-right: 1px solid #ccc;
        }
        > div:last-child {
          border: 0;
        }
        p {
          line-height: 0.5rem;
        }
      }
    }
  }
}
</style>
