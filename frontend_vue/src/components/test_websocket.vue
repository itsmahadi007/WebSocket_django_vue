<template>
  <div>
    <v-text-field
        v-model="send_data1"
        color="purple darken-2"
        label="First Value"
        required
    ></v-text-field>

    <v-text-field
        v-model="send_data2"
        color="purple darken-2"
        label="2nd Value"
        required
    ></v-text-field>

    <v-btn
        class="ma-2"
        outlined
        color="indigo"
        v-on:click="sendMessage()"
    >
      Send Message
    </v-btn>
    <v-btn
        class="ma-2"
        outlined
        color="indigo"
        v-on:click="check()"
    >
      Check
    </v-btn>

    <br>


    <v-card
        class="mx-auto"
        max-width="344"
        outlined
        v-for="(d,index) in sum_data" :key="index"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="mb-1">
            {{ d.first_value }} + {{ d.second_value }} = {{ d.sum_value }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-card>

    <!--    <div class="h2 text&#45;&#45;lighten-1">-->
    <!--      {{ return_data }}-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "test_websocket",
  data: function () {
    return {
      connection: null,
      first_value: null,
      second_value: null,
      sum_value: null,
      sum_data: [],
      send_data1: null,
      send_data2: null,
    }
  },
  methods: {
    check() {
      console.log(this.connection);
    },
    sendMessage: function () {
      // console.log("Hello")
      // console.log(this.connection);
      if (this.send_data === null) {
        this.send_data = "Nothing";
      }
      this.connection.send(JSON.stringify({"first_value": this.send_data1, "second_value": this.send_data2}));
    },

    connecting() {

      console.log("Starting connection to WebSocket Server")
      this.connection = new WebSocket("ws://127.0.0.1:8000/ws/system/")

      let self = this;
      this.connection.onmessage = function (event) {
        console.log(event.data);
        let d = JSON.parse(event.data);
        self.sum_data.push(d);
        self.first_value = d.first_value;
        self.second_value = d.second_value;
        self.sum_value = d.sum_value;
        console.log(d.sum_value);

      }

    },
  },

  created: function () {

    this.connecting();
    // this.connection = new WebSocket("ws://127.0.0.1:58579/ws/system/")

    // this.connection.onopen = function () {
    //   this.connection.send(JSON.stringify({"message": 'Sending message to server Mahadi Hassan'}));
    // };

    // this.connection.onopen = function (event) {
    //   console.log(event)
    //   console.log("Successfully connected to the echo websocket server...")
    // }


  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
