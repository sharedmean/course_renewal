<template>
  <div>
    <v-data-table
      v-if="results"
      :headers="headers"
      :items="results.rows"
    >

    </v-data-table>
    
     <div v-for="item in items" :key="item.id">
    <label>{{item.name}}:</label>
    <input type="text" name="item.name" v-model="item.value">
  </div>
    <button @click="test2()"> jjj</button>
  </div>
</template>

<script>
export default {
    components:{
      
    },

    data() {
        return {
          items: [
            { name: 'Peter', value: '' },
            { name: 'Kitty', value: '' }
          ],
          results: null,
          errors: null,

          headers: [
            { text: 'Имя', value: 'first_name', align: 'center' },
            { text: 'Фамилия', value: 'last_name', align: 'center' },
            { text: 'Отчество', value: 'patronymic', align: 'center' },
            { text: 'Мобильный телефон', value: 'phone', align: 'center' }
          ],
        }
    },

    methods: {

        test: function () {
            let fullURL = '/users/getUsers'

            this.axios.get(fullURL)
            .then((responce) => {
              this.results = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        test2: function () {
            let fullURL = '/users/addUser'
            
            this.axios.post(fullURL, {
              first_name: '',
              last_name: 'str',
              patronymic: 'str',
              phone: 'str',
              email: 'str',
              login: 'str',
              password: 'str',
              role_id: 1
            })
            .then((responce) => {
              this.results = responce.data;
              this.test();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })

            
        }
    },
    computed: {

    },

    mounted () {
      this.test()
    }
}
</script>

<style scoped>
</style>