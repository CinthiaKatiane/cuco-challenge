<template>
  <div>
    <h1>Clientes</h1>
    <ul v-for="user in users" :key="user.id">
      <li>{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
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
  },
};
</script>
