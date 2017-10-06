<template>    
    <div :class="progress" v-if="unlockCheck">
        <button :disabled="gatherNutrients.progress_bar.value > 0" @click="$store.dispatch('startGather', progress)">{{ label }}</button>
        <p class="desc">{{ desc }}</p>
        <progress :value="progressState.progress_bar.value" max="100"></progress>
        <p v-if="speed" class="speed">SPD: {{ (100 / (40 * progressState.progress_bar.increment)).toFixed(3) }}s</p>
    </div>
</template>

<script>
export default {
  props: ['progress', 'label', 'desc', 'speed', 'unlock', 'unlockValue'],
  computed: {
    progressState() {
        return this.$store.state.progress[this.progress];
    },
    unlockCheck() {
        if (!this.unlock) {
            return true;
        } else {
            return (this.$store.state.game_stages[this.unlock] === this.unlockValue);
        }
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
