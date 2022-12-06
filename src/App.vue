<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/add">Adicionar</router-link> |
    <router-link to="/edit">Editar</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: "Poppins";
  color: #2c3e50;
  background: #f0f0f0;
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
