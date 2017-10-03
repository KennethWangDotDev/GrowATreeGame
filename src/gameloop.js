import store from './store';

window.setInterval(() => {
    
    const { resources, progress} = store.state;
    
    /**
     * Iterates through resources, and adds progresses to the ones with the `running` property
     */
    for (const progressName in progress) {
        if (progress.hasOwnProperty(progressName)) {
            
            // If the resource is running
            if (progress[progressName].progress_bar.running) {
                // Then add progress based off of the increment amount
                store.commit('ADD_PROGRESS', {progressName, amount: progress[progressName].progress_bar.increment});
                if (progress[progressName].progress_bar.value >= 100) {
                    // Tells our store when finished
                    store.dispatch('finishGather', progressName);
                }
            }

        }
    }
    
}, 25);
