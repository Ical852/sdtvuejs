<template>
  <div>
    <Header/>
    <div class="container mt-5">
        <h5>Edit Food</h5>
        <form class="forms-sample mt-3">

            <TextInput
              label="Name"
              type="text"
              :onchange="(e) => updateData.name.value = e.target.value"
              :value="updateData.name.value"
              :error="updateData.name.error != ''"
              :errMsg="updateData.name.error"
            />

            <Textarea
              label="Description"
              type="text"
              :onchange="(e) => updateData.desc.value = e.target.value"
              :value="updateData.desc.value"
              :error="updateData.desc.error != ''"
              :errMsg="updateData.desc.error"
            />

            <Textarea
              label="Ingredients"
              type="text"
              :onchange="(e) => updateData.ingrd.value = e.target.value"
              :value="updateData.ingrd.value"
              :error="updateData.ingrd.error != ''"
              :errMsg="updateData.ingrd.error"
            />

            <TextInput
              label="Price"
              type="number"
              :onchange="(e) => updateData.price.value = e.target.value"
              :value="updateData.price.value"
              :error="updateData.price.error != ''"
              :errMsg="updateData.price.error"
            />

            <TextInput
              label="Rate"
              type="number"
              :onchange="(e) => updateData.rate.value = e.target.value"
              :value="updateData.rate.value"
              :error="updateData.rate.error != ''"
              :errMsg="updateData.rate.error"
            />

            <TextInput
              label="Types"
              type="text"
              :onchange="(e) => updateData.types.value = e.target.value"
              :value="updateData.types.value"
              :error="updateData.types.error != ''"
              :errMsg="updateData.types.error"
            />

            <div class="mt-3">
                <button type="button" class="btn btn-primary mr-2" @click="check()"><i class="ti-save" ></i>
                    Save</button>
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
  name : "Edit",
  mounted() {
    axios.get(`http://localhost:8000/api/food/${this.$route.params.id}`)
      .then(res => {
        this.updateData.name.value = res.data.data.name
        this.updateData.desc.value = res.data.data.description
        this.updateData.ingrd.value = res.data.data.ingredients
        this.updateData.price.value = res.data.data.price
        this.updateData.rate.value = res.data.data.rate
        this.updateData.types.value = res.data.data.types
      })
      .catch(err => {
        console.log(err)
      })
  },
  data() {
    return {
      updateData : {
        name : {value : '', error : ''},
        desc : {value : '', error : ''},
        ingrd : {value : '', error : ''},
        price : {value : '', error : ''},
        rate : {value : '', error : ''},
        types : {value : '', error : ''},
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
      formdata.append('name', this.updateData.name.value)
      formdata.append('description', this.updateData.desc.value)
      formdata.append('ingredients', this.updateData.ingrd.value)
      formdata.append('price', this.updateData.price.value)
      formdata.append('rate', this.updateData.rate.value)
      formdata.append('types', this.updateData.types.value)

      await axios.post(`http://localhost:8000/api/food/${this.$route.params.id}`, formdata)
        .then(res => {
            const alert = res.data.meta.message
            localStorage.setItem('alert-success', alert)
            this.$router.push({ path: '/' })
            this.$router.go(0);
        })
        .catch(err => {
          const errrsp = err.response.data.meta.message
          console.log(errrsp)
        })
      
    },
  },
}
</script>