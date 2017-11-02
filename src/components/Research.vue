<template>
    <div class="research">
        <table>
            <template v-for="(research, index) in researches">
                <tr v-if="research.purchased === 0 && isUnlocked(research)">
                    <td class="title">{{ research.title }}</td>
                    <td class="desc">{{ research.desc }}</td>
                    <td class="cost"><button @click="$store.dispatch('purchaseResearch', { research, index })">{{ research.cost.current }} {{ capFirstLetter(getResourceName(research.cost.entity)) }}</button></td>
                </tr>
            </template>
            <h1 v-if="researchesAvailable() === false">No researches available.</h1>
        </table>
        
    </div>
</template>

<script>
import { capFirstLetter, getResourceName } from '../js/utility.js';

export default {
    methods: {
        isUnlocked(research) {
            if (research.unlock) {
                return this.$store.state.game_stages[research.unlock];
            }
            return true;
        },
        researchesAvailable() {
            let available = false;
            this.researches.forEach((research) => {
                if (research.purchased === 0 && this.isUnlocked(research)) {
                    available = true;
                }
            });
            return available;  
        },
        capFirstLetter,
        getResourceName,
    },
    data() {
        return {
            researches: this.$store.state.research,
        }
    },
}

</script>
