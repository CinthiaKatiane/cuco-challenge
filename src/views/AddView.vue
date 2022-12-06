<template>
  <div>
    <h1>Novo Cliente</h1>
    <InputForm />
  </div>
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
