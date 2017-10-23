<template>
    <div class="resources">
        <h1 class="title">Resources:</h1>
        <table>
            <tbody>
                <tr class="resource-row">
                    <td>Nutrients</td>
                    <td>{{ nutrients }} / {{ nutrientsMax }}</td>
                </tr>
                <tr class="resource-row" v-if="game_stages.cells">
                    <td>Cells</td>
                    <td>{{ cells }} / {{ cellsMax }}</td>
                </tr>
                <tr class="resource-row" v-if="game_stages.energy">
                    <td>Energy</td>
                    <td>{{ energy }} / {{ energyMax }}</td>
                </tr>
                <tr class="resource-row" v-if="game_stages.mana">
                    <td>Mana</td>
                    <td>{{ mana }} / {{ manaMax }}</td>
                </tr>
                <tr class="resource-row" v-if="game_stages.lifeforce">
                    <td>Lifeforce</td>
                    <td>{{ lifeforce }} / {{ lifeforceMax }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    computed: {
        nutrients() {
            return this.$store.state.resources.nutrients;
        },
        nutrientsMax() {
            return this.$store.state.resources.nutrients_max;
        },
        cells() {
            return this.$store.state.resources.cells;
        },
        cellsMax() {
            return this.$store.state.resources.cells_max;
        },
        energy() {
            return this.$store.state.resources.energy;
        },
        energyMax() {
            return this.$store.state.resources.energy_max;
        },
        mana() {
            return this.$store.state.resources.mana;
        },
        manaMax() {
            return this.$store.state.resources.mana_max;
        },
        lifeforce() {
            return this.$store.state.resources.lifeforce;
        },
        lifeforceMax() {
            return this.$store.state.resources.lifeforce_max;
        },
    },
    data() {
        return {
            game_stages: this.$store.state.game_stages,
        }
    },
}
</script>
