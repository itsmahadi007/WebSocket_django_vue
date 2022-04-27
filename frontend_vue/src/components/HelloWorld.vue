<template>
  <v-card :height="screen_height_for_right_down" class="pa-2 overflow-auto" outlined tile>


    <br>

    <upload_content @reload="get_data"/>

    <br>

    <div class="mx-3">
      <div v-for="(data,index) in attachment_list" :key="index">
        <v-card
            class="mx-auto my-3"
            max-width="500"
            outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ data.created_at }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ data.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ data.post_id }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
                outlined
                rounded
                text
            >
              <router-link
                  :to="{
                                  name: 'attachment_list',
                                  params: { id: data.id },
                                }"
                  class="dropdown-item"
              >
                <i class="fas fa-edit"></i> Open
              </router-link>
            </v-btn>

          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from "@/axios";
import upload_content from "@/components/upload_content";

export default {
  name: 'HelloWorld',
  components: {
    upload_content
  },
  data: () => ({
    attachment_list: null,
    screen_height_for_right_down: window.innerHeight,
  }),
  methods: {
    get_data() {
      axios
          .get('file')
          .then((response) => {
            this.attachment_list = response.data;
          })
          .catch((error) => {
            console.log(error);
          })

    },
  },
  created() {
    this.get_data();
  }
}
</script>
