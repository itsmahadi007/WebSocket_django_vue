<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Upload
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Upload Form</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                    label="Name*"
                    required
                    v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <!--                <v-file-input-->
                <!--                    v-model="files"-->
                <!--                    v-on:change="onChangeFileUpload()"-->
                <!--                    color="deep-purple accent-4"-->
                <!--                    counter-->
                <!--                    label="PDF input"-->
                <!--                    multiple-->
                <!--                    placeholder="Select your files"-->
                <!--                    prepend-icon="mdi-paperclip"-->
                <!--                    outlined-->
                <!--                    :show-size="1000"-->
                <!--                >-->
                <!--                  <template v-slot:selection="{ index, text }">-->
                <!--                    <v-chip-->
                <!--                        v-if="index < 2"-->
                <!--                        color="deep-purple accent-4"-->
                <!--                        dark-->
                <!--                        label-->
                <!--                        small-->
                <!--                    >-->
                <!--                      {{ text }}-->
                <!--                    </v-chip>-->

                <!--                    <span-->
                <!--                        v-else-if="index === 2"-->
                <!--                        class="text-overline grey&#45;&#45;text text&#45;&#45;darken-3 mx-2"-->
                <!--                    >-->
                <!--                    +{{ files.length - 2 }} File(s)-->
                <!--                  </span>-->
                <!--                  </template>-->
                <!--                </v-file-input>-->
                <!--                <v-file-input-->
                <!--                    show-size-->
                <!--                    accept="PDF/*"-->
                <!--                    label="PDF*"-->
                <!--                    required-->
                <!--                    id="file"-->
                <!--                    ref="file"-->
                <!--                    v-on:change="onChangeFileUpload()"-->
                <!--                ></v-file-input>-->
                <!--                <v-text-field-->
                <!--                    accept="pdf/*"-->
                <!--                    label="PDF*"-->
                <!--                    type="file"-->
                <!--                    required-->
                <!--                    id="file"-->
                <!--                    ref="file"-->
                <!--                    v-on:change="onChangeFileUpload()"-->
                <!--                ></v-text-field>-->
                <div class="form-group ">
                  <!--                              <label for="file"></label>-->
                  <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()">
                </div>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-select
                    :items="['1', '2', '3', '4']"
                    label="Category*"
                    required
                    v-model="category"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="close()"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Swal from "sweetalert2";
import axios from "@/axios";

export default {
  name: "upload_content",
  data: () => ({
    dialog: false,
    category: null,
    file: '',
    files: null,
    name: null,
    // valid: false,
    // firstname: '',
    // lastname: '',
    // nameRules: [
    //   v => !!v || 'Name is required',
    //   v => v.length <= 10 || 'Name must be less than 10 characters',
    // ],
    // email: '',
    // emailRules: [
    //   v => !!v || 'E-mail is required',
    //   v => /.+@.+/.test(v) || 'E-mail must be valid',
    // ],
  }),
  methods: {
    close() {
      this.dialog = false;
      this.$emit('reload');
    },
    save() {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      if (this.name === '') {
        Toast.fire({
          icon: 'error',
          title: 'Name Required'
        })
      }

      if (this.category === '') {
        Toast.fire({
          icon: 'error',
          title: 'Category Required'
        })
      }

      if (this.file === '') {
        Toast.fire({
          icon: 'error',
          title: 'PDF Required'
        })
      }

      if (this.file !== '') {
        let formData = new FormData();
        formData.append('name', this.name);

        formData.append('attachment', this.file);
        formData.append('category', this.category);
        formData.append('created_by', '1');

        axios
            .post('file/',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
            )
            .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Comment successfully'
              })
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                text: error,
              }).then((result) => {
                // this.$router.push("account_info");
                console.log(result);
              });
            });


      }
    },
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
      // console.log(this.$refs.file.files[0])
    }
    ,
  }
}
</script>

<style scoped>

</style>
