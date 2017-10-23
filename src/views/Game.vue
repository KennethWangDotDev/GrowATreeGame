<template>
    <!-- Resources -->
    <div class="game">
        <transition name="main">
            <resources v-if="game_stages.roots_emerged"></resources>
        </transition>
        
        <!-- Main -->
        <div class="active">
            <transition name="main"><navigation v-if="game_stages.research"></navigation></transition>
            <transition name="view" mode="out-in"><router-view></router-view></transition>
        </div>
        
        <!-- Notifications -->
        <notifications v-if="game_stages.planted"></notifications>
    </div>
</template>

<script>
import Navigation from '../components/Navigation.vue';
import Resources from '../components/Resources.vue';
import Notifications from '../components/Notifications.vue';

export default {
  components: {
    Navigation,
    Resources,
    Notifications,
  },
  data() {
    return {
        game_stages: this.$store.state.game_stages,
    }
  },
}
</script>
