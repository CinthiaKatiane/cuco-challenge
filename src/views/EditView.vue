<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <h1>Editar Cliente</h1>
        <InputForm :userId="$route.params.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputForm from "../components/Form.vue";
export default {
  name: "EditView",
  components: {
    InputForm,
  },
};
</script>

<style>
h1 {
  position: relative;
  color: #fff;
}
</style>
