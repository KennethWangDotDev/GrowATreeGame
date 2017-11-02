import store from '../store';
const FPS = 40;
const DELTA_LOOP = 1000 / FPS; 
const DEV_SPEED = 2;

window.setInterval(() => {
    
    const { resources, progress } = store.state;
    
    /**
     * Iterates through resources, and adds progresses to the ones with the `running` property
     */
    for (const progressName in progress) {
        if (progress.hasOwnProperty(progressName)) {
            
            // If the resource is running
            if (progress[progressName].progress_bar.running) {
                    // Then add progress based off of the increment amount
                    store.commit('ADD_PROGRESS', { progressName, amount: progress[progressName].progress_bar.increment * DEV_SPEED });
                if (progress[progressName].progress_bar.value >= 100) {
                    // Tells our store when finished
                    // WIP only finish gather if resource is not maxed
                    store.dispatch('finishGather', progressName);
                }
            }
            
            // If the resource is being worked on
            if (progress[progressName].workers) {
                store.commit('ADD_PROGRESS', { progressName, amount: progress[progressName].progress_bar.increment * progress[progressName].workers * DEV_SPEED });
                if (progress[progressName].progress_bar.value >= 100) {
                    // Tells our store when finished
                    // WIP only finish gather if resource is not maxed
                    const overflow = progress[progressName].progress_bar.value - 100;
                    store.commit('MUTATE_STATE_INCREASE', { entity: `progress.${progressName}.used_count`, amount: 1 });
                    store.dispatch('finishGather', progressName);
                    store.commit('ADD_PROGRESS', { progressName, amount: overflow });
                }
            }

        }
    }
    
}, FPS);

export function getFPS() {
    return FPS;
}
