<template>

    <transition name="main">
        <div :class="progress" v-if="unlockCheck">
            <div class="main">
                
                <!-- Gather Button -->
                <button class="main-button" :disabled="progressState.progress_bar.value > 0" @click="$store.dispatch('startGather', progress)">{{ buttonText }}</button>
                
                <!-- Cost -->
                <h6 v-if="cost" class="cost">[Cost: {{ progressCost.current }} {{ getResourceName(progressCost.entity) }}]</h6>
                
                <!-- Desc -->
                <p class="desc">{{ desc }}</p>
                
                <!-- Progress Bar -->
                <progress :value="progressState.progress_bar.value" max="100"></progress>
                
                <!-- Speed -->
                <p class="bar">
                    <span v-if="speed"><strong>Speed:</strong> {{ incrementToSpeed(progressState.progress_bar.increment) }}s</span>
                    <span v-if="workable && game_stages.micromanagement"><strong>Workers:</strong> {{ progressState.workers}}&nbsp;&nbsp;<p class="worker_button" @click="$store.dispatch('removeWorker', progress)">[ - ]</p>&nbsp;<p class="worker_button" @click="$store.dispatch('addWorker', progress)">[ + ]</p></span>
                </p>
                
                <!-- Toggle Upgrades Section -->
                <transition name="progress-upgrades">
                    <div class="toggle-content" v-if="toggled">
                        <div class="upgrade" v-for="(upgrade, index) in upgrades">
                            
                            <!-- Upgrade Button -->
                            <button class="upgrade__button" @click="$store.dispatch('purchaseUpgrade', { progress, index })">{{ upgrade.title }}</button>
                            <p class="upgrade__desc"><span class="upgrade__cost">{{ upgrade.cost.current }}</span><span class="upgrade__currency">{{ getResourceName(upgrade.cost.entity) }}</span></p>
                        </div>
                    </div>
                </transition>
            </div>
            <div v-if="upgrades" class="toggle" @click="toggled = !toggled"><span>{{ toggleText }}</span></div>
            <div v-if="!upgrades" class="padding-if-no-upgrades"></div>
        </div>
    </transition>
</template>

<script>
import { capFirstLetter, getResourceName, incrementToSpeed } from '../js/utility.js';

export default {
    props: ['progress', 'label', 'desc', 'speed', 'unlock', 'unlockValue', 'cost', 'workable'],
    methods: {
        capFirstLetter,
        getResourceName,
        incrementToSpeed,
    },
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
        buttonText() {
            if (this.$store.state.progress[this.progress].workers > 0) {
                return `${this.label} (Auto)`;
            } else {
                return this.label;
            }
        }
    },
    data() {
        return {
            toggled: false,
            progressState: this.$store.state.progress[this.progress],
            game_stages: this.$store.state.game_stages,
        }
    },
}
</script>
