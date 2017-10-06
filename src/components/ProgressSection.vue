<template>    
    <div :class="progress" v-if="unlockCheck">
        <button :disabled="progressState.progress_bar.value > 0" @click="$store.dispatch('startGather', progress)">{{ label }}</button>
        <h6 v-if="cost" class="cost">[Cost: {{ progressCost.current }} {{ progressCost.entity.split('.')[progressCost.entity.split('.').length - 1] }}]</h6>
        <p class="desc">{{ desc }}</p>
        <progress :value="progressState.progress_bar.value" max="100"></progress>
        <p v-if="speed" class="speed">SPD: {{ (100 / (40 * progressState.progress_bar.increment)).toFixed(3) }}s</p>
    </div>
</template>

<script>
export default {
  props: ['progress', 'label', 'desc', 'speed', 'unlock', 'unlockValue', 'cost'],
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
    progressCost() {
        if (this.$store.state.progress[this.progress].cost) {
            return this.$store.state.progress[this.progress].cost;
        } else {
            return { current: 0, entity: 'NaN.Error' };
        }
    },
  }
}
</script>
