<template>
  <div class="selectUser">
    <div class="searchHeader">
      <div class="return" @click="colse">
        <van-icon name="arrow-left"/>返回
      </div>
      <van-search placeholder="请输入用户姓名" v-model="userName" class="search"/>
    </div>
    <scroller class="scroller">
      <div class="list">
        <div class="items">
          <div class="name">公劲伟</div>
          <div class="num">370983199611080519</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: ""
    };
  },
  mounted(){
    console.log(1)
  },
  methods:{
    colse(){
       this.$emit('onCloseSelectUser');
    }
  }
};
</script>

<style scoped lang="less">
.selectUser {
  .searchHeader {
    display: flex;
    border-bottom: 3px solid #f0f0f0;
    .return {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #1989fa;
      max-width: 50px;
      padding-left: 10px;
      i {
        font-size: 16px;
        color: #1989fa;
        margin-right: 2px;
      }
    }
    .search {
      flex: 1;
    }
  }
  .scroller {
    height: calc(100% - 54px) !important;
    top: 54px !important;
    box-sizing: border-box;
  }
  .list {
    .items {
      display: flex;
      line-height: 1rem;
      box-sizing: border-box;
      padding: 0 0.35rem;
      border-bottom: 1px solid #f0f0f0;
      .name {
        flex: 1;
        max-width: 2rem;
        font-size: 0.28rem;
        text-align: left;
      }
      .num {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
