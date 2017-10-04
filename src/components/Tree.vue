<template>
    <div class="tree">
        <div class="emerge-roots" v-if="this.$store.state.game_stages.roots_emerged === 0">
            <button :disabled="emergeRoots.progress_bar.value > 0" @click="$store.dispatch('startGather', 'emerge_roots')">Emerge Roots</button>
            <progress :value="emergeRoots.progress_bar.value" max="100"></progress>
        </div>
        <div class="gather-nutrients" v-if="this.$store.state.game_stages.roots_emerged === 1">
            <button :disabled="gatherNutrients.progress_bar.value > 0" @click="$store.dispatch('startGather', 'gather_nutrients')">Gather Nutrients</button>
            <p class="desc">Increases your nutrients count.</p>
            <progress :value="gatherNutrients.progress_bar.value" max="100"></progress>
            <p class="speed">SPD: {{ (100 / (40 * gatherNutrients.progress_bar.increment)).toFixed(3) }}s</p>
        </div>
        <div class="grow-roots" v-if="this.$store.state.game_stages.unlock_grow_roots === 1">
            <button :disabled="growRoots.progress_bar.value > 0" @click="$store.dispatch('startGather', 'grow_roots')">Grow Roots</button>
            <h6 class="cost">[Cost: {{ growRoots.cost.current }} {{ growRoots.cost.entity.split('.')[growRoots.cost.entity.split('.').length - 1] }}]</h6>
            <p class="desc">Decreases the time it takes to gather nutrients.</p>
            <progress :value="growRoots.progress_bar.value" max="100"></progress>
            <p class="speed">SPD: {{ (100 / (40 * growRoots.progress_bar.increment)).toFixed(3) }}s</p>
        </div>
        <div class="grow-bigger" v-if="this.$store.state.game_stages.unlock_grow_bigger === 1">
            <button :disabled="growBigger.progress_bar.value > 0" @click="$store.dispatch('startGather', 'grow_bigger')">Grow Bigger</button>
            <h6 class="cost">[Cost: {{ growBigger.cost.current }} {{ growBigger.cost.entity.split('.')[growBigger.cost.entity.split('.').length - 1] }}]</h6>
            <p class="desc">Increases the size of your tree.</p>
            <progress :value="growBigger.progress_bar.value" max="100"></progress>
            <p class="speed">SPD: {{ (100 / (40 * growBigger.progress_bar.increment)).toFixed(3) }}s</p>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    emergeRoots() {
      return this.$store.state.progress.emerge_roots;
    },
    gatherNutrients() {
      return this.$store.state.progress.gather_nutrients;
    },
    growRoots() {
      return this.$store.state.progress.grow_roots;
    },
    growBigger() {
      return this.$store.state.progress.grow_bigger;
    },
  }
}
</script>
