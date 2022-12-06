<template>
  <v-container>
    <h1>Clientes</h1>
    <v-row>
      <v-col cols="1" class=""></v-col>
      <v-col cols="5" align-self="center"> NOME </v-col>
      <v-col cols="2" align-self="center"> DATA DE NASCIMENTO </v-col>
      <v-col cols="2" align-self="center"> TELEFONE </v-col>
      <v-col cols="2" align-self="center">
        <v-btn
          v-if="selected.length > 0"
          prepend-icon="mdi-delete"
          color="error"
        >
          Excluir
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      flat
      v-for="user in users"
      :key="user.id"
      color="#FFF"
      class="cards pa-5"
    >
      <v-row>
        <v-col cols="1">
          <v-checkbox
            v-model="selected"
            color="red"
            :value="user.id"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="5" align-self="center">
          <h3>{{ user.name }}</h3>
          {{ user.cpf }}
        </v-col>
        <v-col cols="2" align-self="center">
          {{ user.birthdate }}
        </v-col>
        <v-col cols="2" align-self="center">
          {{ user.phone }}
        </v-col>
        <v-col cols="2" align-self="center">
          <router-link to="/edit" class="router-link">
            <v-btn prepend-icon="mdi-pencil" color="success">Editar</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      is_selected: false,
      selected: [],
      users: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get("http://localhost:3003/clients")
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkRemove() {
      this.overlay = !this.overlay;
    },
    remove() {
      this.overlay = false;
    },
  },
};
</script>

<style scoped>
.cards {
  margin: 2em;
}

h1 {
  position: relative;
  padding-left: 3vh;
  color: #fff;
}
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
