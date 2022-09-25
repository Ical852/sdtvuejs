<template>
  <div>
    <Header/>
    <div class="container mt-5">
        <h5>Edit Food</h5>
        <form class="forms-sample mt-3">

            <div v-if="currentImg != ''">
              <p>Current Image : </p>
              <img :src="updateData.currentImg.value" alt=""  style="width: 100px">
            </div>

            <TextInput
              label="Image"
              type="file"
              :onchange="(e) => updateData.img.value = e.target.files[0]"
              :value="updateData.img.value"
              :error="updateData.img.error != ''"
              :errMsg="updateData.img.error"
            />

            <div class="mt-3">
                <button type="button" class="btn btn-primary mr-2" @click="check()"><i class="ti-save" ></i>
                    Save</button>
                <a href="/" class="btn btn-danger"><i class="ti-close"></i>
                    Cancel</a>
            </div>
        </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

import { Header, TextInput } from '../components'

export default {
  name : "Edit",
  data() {
    return {
      updateData : {
        img : {value : '', error : ''},
        currentImg : {value : '', error : ''},
      }
    }
  },
  mounted() {
    axios.get(`http://localhost:8000/api/food/${this.$route.params.id}`)
      .then(res => {
        console.log(res.data.data.picture_path)
        this.updateData.img.value = res.data.data.picture_path
        this.updateData.currentImg.value = res.data.data.picture_path
      })
      .catch(err => {
        console.log(err)
      })
  },
  components : {
    Header,
    TextInput,
  },
  methods: {
    async check() {
      const formdata = new FormData()
      formdata.append('picture_path', this.updateData.img.value)

      await axios.post(`http://localhost:8000/api/food/photo/${this.$route.params.id}`, formdata)
        .then(res => {
            const alert = res.data.meta.message
            localStorage.setItem('alert-success', alert)
            this.$router.push({ path: '/' })
            this.$router.go(0);
        })
        .catch(err => {
          const errrsp = err.response.data.meta.message
          errrsp.picture_path != undefined ? this.updateData.img.error = errrsp.picture_path[0] : this.donothing()
        })
      
    },
    donothing(){},
  },
}
</script>