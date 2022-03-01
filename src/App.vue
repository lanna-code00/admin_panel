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

      <v-btn icon>
        <p style="color: black">$9000.00</p>
      </v-btn>

      <v-btn icon>
        <!-- <v-icon>mdi-dots-vertical</v-icon> -->
      </v-btn>

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
        <v-card flat v-if="item === 'All'">
          <v-card-text v-text="text"></v-card-text>
        </v-card>
        <v-card flat v-if="item === 'Paid'">
          <v-card-text v-text="text1"></v-card-text>
        </v-card>
        <v-card flat v-if="item === 'Unpaid'">
          <v-card-text v-text="text2"></v-card-text>
        </v-card>
          <v-card flat v-if="item === 'Overview'">
          <v-card-text v-text="text3"></v-card-text>
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

import {mapActions, mapGetters} from "vuex"

export default {
  name: 'App',

   data () {
     return {
       tab: null,
        items: [
          'All', 'Paid', 'Unpaid', 'Overview',
        ],
        text: '1Loremty ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        text1: '2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        text2: '3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        text3: '4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    computed: mapGetters(['allUsers']),

    methods: {
         ...mapActions(['addfood']),
    },
    mounted(){
        console.log(this.$store.getters.allUsers);
    }
    //
};
</script>

<style scoped>
   @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300&display=swap');

.body {
    font-family: 'Fredoka', sans-serif;
    font-weight: bold;
}
</style>
