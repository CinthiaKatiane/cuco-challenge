<template>
  <v-container class="pl-0 pr-0">
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
          :rules="cpfRules"
          label="CPF"
          variant="solo"
          placeholder="xxx.xxx.xxx-xx"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="usr.birthdate"
          label="Data de Nascimento"
          variant="solo"
          placeholder="aaaa-mm-dd"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="usr.phone"
          label="Telefone"
          variant="solo"
          placeholder="(xx) xxxxx-xxxx"
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
        <v-btn :disabled="!isComplete" color="green" @click="save">
          Salvar
        </v-btn>
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
        birthdate: "",
      },
      cpfRules: [
        (v) => !!v || "Insira um CPF",
        (v) => /^\d{3}.\d{3}.\d{3}-\d{2}$/.test(v) || "Insira CPF valido",
      ],
    };
  },
  created() {
    if (this.userId) {
      axios
        .get("http://localhost:3003/clients/" + this.userId)
        .then((res) => {
          this.usr.name = res.data.name;
          this.usr.cpf = res.data.cpf;
          this.usr.phone = res.data.phone;
          this.usr.birthdate = res.data.birthdate;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  methods: {
    save() {
      if (this.userId) {
        axios
          .put("http://localhost:3003/clients/" + this.userId, this.usr)
          .then((res) => {
            console.log(res.data.id);
          });
      } else {
        axios.post("http://localhost:3003/clients", this.usr).then((res) => {
          console.log(res.data.id);
        });
      }
      this.$router.push({ path: "/" });
    },
  },
  computed: {
    isComplete() {
      return (
        this.usr.name && this.usr.cpf && this.usr.birthdate && this.usr.phone
      );
    },
  },
};
</script>
