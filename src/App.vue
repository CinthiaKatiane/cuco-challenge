<template>
  <div class="blue-header"></div>
  <header-comp />
  <router-view />
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
body {
  background: #f0f2f5;
}

#app {
  font-family: "Poppins";
  color: #2c3e50;
  height: 100%;
}

.blue-header {
  position: absolute;
  width: 100vw;
  height: 220px;
  left: 0;
  top: 0;
  background: rgb(32, 149, 242);
}
</style>
