<template>
  <div class="fundo"></div>
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
#app {
  font-family: "Poppins";
  color: #2c3e50;
  height: 100%;
  background: #f0f0f0;
}

.fundo {
  position: absolute;
  width: 100vw;
  height: 220px;
  left: 0;
  top: 0;
  background: rgb(32, 149, 242);
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
