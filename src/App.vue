<template>
  <div class="fundo"></div>
  <header-comp />
  <router-view class="router-view" />
</template>

<script>
import HeaderComp from "./components/Header.vue";
export default {
  name: "App",
  components: {
    HeaderComp,
  },
};
</script>
<style>
#app {
  font-family: "Poppins";
  color: #2c3e50;
  height: 100vw;
  background: #f0f0f0;
}

.fundo {
  position: absolute;
  width: 100vw;
  height: 26vh;
  left: 0px;
  top: 0px;
  background: rgb(32, 149, 242);
}

.router-view {
  height: 26vh;
}

nav {
  padding: 30px;
  text-align: center;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
