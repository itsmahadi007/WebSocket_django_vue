<template>
  <div>


    <Flipbook
        ref="flipbook"
        class="flipbook"
        :pages="file_images"
        v-slot="flipbook"
        :zooms="null"
        @flip-right-start="onFlipRightStart"
    >
      <v-btn class="ma-2" outlined color="indigo" @click="flipbook.flipLeft">
        Previous Page
      </v-btn>
      <v-btn class="ma-2" outlined color="indigo" @click="flipbook.flipRight">
        Next Page
      </v-btn>

      <p>{{ flipbook }}</p>
      <p @click="flipbook.page = 1">1</p>
      {{ flipbook.numPages }}
    </Flipbook>


    <!--    <Flipbook class="flipbook" :pages="file_images" ref="flipbook"></Flipbook>-->

  </div>
</template>

<!--<script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>-->
<script>
import axios from "@/axios";
import Flipbook from "flipbook-vue";

let demo = []
export default {
  name: "attachment_list",
  components: {
    Flipbook
  },
  data() {
    return {
      singlePage: false,
      pages: [
        "https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.pexels.com/photos/3083250/pexels-photo-3083250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/2709385/pexels-photo-2709385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3081752/pexels-photo-3081752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/3083250/pexels-photo-3083250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      ],

      file_images: [null,],
      attachment_list: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  methods: {
    changePage() {
      this.$refs.flipbook.frontImage = this.$refs.flipbook.pageUrl(4);
      this.$refs.flipbook.backImge = this.$refs.flipbook.pageUrl(5);
      this.$refs.flipbook.firstPage = 4;
      this.$refs.flipbook.secondPage = 5;

      // this.$refs.flipbook.flipAuto(true);
    },
    onFlipRightStart(page) {
      console.log(page);
    },
    serialize_data() {

    },
    getList() {
      // let test_data = null;
      axios
          .get('file/' + this.$route.params.id,)
          .then((response) => {
            console.log(response);
            this.attachment_list = response.data;
            // console.log(response.data.file_images);
            // let test_data = response.data.file_images;
            // test_data = response.data.file_images;
            // console.log(test_data);
            // let test_data2 = Object.values(test_data);
            // console.log(test_data2);
            // console.log(Object.values(test_data));
            // this.file_images = response.data.file_images;

            response.data.file_images.forEach(myFunction)

            // const self = this;

            // var arr = new Array();

            demo?.push(null)

            function myFunction(item) {
              // this.file_images.push(item.images);

              var datas = item.images;
              demo?.push(datas)
              // console.log(demo)
              // this.pages.append(datas);
              // this.file_images.push(item.images);
              // console.log(datas);

            }

            demo?.push(null)

            this.file_images = [...demo]
            console.log(this.file_images);

            // var obj = {
            //   "1": 5,
            //   "2": 7,
            //   "3": 0,
            //   "4": 0,
            //   "5": 0,
            //   "6": 0,
            //   "7": 0,
            //   "8": 0,
            //   "9": 0,
            //   "10": 0,
            //   "11": 0,
            //   "12": 0
            // }
            // var result = Object.keys(obj).map(function (key) {
            //   return [Number(key), obj[key]];
            // });
            //
            // console.log(result);
            // console.log(this.pages);
            // console.log(this.file_images);


          })
          .catch((error) => {
            console.log(error);
            this.error = error.response.data;
            // console.log("110", this.error);

          }); // catch

      console.log("mahadi");
      // const obj = JSON.parse(test_data);
      // console.log(test_data);


      // obj.file_images.forEach(myFunction)
      //
      // function myFunction(item) {
      //   this.file_images.push(item);
      // }
      //
      // console.log(this.file_images);
    },
  },
  created() {
    this.getList();
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  color: #ccc;
  overflow: hidden;
}

.flipbook {
  width: 60vw;
  height: calc(100vh - 50px - 40px);
}

.flipbook .bounding-box {
  box-shadow: 0 0 20px #000;
}
</style>
