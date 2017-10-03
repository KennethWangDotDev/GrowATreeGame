<template>
    <div class="tree">
        <div class="emerge-roots" v-if="this.$store.state.game_stages.roots_emerged === 0">
            <button :disabled="emergeRootsProgress > 0" @click="$store.dispatch('startGather', 'emerge_roots')">Emerge Roots</button>
            <progress :value="emergeRootsProgress" max="100"></progress>
        </div>
        <div class="gather-nutrients" v-if="this.$store.state.game_stages.roots_emerged === 1">
            <button :disabled="gatherNutrientsProgress > 0" @click="$store.dispatch('startGather', 'gather_nutrients')">Gather Nutrients</button>
            <progress :value="gatherNutrientsProgress" max="100"></progress>
        </div>
        <div class="grow-roots" v-if="this.$store.state.game_stages.roots_emerged === 1">
            <button :disabled="growRootsProgress > 0" @click="$store.dispatch('startGather', 'grow_roots')">Grow Roots</button>
            <progress :value="growRootsProgress" max="100"></progress>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    emergeRootsProgress() {
      return this.$store.state.progress.emerge_roots.progress_bar.value;
    },
    gatherNutrientsProgress() {
      return this.$store.state.progress.gather_nutrients.progress_bar.value;
    },
    growRootsProgress() {
      return this.$store.state.progress.grow_roots.progress_bar.value;
    },
  }
}
</script>
