<template>
  <nav class="main-nav">
        <transition name="main"><router-link :to="'/'"><button class="nav-box" :class="isActive('/', route)"><i class="far fa-tree-alt"></i></button></router-link></transition>
        <transition name="main"><router-link :to="'/leaf'" v-if="game_stages.micromanagement"><button class="nav-box" :class="isActive('/leaf', route)"><i class="far fa-leaf"></i></button></router-link></transition>
        <transition name="main"><router-link :to="'/research'"><button class="nav-box" :class="isActive('/research', route)"><i class="far fa-flask"></i></button></router-link></transition>
        <transition name="main"><button @click="this.$router.push({ path: '/' })" class="nav-box" :class="isActive('/research', route)"><i class="far fa-flask"></i></button></transition>
  </nav>
</template>

<script>
export default {
    data() {
        return {
            game_stages: this.$store.state.game_stages,
            route: this.$route.path,
            router: this.$router,
        }
    },
    methods: {
        isActive(param, route) {
            if (param === this.$route.path) {
                return 'active';
            } else {
                return '';
            }
        }  
    },
}
</script>
