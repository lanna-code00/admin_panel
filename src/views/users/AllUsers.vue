<template>
    
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
    computed: mapGetters(['allUsers']),
    methods: {
         ...mapActions(['addfood']),
    },
    mounted(){
        console.log("allUsers", this.allUsers);
    }
}
</script>