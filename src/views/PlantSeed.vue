<template>
    <div class="plant-seed">
        <h1 class="title">Grow A Tree!</h1>
        <h2 class="subtitle">A Tree Game</h2>
        <h6 class="desc">An educational incremental game about the lifecycle of one of <span>nature's greatest creations.</span></h6>
        <button @click="$store.dispatch('clearGameStage', 'planted')">Plant Seed!</button>
    </div>
</template>
