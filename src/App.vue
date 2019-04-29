<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
body {
  font-size: 0.24rem;
  #nav {
    border: 1px solid #f00;
  }
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #F2F2F2
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
// 点击效果
.activeStyle {
  position: relative;
}
.activeStyle::before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0;
  width: 100%;
  height: 100%;
  border: inherit;
  border-color: #000;
  background-color: #000;
  border-radius: inherit;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.activeStyle:active::before {
  opacity: 0.1;
}
// color
.red{
  color: #E32929;
}
.blue{
  color: #19B5FE;
}
.white{
  color: #fff;
}
// background color
.bg_red{
  background-color: #E32929
}
.bg_blue{
  background-color: #19B5FE
}
</style>
