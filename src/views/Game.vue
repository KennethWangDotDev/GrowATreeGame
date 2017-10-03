<template>
    <!-- Resources -->
    <div class="game">
        <transition name="main">
            <resources v-if="this.$store.state.game_stages.roots_emerged"></resources>
        </transition>
        
        <!-- Main -->
        <div class="active">
            <router-view></router-view>
        </div>
        
        <!-- Notifications -->
        <notifications v-if="this.$store.state.game_stages.planted"></notifications>
    </div>
</template>

<script>
import Resources from '../components/Resources.vue';
import Notifications from '../components/Notifications.vue';

export default {
  components: {
    Resources,
    Notifications,
  }
}
</script>
