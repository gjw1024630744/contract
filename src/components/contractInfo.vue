<template>
  <div class="contractInfos">
    <van-nav-bar
      :title="!form.Contract_Num == ''?'合同详情':'新增合同'"
      left-text="返回"
      left-arrow
      @click-left="contractInfoStateChanges"
    />
    <scroller class="scroller-main" height="1">
      <div class="contractInfo">
        <div class="item" v-if="!form.Contract_Num == ''">
          <div class="label">合同编号</div>
          <div class="content">
            <input type="text" placeholder="请输入合同编号" v-model="form.Contract_Num" disabled>
          </div>
        </div>
        <div class="item">
          <div class="label">客户名称</div>
          <div class="content userName" @click="selectUserPageState = !selectUserPageState">
            <input
              type="text"
              placeholder="请输入客户名称"
              v-model="form.Contract_CustomerID.name"
              disabled="disabled"
            >
            <!-- @focus="userNameFocus"
              @blur="closeNameSelect"
            @input="inputUserName"-->
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label">产品名称</div>
          <div class="content" @click="openSelectProduct">
            <input
              type="text"
              placeholder="请选择产品"
              v-model="confirmProduct.Product_Name"
              disabled="disabled"
            >
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label">利率</div>
          <div class="content">
            <input
              type="number"
              placeholder="请先选择产品"
              v-model="confirmProduct.Product_Rate"
              disabled
            >
          </div>
        </div>
        <div class="item">
          <div class="label">加息卷</div>
          <div class="content">
            <input type="number" placeholder="请输入加息卷" v-model="form.Contract_RateStamp">
          </div>
        </div>
        <div class="item">
          <div class="label">联系电话</div>
          <div class="content">
            <input type="text" placeholder="请输入联系电话" v-model="form.Contract_Phone">
          </div>
        </div>
        <div class="item">
          <div class="label BankLabel">银行卡号</div>
          <div class="content BankContent">
            <input type="text" placeholder="请输入银行卡号" v-model="form.Contract_BankNumber">
            <p
              class="Bank"
              v-if="bankName != undefined"
              :style="{'backgroundImage':'url(https://apimg.alipay.com/combo.png?d=cashier&t='+bankName+')'}"
            ></p>
          </div>
        </div>
        <div class="item">
          <div class="label">期限</div>
          <div class="content">
            <input type="text" placeholder="请输入期限" v-model="form.Contract_TimeLimit">
          </div>
        </div>
        <div class="item">
          <div class="label">还款方式</div>
          <div class="content" @click="openSelectLendingMode">
            <input
              type="text"
              placeholder="请选择还款方式"
              v-model="confirmLendingMode"
              disabled="disabled"
            >
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label lendingLabel">出借金额</div>
          <div class="content lendingContent">
            <input type="text" placeholder="请输入出借金额" v-model="form.Contract_LendingAmount">
            <p class="lendingBG">{{smalltoBIG}}</p>
          </div>
        </div>
        <div class="item">
          <div class="label">出借开始时间</div>
          <div class="content" @click="openSelectLendingSTime">
            <input
              type="text"
              placeholder="请选择出借开始时间"
              v-model="form.Contract_LendingSTime.confirm"
              disabled="disabled"
            >
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label">出借结束时间</div>
          <div class="content" @click="openSelectLendingETime">
            <input
              type="text"
              placeholder="请选择出借结束时间"
              v-model="form.Contract_LendingETime.confirm"
              disabled="disabled"
            >
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label">出借方式</div>
          <div class="content" @click="openSelectPayMode">
            <input
              type="text"
              placeholder="请选择出借方式"
              v-model="confirmPayMode.PayMode_Name"
              disabled="disabled"
            >
            <van-icon name="arrow" class="rightSelect"/>
          </div>
        </div>
        <div class="item">
          <div class="label">合同附件</div>
          <div class="content fileContent">
            <input
              type="text"
              class="fileText"
              disabled
              v-model="form.flieText"
              placeholder="请上传合同附件"
            >
            <input
              type="file"
              name="fileUpload"
              id="fileUp"
              class="fileUp"
              @change="change($event)"
              ref="inputFile"
              placeholder="请输入合同附件"
              accept="image/gif, image/jpeg, image/png, image/jpg"
              multiple
            >
            <button class="fileBtn">
              <template v-if="form.flieText == ''">上 传 附 件</template>
              <template v-else>修 改 附 件</template>
            </button>
          </div>
        </div>
        <div class="item" v-if="initialFlieText != '' && initialFlieText != null">
          <div class="label">附件预览</div>
          <div class="content">
            <img class="fileClass" @click="Preview" :src="initialFlieText" v-if="!ifImage">
            <a :href="initialFlieText" v-else>{{form.flieText}}</a>
          </div>
        </div>
        <div class="item">
          <div class="label">合同状态</div>
          <div class="content">
            <input
              type="text"
              placeholder="请选择合同状态"
              v-model="form.Contract_State.name"
              disabled="disabled"
            >
          </div>
        </div>
        <div class="item" v-if="!form.Contract_ReviewerID == ''">
          <div class="label">审核人</div>
          <div class="content">
            <input type="text" placeholder="请输入审核人" v-model="form.Contract_ReviewerID">
          </div>
        </div>
      </div>
    </scroller>
    <!-- 底部操作栏 -->
    <div class="tool">
      <button class="updata" @click="update">
        <template v-if="!form.Contract_Num == ''">修 改</template>
        <template v-else>新 增</template>
      </button>
      <button class="delete" v-if="!form.Contract_Num == ''" @click="deleteContract">删 除</button>
    </div>
    <!-- 选择产品 -->
    <van-popup
      v-model="popupState"
      position="bottom"
      :overlay="true"
      :close-on-click-overlay="false"
      @click-overlay="overlayPopup"
    >
      <van-picker
        show-toolbar
        title="选择产品"
        :columns="popupData"
        :value-key="valueKey"
        @cancel="switchPopup"
        @confirm="onConfirm"
        v-if="!selectData"
      />
      <van-datetime-picker v-model="form.defaultDate" type="date" @confirm="onConfirm" v-else/>
    </van-popup>
    <!-- 选择用户 -->
    <div
      class="userNameSearch"
      :style="{left:userNameSearch.left+'px',top:userNameSearch.top+'px',width:userNameSearch.width+'px'}"
      v-if="userNameSearch.state && userNameSearch.data.length > 0"
    >
      <p
        class="items"
        @click="confirmName({'name':item.Customer_AccountName,'id':item.Customer_ID})"
        v-for="(item,key) in userNameSearch.data"
        :key="key"
      >{{item.Customer_AccountName}}</p>
    </div>
    <!-- 选择用户 -->
    <van-popup
      v-model="selectUserPageState"
      position="right"
      :overlay="true"
      :close-on-click-overlay="false"
      style="width:100%; height:100%"
    >
      <select-user @onCloseSelectUser="selectUserPageState = !selectUserPageState"></select-user>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"; // vuex 辅助函数
