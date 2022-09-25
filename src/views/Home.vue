<template>
  <div>
    <Header />
    <div class="container mt-5 mb-5">

      <div v-if="alert.msg != ''" :class="'alert alert-' + alert.type" role="alert">
          {{ alert.msg }}
      </div>

      <router-link to="/create">
        <button class="btn btn-primary">
          <i class="fa fa-plus"></i> New Food
        </button>
      </router-link>
      <table class="table table-striped table-responsive mt-3">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Ingredients</th>
            <th scope="col">Price</th>
            <th scope="col">Rate</th>
            <th scope="col">Types</th>
            <th scope="col">Picture</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-if="foods.length > 0">
          <tr  v-for="data, index in foods" :key="data.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.description }}</td>
            <td>{{ data.ingredients }}</td>
            <td>Rp. {{ new Intl.NumberFormat('en-Us').format(data.price) }} </td>
            <td>{{ data.rate }}</td>
            <td>{{ data.types }}</td>
            <td>
              <img :src="data.picture_path" alt="" height="100" width="100" />
            </td>
            <td>
              <router-link :to="'/edit/' + data.id">
                <button class="btn btn-success">
                  <i class="fa fa-edit"></i> Edit
                </button>
              </router-link>
              <router-link :to="'/editpic/' + data.id">
                <button class="btn btn-info text-white mt-2 mb-2">
                  <i class="fa fa-image"></i> Picture Edit
                </button>
              </router-link>
              <button
                @click="deleteData(data.id)"
                type="submit"
                class="btn btn-danger"
              >
                <i class="fa fa-trash"></i>Delete
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="9">
              <h6 class="text-center">Getting Data...</h6>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Header } from "../components";
import axios from "axios";

export default {
  data() {
    return {
      foods: [],
      alert: {
        type: '',
        msg : ''
      }
    };
  },
  mounted() {
    const alertMsg = localStorage.getItem('alert-success')
    if (alertMsg != '') {
      this.setAlert('success' ,alertMsg)
      setTimeout(() => {
        this.setAlert('', '')
        localStorage.setItem('alert-success', '')
      }, 3000);
    }

    axios
      .get("http://localhost:8000/api/food")
      .then((res) => {
        this.foods = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  name: "Home",
  components: {
    Header,
  },
  methods: {
    setAlert(type, msg) {
      this.alert = {
        type : type,
        msg : msg
      }
    },
    deleteData(id) {
      const confirm = window.confirm('delete data?')
      if (confirm) {
        axios.delete(`http://localhost:8000/api/food/${id}`)
          .then(res => {
            this.setAlert('success' ,res.data.meta.message)
            setTimeout(() => {
              this.setAlert('', '')
            }, 3000);
            const newdata = this.foods.filter(data => data.id != id)
            this.foods = newdata
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
};
</script>
