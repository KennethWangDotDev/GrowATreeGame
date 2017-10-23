<template>    
    <div :class="progress" v-if="unlockCheck">
        <div class="main">
            <button class="main-button" :disabled="progressState.progress_bar.value > 0" @click="$store.dispatch('startGather', progress)">{{ label }}</button>
            <h6 v-if="cost" class="cost">[Cost: {{ progressCost.current }} {{ progressCost.entity.split('.')[progressCost.entity.split('.').length - 1] }}]</h6>
            <p class="desc">{{ desc }}</p>
            <progress :value="progressState.progress_bar.value" max="100"></progress>
            <p v-if="speed" class="speed">SPD: {{ (100 / (40 * progressState.progress_bar.increment)).toFixed(3) }}s</p>
            <transition name="progress-upgrades">
                <div class="toggle-content" v-if="toggled">
                    <div class="upgrade" v-for="(value, key) in upgrades">
                        <button class="upgrade__button" @click="$store.dispatch('purchaseUpgrade', { progress, upgrade: key })">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</button>
                        <p class="upgrade__desc"><span class="upgrade__cost">{{ value.cost.current }}</span><span class="upgrade__currency">{{ value.cost.entity.split('.')[value.cost.entity.split.length - 1]}}</span></p>
                    </div>
                </div>
            </transition>
        </div>
        <div v-if="upgrades" class="toggle" @click="toggled = !toggled"><span>{{ toggleText }}</span></div>
        <div v-if="!upgrades" class="padding-if-no-upgrades"></div>
    </div>
</template>

<script>
export default {
  props: ['progress', 'label', 'desc', 'speed', 'unlock', 'unlockValue', 'cost'],
  computed: {
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
    toggleText() {
        if (this.toggled) {
            return '▴';
        }
        return '▾';
    },
    upgrades() {
        if (this.$store.state.progress[this.progress].upgrades) {
            return this.$store.state.progress[this.progress].upgrades;
        } else {
            return false;
        }
    },
  },
  data() {
    return {
        toggled: false,
        progressState: this.$store.state.progress[this.progress],
    }
  },
  methods: {
    toggleContent() {
        console.log('test');
        this.contentVisible = !this.contentVisible;
    },
  },
}
</script>
