<template>
  <v-card class="check-card">
    <v-icon size="x-large" class="alert-icon"> mdi-alert </v-icon>
    <h2>Atenção</h2>
    <p>Você tem certeza que quer excluir o(s) cliente(s) selecionado(s)?</p>
    <v-row>
      <v-col>
        <v-btn flat @click="$emit('close')" style="color: #969cb2">
          Cancelar
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="#E52E4D" @click="$emit('remove')" style="color: white">
          Excluir
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CardOverlay",
  emits: ["remove", "close"],
};
</script>

<style>
p {
  color: #969cb2;
}

.check-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 24px;
  border-radius: 6px;
}

.alert-icon {
  background: #feebc8;
  color: #dd6b20;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  padding-bottom: 2px;
}
</style>
