<template>
    <div class="resources">
        <h1 class="title">Resources:</h1>
        <table>
            <tbody>
                <template v-for="(value, key) in resources">
                    <tr class="resource-row" v-if="game_stages[key]">
                        <td>{{ capFirstLetter(key) }}</td>
                        <td>{{ value.current }} / {{ value.max }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import { capFirstLetter } from '../js/utility.js';

export default {
    methods: {
        capFirstLetter,  
    },
    data() {
        return {
            game_stages: this.$store.state.game_stages,
            resources: this.$store.state.resources,
        }
    },
}
</script>
