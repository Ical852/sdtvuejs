<template>
  <div>
    <Header/>
    <div class="container mt-5">
        <h5>Create New Food</h5>
        <form class="forms-sample mt-3">

            <TextInput
              label="Name"
              type="text"
              :onchange="(e) => createData.name.value = e.target.value"
              :value="createData.name.value"
              :error="createData.name.error != ''"
              :errMsg="createData.name.error"
            />

            <Textarea
              label="Description"
              type="text"
              :onchange="(e) => createData.desc.value = e.target.value"
              :value="createData.desc.value"
              :error="createData.desc.error != ''"
              :errMsg="createData.desc.error"
            />

            <Textarea
              label="Ingredients"
              type="text"
              :onchange="(e) => createData.ingrd.value = e.target.value"
              :value="createData.ingrd.value"
              :error="createData.ingrd.error != ''"
              :errMsg="createData.ingrd.error"
            />

            <TextInput
              label="Price"
              type="number"
              :onchange="(e) => createData.price.value = e.target.value"
              :value="createData.price.value"
              :error="createData.price.error != ''"
              :errMsg="createData.price.error"
            />

            <TextInput
              label="Rate"
              type="number"
              :onchange="(e) => createData.rate.value = e.target.value"
              :value="createData.rate.value"
              :error="createData.rate.error != ''"
              :errMsg="createData.rate.error"
            />

            <TextInput
              label="Types"
              type="text"
              :onchange="(e) => createData.types.value = e.target.value"
              :value="createData.types.value"
              :error="createData.types.error != ''"
              :errMsg="createData.types.error"
            />

            <TextInput
              label="Image"
              type="file"
              :onchange="(e) => createData.img.value = e.target.files[0]"
              :value="createData.img.value"
              :error="createData.img.error != ''"
              :errMsg="createData.img.error"
            />

            <div class="mt-3">
                <button type="button" class="btn btn-primary mr-2" @click="check()"><i class="ti-save" ></i>
                    Add</button>
                <router-link to="/" class="btn btn-danger"><i class="ti-close"></i>
                    Cancel</router-link>
            </div>
        </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

import { Header, TextInput, Textarea } from '../components'

export default {
  name : "Create",
  data() {
    return {
      createData : {
        name : {value : '', error : ''},
        desc : {value : '', error : ''},
        ingrd : {value : '', error : ''},
        price : {value : '', error : ''},
        rate : {value : '', error : ''},
        types : {value : '', error : ''},
        img : {value : undefined, error : ''},
      }
    }
  },
  components : {
    Header,
    TextInput,
    Textarea
  },
  methods: {
    async check() {
      const formdata = new FormData()
      formdata.append('name', this.createData.name.value)
      formdata.append('description', this.createData.desc.value)
      formdata.append('ingredients', this.createData.ingrd.value)
      formdata.append('price', this.createData.price.value)
      formdata.append('rate', this.createData.rate.value)
      formdata.append('types', this.createData.types.value)
      formdata.append('picture_path', this.createData.img.value)

      await axios.post('http://localhost:8000/api/food', formdata)
        .then(res => {
            const alert = res.data.meta.message
            localStorage.setItem('alert-success', alert)
            this.$router.push({ path: '/' })
            this.$router.go(0);
        })
        .catch(err => {
          const errrsp = err.response.data.meta.message
          errrsp.name != undefined ? this.createData.name.error = errrsp.name[0] : this.donothing()
          errrsp.description != undefined ? this.createData.desc.error = errrsp.description[0] : this.donothing()
          errrsp.ingredients != undefined ? this.createData.ingrd.error = errrsp.ingredients[0] : this.donothing()
          errrsp.price != undefined ? this.createData.price.error = errrsp.price[0] : this.donothing()
          errrsp.rate != undefined ? this.createData.rate.error = errrsp.rate[0] : this.donothing()
          errrsp.types != undefined ? this.createData.types.error = errrsp.types[0] : this.donothing()
          errrsp.picture_path != undefined ? this.createData.img.error = errrsp.picture_path[0] : this.donothing()
        })
      
    },
    donothing(){},
  },
}
</script>