import { ImagePreview } from "vant";
import selectUser from "@/components/selectUser"; // 选择客户
import bankcardCheck from "@/assets/js/bankCardCheck.js"; // 校验银行卡号
import smalltoBIG from "@/assets/js/smalltoBIG.js"; // 转换金额

export default {
  components: { selectUser },
  data() {
    return {
      firstDeliver: "2", // 是否首投
      popupState: false,
      popupData: null,
      valueKey: "",
      popupName: "",
      confirmProduct: {}, // 产品ID 利率
      confirmLendingMode: "", // 还款方式
      confirmPayMode: {}, // 出借方式
      userNameSearch: {
        state: false,
        left: 0,
        top: 0,
        width: 0,
        data: []
      },
      selectUserPageState: false, // 选择客户页面开关状态
      selectData: false, // 选择时间
      initialFlieText: "", // 初始化上传值
      form: {
        flieText: "", // 附件名
        file: [], // 附件
        defaultDate: new Date(), // 默认时间
        Contract_Num: "", // 合同编号 新增不显示
        Contract_CustomerID: {}, // 客户ID
        Contract_Phone: "", // 电话号码
        Contract_BankNumber: "", // 银行卡号
        Contract_TimeLimit: "", // 期限
        Contract_RateStamp: "", // 加息卷
        Contract_LendingAmount: "", // 借出金额
        Contract_LendingSTime: {
          date: new Date(),
          confirm: this.format(new Date(), "yyyy-MM-dd")
        }, // 借出开始时间
        Contract_LendingETime: {
          date: new Date(),
          confirm: this.format(new Date(), "yyyy-MM-dd")
        }, // 借出结束金额
        Contract_File: "", // 合同附件
        Contract_State: "", // 合同状态  新增 待审核
        Contract_ReviewerID: "" // 审核人 新增不显示
      }
    };
  },
  computed: {
    // 过滤 是否是图片
    ifImage() {
      return this.valiImgType(this.initialFlieText);
    },
    // 过滤 银行卡所属行
    bankName() {
      return bankcardCheck(this.form.Contract_BankNumber).bankCode;
    },
    // 金额 转换大写
    smalltoBIG() {
      let n = this.form.Contract_LendingAmount;
      return smalltoBIG(n)
    },
    ...mapState({
      getContract: state => state.contract
    })
  },
  watch: {
    getContract: {
      handler(newVal, oldVal) {
        this.getVuxInfo();
      },
      deep: true
    }
  },
  mounted() {
    this.getVuxInfo();
  },
  methods: {
    valiImgType(str) {
      if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(str)) {
        return true;
      } else {
        return false;
      }
    },
    // 获取详情信息
    getVuxInfo() {
      this.form.Contract_State = this.getContract.contractState[0];
      if (this.getContract.details.Contract_Num != "") {
        this.form.Contract_LendingSTime = {
          date: new Date(
            this.getContract.details.Contract_LendingSTime.replace(/-/g, "/")
          ),
          confirm: this.format(
            new Date(
              this.getContract.details.Contract_LendingSTime.replace(/-/g, "/")
            ),
            "yyyy-MM-dd"
          )
        };
        this.form.Contract_LendingETime = {
          date: new Date(
            this.getContract.details.Contract_LendingETime.replace(/-/g, "/")
          ),
          confirm: this.format(
            new Date(
              this.getContract.details.Contract_LendingETime.replace(/-/g, "/")
            ),
            "yyyy-MM-dd"
          )
        };
      }
      this.form.flieText = this.getContract.details.Contract_File;
      this.initialFlieText = this.getContract.details.Contract_File;
      this.form.Contract_Num = this.getContract.details.Contract_Num;
      this.form.Contract_CustomerID = {
        name: this.getContract.details.Customer_Name,
        id: this.getContract.details.Contract_CustomerID
      };
      this.form.Contract_Phone = this.getContract.details.Contract_Phone;
      this.form.Contract_BankNumber = this.getContract.details.Contract_BankNumber;
      this.form.Contract_TimeLimit = this.getContract.details.Contract_TimeLimit;
      this.form.Contract_RateStamp = this.getContract.details.Contract_RateStamp;
      this.form.Contract_LendingAmount = this.getContract.details.Contract_LendingAmount;

      this.form.Contract_ReviewerID = this.getContract.details.Contract_ReviewerID;
      this.confirmProduct = {
        Product_ID: this.getContract.details.Contract_ProductID,
        Product_Name: this.getContract.details.Product_Name,
        Product_Rate: this.getContract.details.Contract_Rate
      };
      this.firstDeliver = String(
        this.getContract.details.Contract_IsFirstThrow
      );
      this.confirmLendingMode = this.getContract.details.Contract_LendingMode;
      for (let i = 0; i < this.getContract.payModeList.length; i++) {
        if (
          this.getContract.payModeList[i].PayMode_ID ==
          this.getContract.details.Contract_PayModeID
        ) {
          this.confirmPayMode = this.getContract.payModeList[i];
        }
      }
      for (let i = 0; i < this.getContract.contractState.length; i++) {
        if (
          this.getContract.contractState[i].id ==
          this.getContract.details.Contract_State
        ) {
          this.form.Contract_State = this.getContract.contractState[i];
        }
      }
      if (this.getContract.details.Contract_Num == "") {
        this.confirmPayMode = {};
        this.form.Contract_State = this.getContract.contractState[0];
        this.firstDeliver = "2";
      }
    },
    // 格式化时间
    format(date, fmt) {
      if (!date) {
        return "";
      }
      if (typeof date === "string") {
        if (date.indexOf(".") > -1) {
          // 有些日期接口返回带有.0。
          date = date.substring(0, date.indexOf("."));
        }
        // 解决IOS上无法从dateStr parse 到Date类型问题
        date = date.replace(/-/g, "/");
      }
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    // 关闭选择弹窗
    switchPopup() {
      this.popupState = !this.popupState;
    },
    // 点击遮罩关闭
    overlayPopup() {
      this.popupState = false;
    },
    // 打开选择产品
    openSelectProduct() {
      this.selectData = false;
      this.popupData = this.getContract.productList;
      this.valueKey = "Product_Name";
      this.popupName = "selectProduct";
      this.switchPopup();
    },
    // 打开选择还款方式
    openSelectLendingMode() {
      this.selectData = false;
      this.popupData = this.getContract.lendingMode;
      this.valueKey = "PayMode_Name";
      this.popupName = "selectLendingMode";
      this.switchPopup();
    },
    // 打开选择出借方式
    openSelectPayMode() {
      this.selectData = false;
      this.popupData = this.getContract.payModeList;
      this.valueKey = "PayMode_Name";
      this.popupName = "selectPayMode";
      this.switchPopup();
    },
    // 打开出借开始时间
    openSelectLendingSTime() {
      this.selectData = true;
      this.valueKey = "";
      this.popupName = "SelectLendingSTime";
      this.form.defaultDate = this.form.Contract_LendingSTime.date;
      this.switchPopup();
    },
    // 打开出借结束时间
    openSelectLendingETime() {
      this.selectData = true;
      this.valueKey = "";
      this.popupName = "SelectLendingETime";
      this.form.defaultDate = this.form.Contract_LendingETime.date;
      this.switchPopup();
    },
    // 确认选择
    onConfirm(value, index) {
      if (this.popupName == "selectProduct") {
        this.confirmProduct = value;
      }
      if (this.popupName == "selectLendingMode") {
        this.confirmLendingMode = value;
      }
      if (this.popupName == "selectPayMode") {
        this.confirmPayMode = value;
      }
      if (this.popupName == "SelectLendingSTime") {
        this.form.Contract_LendingSTime.confirm = this.format(
          value,
          "yyyy-MM-dd"
        );
      }
      if (this.popupName == "SelectLendingETime") {
        this.form.Contract_LendingETime.confirm = this.format(
          value,
          "yyyy-MM-dd"
        );
      }
      this.switchPopup();
    },
    // 客户名称 获取焦点
    userNameFocus(e) {
      this.userNameSearch.top = e.currentTarget.offsetTop + 110;
      this.userNameSearch.left = e.currentTarget.offsetLeft + 10;
      this.userNameSearch.width = e.currentTarget.offsetWidth;
      this.userNameSearch.state = true;
    },
    // 客户名称 失去焦点后关闭选择
    closeNameSelect() {
      let _this = this;
      setTimeout(() => {
        _this.userNameSearch.state = false;
      }, 100);
    },
    // 客户名称 确认选择
    confirmName(obj) {
      this.form.Contract_CustomerID = obj;
      this.userNameSearch.state = false;
    },
    // 正在输入 客户名称
    inputUserName(e) {
      this.$post(
        this.api.getcustomerlist,
        {
          KeyWord: this.form.Contract_CustomerID.name
        },
        true
      ).then(res => {
        this.userNameSearch.data = res.list;
      });
    },
    // 上传附件
    change: function(event) {
      console.log(event.target.files);
      this.form.file = event.target.files[0];
      if (this.form.file != undefined) {
        this.form.flieText = this.form.file.name;
      } else {
        this.form.flieText = this.initialFlieText;
      }
    },
    // 图片预览
    Preview() {
      ImagePreview([this.initialFlieText]);
    },
    // 提交保存 或 修改
    update() {
      let formData = new FormData();
      formData.append("Contract_Num", this.form.Contract_Num);
      formData.append("Contract_CustomerID", this.form.Contract_CustomerID.id);
      formData.append("Contract_Phone", this.form.Contract_Phone);
      formData.append("Contract_BankNumber", this.form.Contract_BankNumber);
      formData.append("Contract_TimeLimit", this.form.Contract_TimeLimit);
      formData.append("Contract_RateStamp", this.form.Contract_RateStamp);
      formData.append(
        "Contract_LendingAmount",
        this.form.Contract_LendingAmount
      );
      formData.append(
        "Contract_LendingSTime",
        this.form.Contract_LendingSTime.confirm
      );
      formData.append(
        "Contract_LendingETime",
        this.form.Contract_LendingETime.confirm
      );
      formData.append(
        "files",
        this.form.file == undefined || this.form.file == []
          ? ""
          : this.form.file
      );
      formData.append("Contract_ProductID", this.confirmProduct.Product_ID);
      formData.append("Contract_Rate", this.confirmProduct.Product_Rate);
      formData.append("Contract_LendingMode", this.confirmLendingMode);
      formData.append("Contract_PayModeID", this.confirmPayMode.PayMode_ID);
      formData.append("Contract_IsFirstThrow", this.firstDeliver);
      formData.append("Contract_ReviewerID", this.form.Contract_ReviewerID);
      formData.append("Contract_State", this.form.Contract_State.id);
      this.generateContractDetails(formData);
    },
    // 删除合同
    deleteContract() {
      this.removecontractbyid({ id: this.getContract.details.Contract_ID });
    },
    ...mapMutations({
      contractInfoStateChanges: "contractInfoStateChanges",
      generateContractDetails: "generateContractDetails"
    }),
    ...mapActions({
      removecontractbyid: "removecontractbyid"
    })
  }
};
</script>
<style scoped lang="less">
.tool {
  height: 46px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  button {
    flex: 1;
    height: 100%;
    border: 0;
    background-color: inherit;
    color: #fff;
    font-size: 0.28rem;
  }
  .updata {
    background-color: #ffb800;
  }
  .delete {
    background-color: #ff5722;
  }
}
.userNameSearch {
  position: fixed;
  left: 0;
  top: 0;
  border: 1px solid #e2e2e2;
  background-color: #fff;
  z-index: 99;
  max-height: 150px;
  overflow: auto;
  box-sizing: border-box;
  padding: 0.2rem;
  border-radius: 2px;
  box-shadow: 0px 2px 5px #ccc;
  .items {
    line-height: 40px;
    font-size: 12px;
  }
}
.scroller-main {
  height: calc(100% - 46px - 46px) !important;
  // height: 500px!important;
  top: 46px !important;
  box-sizing: border-box;
  padding: 0.2rem;
  .contractInfo {
    background-color: #fff;
    box-sizing: border-box;
    padding: 0.2rem;
    border-radius: 0.05rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0px 2px 5px #ccc;
    .itemP {
      padding: 0.4rem 0;
    }
    .item {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      .label {
        flex: 1;
        max-width: 2rem;
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 0.28rem;
        font-weight: 500;
      }
      .content {
        flex: 1;
        display: flex;
        justify-content: left;
        align-items: center;
        input {
          border: 0;
          height: 60px;
          width: 100%;
          background-color: inherit;
          font-size: 0.28rem;
        }
        .firstDeliver {
          overflow: hidden;
          .radios {
            float: left;
            margin-right: 0.5rem;
          }
        }
        .rightSelect {
          color: #ccc;
          font-size: 16px;
        }
        .fileClass {
          width: 100%;
        }
      }
      .fileContent {
        position: relative;
        .fileText {
          width: 3rem;
        }
        .fileBtn {
          width: 1.5rem;
          height: 0.8rem;
          background-color: #ffb800;
          color: #fff;
          border: 0;
          position: absolute;
          right: 0;
          top: 0.2rem;
          border-radius: 0.05rem;
          z-index: 998;
        }
        .fileUp {
          width: 1.5rem;
          height: 0.8rem;
          background-color: #ffb800;
          color: #fff;
          border: 0;
          position: absolute;
          right: 0;
          top: 0.2rem;
          border-radius: 0.05rem;
          z-index: 999;
          opacity: 0;
        }
      }
      .BankLabel,
      .lendingLabel {
        display: block;
        line-height: 60px;
      }
      .BankContent,
      .lendingContent {
        display: block;
        max-height: 100px;
        .Bank {
          position: relative;
          top: -10px;
          border: 1px solid #ccc;
          border-radius: 2px;
          overflow: hidden;
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 100%;
          width: 126px;
          height: 36px;
        }
        .lendingBG {
          position: relative;
          top: -5px;
          border-radius: 2px;
          overflow: hidden;
          height: 36px;
          font-weight: bold;
          letter-spacing: 2px;
        }
      }
      .lendingContent {
        max-height: 90px;
      }
    }
    .item:last-child {
      margin-bottom: 0.5rem;
    }
  }
}
input:disabled {
  -webkit-text-fill-color: #000;
  -webkit-opacity: 1;
  color: #000;
}
</style>

