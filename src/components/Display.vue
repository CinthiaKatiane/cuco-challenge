<template>
  <v-container class="pl-0 pr-0">
    <v-card-text class="pa-0">
      <v-text-field
        v-model="search"
        variant="solo"
        single-line
        label="Digite aqui um nome ou CPF..."
        append-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-card-text>
    <v-row class="table-title" align="center" v-if="users.length > 0">
      <v-col cols="1">
        <v-checkbox
          @click="selectAll"
          v-model="allSelected"
          color="red"
          hide-details
        />
      </v-col>
      <v-col cols="5"> NOME </v-col>
      <v-col cols="2"> DATA DE NASCIMENTO </v-col>
      <v-col cols="2"> TELEFONE </v-col>
      <v-col cols="2">
        <v-btn
          v-if="userIds.length > 0"
          prepend-icon="mdi-delete"
          color="#e52e4d"
          @click="this.overlay = !this.overlay"
        >
          Excluir
        </v-btn>
        <v-overlay class="overlay-delete" v-model="overlay">
          <v-card class="check-card">
            <v-icon size="x-large" class="alert-icon"> mdi-alert </v-icon>
            <h2>Atenção</h2>
            <p>
              Você tem certeza que quer excluir o(s) cliente(s) selecionado(s)?
            </p>
            <v-row>
              <v-col>
                <v-btn flat @click="overlay = false" style="color: #969cb2">
                  Cancelar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="#E52E4D" @click="remove" style="color: white">
                  Excluir
                </v-btn>
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
        class="mb-3 pa-5"
      >
        <v-row align="center">
          <v-col cols="12" sm="1">
            <v-checkbox
              v-model="userIds"
              color="red"
              :value="user.id"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="5">
            <h3>{{ user.name }}</h3>
            <p>{{ user.cpf }}</p>
          </v-col>
          <v-col cols="12" sm="2">
            <p>{{ user.birthdate }}</p>
          </v-col>
          <v-col cols="12" sm="2">
            <p>{{ user.phone }}</p>
          </v-col>
          <v-col cols="12" sm="2">
            <router-link :to="{ path: '/edit/' + user.id }" class="router-link">
              <v-btn prepend-icon="mdi-pencil" color="success"> Editar </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card>
      <v-row justify="space-between" align="center">
        <v-col cols="auto" class="mr-auto">
          {{ pagesLabel.start }}-{{ pagesLabel.finish }} de
          {{ pagesLabel.total }}
        </v-col>
        <v-col cols="auto">
          <v-pagination
            active-color="#fff"
            color="#969cb2"
            density="compact"
            variant="plain"
            total-visible="3"
            v-model="pagination.page"
            :length="pagination.total"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h2 class="result-not-found">
        Não foram encontrados resultados para essa pesquisa.
      </h2>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "DisplayClients",
  data() {
    return {
      allSelected: false,
      userIds: [],
      users: {},
      overlay: false,
      search: "",
      pagination: {
        page: 1,
        total: 0,
        perPage: 5,
      },
      pagesLabel: {
        start: 0,
        finish: 0,
        total: 0,
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
    async next(page) {
      await axios
        .get(
          `http://localhost:3003/clients?q=${this.search}&_page=${page}&_limit=${this.pagination.perPage}`
        )
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.getLabels();
      this.allSelected = false;
      this.userIds = [];
    },
    async getSize() {
      await axios
        .get(`http://localhost:3003/clients?q=${this.search}`)
        .then((res) => {
          let pre = res.data.length / this.pagination.perPage;
          this.pagination.total = Number.isInteger(pre)
            ? pre
            : Math.floor(pre) + 1;
          this.pagesLabel.total = res.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLabels() {
      let pp = this.pagination.perPage;
      this.pagesLabel.start = this.pagination.page * pp - (pp - 1);
      this.pagesLabel.finish =
        this.pagination.page == this.pagination.total
          ? this.pagesLabel.total
          : this.pagination.page * pp;
    },
    async remove() {
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
h3 {
  color: #363f5f;
}

p {
  color: #969cb2;
}

h1 {
  position: relative;
  color: #fff;
}

.v-btn__prepend {
  color: white;
}

.v-field--variant-solo {
  box-shadow: none;
}

.v-pagination__item--is-active {
  background: #2095f2;
  border-radius: 6px;
}

.overlay-delete {
  justify-content: center;
  align-items: center;
  align-content: center;
}

.table-title {
  padding-left: 20px;
  padding-right: 20px;
  font-size: small;
  font-weight: 600;
  color: #969cb2;
}

.router-link {
  text-decoration: none;
  color: inherit;
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

.alert-icon {
  background: #feebc8;
  color: #dd6b20;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  padding-bottom: 2px;
}

.result-not-found {
  margin-top: 25px;
  text-align: center;
}
</style>
