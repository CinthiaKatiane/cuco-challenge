<template>
  <v-toolbar color="#2095F2" class="nav-bar">
    <v-container class="teste">
      <v-row justify="center" align="center">
        <v-col cols="10">
          <v-row justify="space-between">
            <v-col cols="auto" class="mr-auto">
              <router-link to="/" class="router-link">
                <v-img
                  class="logo"
                  src="../assets/logo.png"
                  width="150px"
                  align-self="end"
                />
              </router-link>
            </v-col>
            <v-col cols="auto">
              <router-link to="/add" class="router-link">
                <v-btn
                  variant="flat"
                  size="large"
                  color="#ee2279"
                  class="button-font"
                >
                  Novo Cliente
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "HeaderComp",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-application__wrap {
  min-height: 0;
}

.nav-bar {
  padding-top: 1em;
  padding-bottom: 2em;
  background-color: rgb(32, 149, 242);
  width: 100%;
}

.teste {
  position: relative;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
.button-font {
  color: white !important;
  text-transform: capitalize;
}
</style>
