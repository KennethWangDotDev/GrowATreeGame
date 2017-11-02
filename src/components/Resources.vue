<template>
    <div class="resources">
        <section>
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
        </section>
        <section v-if="game_stages.micromanagement">
            <h1 class="title">Workers:</h1>
            <table>
                <tbody>
                    <tr class="resource-row">
                        <td>Idle</td>
                        <td>{{ workers.idle }}</td>
                    </tr>
                    <tr class="resource-row">
                        <td>Working</td>
                        <td>{{ workers.working }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
<!--         <h1 class="title">Stats:</h1>
        <table>
            <tbody>
                <template v-for="(value, key) in stats">
                    <tr class="resource-row">
                        <td>{{ capFirstLetter(key) }}</td>
                        <td>{{ value }}</td>
                    </tr>
                </template>
            </tbody>
        </table> -->
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
            stats: this.$store.state.stats,
            workers: this.$store.state.workers,
        }
    },
}
</script>
