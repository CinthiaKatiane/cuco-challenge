<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="10">
        <h1>Clientes</h1>
        <v-row>
          <v-col>
            <v-card-text class="search-bar">
              <v-text-field
                v-model="search"
                variant="solo"
                label="Digite aqui um nome ou CPF..."
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row class="table-title" v-if="users.length > 0">
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
            <v-overlay class="overlay-delete" v-model="overlay">
              <v-card class="check-card">
                <v-icon size="x-large" color="orange" class="alert-icon">
                  mdi-alert
                </v-icon>
                <h2>Atenção</h2>
                <p>
                  Você tem certeza que quer excluir o(s) cliente(s)
                  selecionado(s)?
                </p>
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
        <div v-if="users.length > 0">
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
                <router-link
                  :to="{ path: '/edit/' + user.id }"
                  class="router-link"
                >
                  <v-btn prepend-icon="mdi-pencil" color="success">
                    Editar
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-card>
          <v-pagination
            v-model="pagination.page"
            :length="pagination.total"
            :total-visible="pagination.visible"
            @input="next"
          ></v-pagination>
        </div>
        <div v-else>
          <h2 class="notfound">
            Não foram encontrados resultados para essa pesquisa.
          </h2>
        </div>
      </v-col>
    </v-row>
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
      search: "",
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
    search: function () {
      this.pagination.page = 1;
      this.getSize();
      this.next(1);
    },
  },
  created() {
    this.getSize();
    this.next(1);
  },
  methods: {
    next(page) {
      axios
        .get(
          `http://localhost:3003/clients?q=${this.search}&_page=${page}&_limit=${this.pagination.perPage}`
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
    getSize() {
      axios
        .get(`http://localhost:3003/clients?q=${this.search}`)
        .then((res) => {
          let totalPages_pre = res.data.length / 5;
          this.pagination.total =
            res.data.length % 5 == 0 ? totalPages_pre : totalPages_pre + 1;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkRemove() {
      this.overlay = !this.overlay;
    },
    async remove() {
      console.log(this.userIds);
      for (const [key, value] of Object.entries(this.userIds)) {
        console.log(key, value);
        await axios
          .delete(`http://localhost:3003/clients/${value}`)
          .catch((error) => {
            console.log(error);
          });
      }
      this.next(1);
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
  },
};
</script>

<style>
.overlay-delete {
  justify-content: center;
  align-items: center;
  align-content: center;
}

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
  border-radius: 50px;
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
.search-bar {
  padding-left: 0;
  padding-right: 0;
}

.notfound {
  margin-top: 25px;
  text-align: center;
}
</style>
