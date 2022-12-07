<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <h1>Clientes</h1>
        <DisplayClients />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DisplayClients from "../components/Display.vue";

export default {
  name: "HomeView",
  components: {
    DisplayClients,
  },
};
</script>
