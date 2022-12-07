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
        <v-overlay class="overlay-card" v-model="overlay">
          <card-overlay @remove="removeClient" @close="closeOverlay">
          </card-overlay>
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
import CardOverlay from "./CardOverlay.vue";

export default {
  name: "DisplayClients",
  components: {
    CardOverlay,
  },
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
    async removeClient() {
      for (const [key, value] of Object.entries(this.userIds)) {
        console.log(key, value);
        await axios
          .delete(`http://localhost:3003/clients/${value}`)
          .catch((error) => {
            console.log(error);
          });
      }
      this.next(1);
      this.closeOverlay();
    },
    closeOverlay() {
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

.overlay-card {
  justify-content: center;
  align-items: center;
  align-content: center;
}

.result-not-found {
  margin-top: 25px;
  text-align: center;
}
</style>
