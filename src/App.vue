<template>
  <v-app class="body">
  <v-card>
    <v-toolbar
      color="#F2F0F9"
      dark
      flat
    >
      <v-app-bar-nav-icon hidden ></v-app-bar-nav-icon>

      <v-toolbar-title style="color: black">Your Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
            style="color: black; text-transform: capitalize"
            @click="handleTabs(item)"
          >
            {{ item }}
          </v-tab>

        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card flat>
        </v-card>
        <v-card flat>
        </v-card>
        <v-card flat>
        </v-card>
          <v-card flat>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
   data () {
     return {
       tab: null,
        items: [
          'All', 'Paid', 'Unpaid', 'Overdue',
        ],
     }
   },
   methods: {
       handleTabs (item) {
         if (item === "All") {
            this.$router.push('/')
         }
         if (item === "Paid") {
            this.$router.push('/paid_users')
         }
         if (item === "Unpaid") {
            this.$router.push('/unpaid_users')
         }
         if (item === "Overdue") {
            this.$router.push('/overdue_users')
         }
          // console.log(item)
      }
   }
}
</script>

<style scoped>
   @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300&display=swap');

.body {
    font-family: 'Fredoka', sans-serif;
    font-weight: bold;
}
</style>
