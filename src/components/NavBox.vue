<template>
    <transition name="main">
            <button class="nav-box" :class="isActive(route, currentRoute)">
                <router-link :to="route">
                <i class="far" :class="icon"></i>
                </router-link>
            </button>
    </transition>
</template>

<script>
export default {
    props: ['icon', 'route'],
    data() {
        return {
            game_stages: this.$store.state.game_stages,
            currentRoute: this.$route.path,
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
