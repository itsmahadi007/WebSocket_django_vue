<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                      v-model="username"
                      name="username"
                      label="Username"
                      type="text"
                      placeholder="username"
                      required
                  ></v-text-field>

                  <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      required
                  ></v-text-field>
                  <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                </form>
              </v-card-text>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "@/axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
          .post("/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem("userData", JSON.stringify(response.data));

            // this.$router.push("/dashboard");
            console.log(120);
            window.location.href = "/dashboard";
          })
          .catch((error) => {
            console.log(error);
            this.error = error.response.data;
            console.log("110", this.error);

          });

      const {username} = this;
      console.log(username + "logged in")
    },
  },
};
</script>
