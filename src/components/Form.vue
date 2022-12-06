<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="usr.name"
          label="Nome"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="usr.cpf"
          label="CPF"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="usr.birth"
          label="Data de Nascimento"
          variant="solo"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="usr.phone"
          label="Telefone"
          variant="solo"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="end" class="ma-0">
      <v-col cols="2">
        <router-link to="/" class="router-link">
          <v-btn flat @click="overlay = false"> Cancelar </v-btn>
        </router-link>
      </v-col>
      <v-col cols="2">
        <v-btn color="green" @click="save"> Salvar </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "InputForm",
  props: ["userId"],
  data() {
    return {
      usr: {
        name: "",
        cpf: "",
        phone: "",
        birth: "",
      },
    };
  },
  created() {
    if (this.userId) {
      axios
        .get("http://localhost:3003/clients/" + this.userId)
        .then((res) => {
          let userInfo = res.data;
          this.usr.name = userInfo.name;
          this.usr.cpf = userInfo.cpf;
          this.usr.phone = userInfo.phone;
          this.usr.birth = userInfo.birthdate;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    save() {
      console.log(this.usr);
      console.log("salvo");
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
