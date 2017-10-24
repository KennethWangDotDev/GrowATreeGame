<template>
    <nav class="main-nav">
        <NavBox :icon="'fa-tree-alt'" :route="'/'"></NavBox>
        <NavBox :icon="'fa-leaf'" :route="'/micromanagement'" v-if="game_stages.micromanagement"></NavBox>
        <NavBox :icon="'fa-flask'" :route="'/research'"></NavBox>
    </nav>
</template>

<script>
import NavBox from '../components/NavBox.vue';

export default {
    components: {
        NavBox,
    },
    data() {
        return {
            game_stages: this.$store.state.game_stages,
        }
    },
}
</script>
