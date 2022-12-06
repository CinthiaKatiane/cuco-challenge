<template>
  <v-container>
    <h1>Clientes</h1>
    <v-row class="table-title">
      <v-col cols="1" class="">
        <v-checkbox
          @click="selectAll"
          v-model="allSelected"
          color="red"
          hide-details
        />
      </v-col>
      <v-col cols="5" align-self="center"> NOME </v-col>
      <v-col cols="2" align-self="center"> DATA DE NASCIMENTO </v-col>
      <v-col cols="2" align-self="center"> TELEFONE </v-col>
      <v-col cols="2" align-self="center">
        <v-btn
          v-if="userIds.length > 0"
          prepend-icon="mdi-delete"
          color="error"
          @click="checkRemove"
        >
          Excluir
        </v-btn>
        <v-overlay v-model="overlay">
          <v-card class="check-card">
            <v-icon size="x-large" color="orange" class="alert-icon">
              mdi-alert
            </v-icon>
            <h2>Atenção</h2>
            Você tem certeza que quer excluir o(s) cliente(s) selecionado(s)?
            <v-row>
              <v-col>
                <v-btn flat @click="overlay = false"> Cancelar </v-btn>
              </v-col>
              <v-col>
                <v-btn color="#E52E4D" @click="remove"> Excluir </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-overlay>
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
            v-model="userIds"
            color="red"
            :value="user.id"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="5" align-self="center">
          <h3>{{ user.name }}</h3>
          <p>{{ user.cpf }}</p>
        </v-col>
        <v-col cols="2" align-self="center">
          <p>{{ user.birthdate }}</p>
        </v-col>
        <v-col cols="2" align-self="center">
          <p>{{ user.phone }}</p>
        </v-col>
        <v-col cols="2" align-self="center">
          <router-link to="/edit" class="router-link">
            <v-btn prepend-icon="mdi-pencil" color="success">Editar</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-card>
    <v-pagination
      v-if="users.length"
      v-model="pagination.page"
      :length="pagination.total / pagination.perPage"
      :total-visible="pagination.visible"
      @input="next"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      allSelected: false,
      userIds: [],
      users: {},
      totalUsers: 0,
      overlay: false,
      pagination: {
        page: 1,
        total: 100,
        perPage: 5,
        visible: 4,
      },
    };
  },
  watch: {
    "pagination.page": function (newPage) {
      this.next(newPage);
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get("http://localhost:3003/clients?_page=1&_limit=5")
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
    selectAll() {
      this.userIds = [];
      if (!this.allSelected) {
        for (let user in this.users) {
          this.userIds.push(this.users[user].id);
        }
      }
    },
    next(page) {
      axios
        .get(
          `http://localhost:3003/clients?_page=${page}&_limit=${this.pagination.perPage}`
        )
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.allSelected = false;
      this.userIds = [];
    },
  },
};
</script>

<style scoped>
.cards {
  margin-bottom: 2em;
}
.table-title {
  padding-left: 20px;
  padding-right: 20px;
  font-size: small;
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

.alert-icon {
  background: #feebc8;
  width: 60px;
  height: 60px;
  border-radius: 25px;
  padding-bottom: 2px;
}
.check-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 24px;
  background: #fff;
  border-radius: 6px;
  align-self: center;
}
h3 {
  color: #363f5f;
}
p {
  color: #969cb2;
}
</style>
