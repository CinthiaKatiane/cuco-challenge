<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <h1>Novo Cliente</h1>
        <InputForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputForm from "../components/Form.vue";

export default {
  name: "AddView",
  components: {
    InputForm,
  },
};
</script>

<style scoped>
h1 {
  position: relative;
  color: #fff;
}
</style>
