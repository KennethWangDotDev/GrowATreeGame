<template>
    <div id="app">
        <transition name="plant-seed" mode="out-in">
        
            <!-- Initial stage of the game -->
            <template v-if="this.$store.state.game_stages.planted === 0">
                <PlantSeed></PlantSeed>
            </template>
            
            <!-- Main -->
            <template v-if="this.$store.state.game_stages.planted === 1">
                <Game></Game>
            </template>
            
        </transition>
    </div>
</template>

<script>
import PlantSeed from '../views/PlantSeed.vue';
import Game from '../views/Game.vue';

export default {
  components: {
    PlantSeed,
    Game,
  }
}
</script>
