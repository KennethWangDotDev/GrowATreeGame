import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    game_stages: {
        planted: 0,
        roots_emerged: 0,
    },
    
    resources: {
        nutrients: 0,
    },
    
    progress: {
        emerge_roots: {
            used_count: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 66,
            },
        },
        gather_nutrients: {
            level: 1,
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 0.25,
            },
            production: {
                multiplier: 1,
                entity: 'resources.nutrients',
                value: {
                    per_level: 1,
                },
            },
        },
        grow_roots: {
            level: 1,
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 1.25,
            },
            add_level: ['grow_roots', 'gather_nutrients'],
            production: {
                multiplier: 1,
                entity: 'progress.gather_nutrients',
                value: {
                    add: 1,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients',
                value: {
                    base: 5,
                    growth_rate: 1.2,
                },
                current_cost: 5,
            },
        },
    },
    
    notifications: [],
};

const mutations = {
    CLEAR_GAME_STAGE(state, stage) {
        state.game_stages[stage] = 1;
    },
    ADD_NOTIFICATION(state, notification) {
        state.notifications.unshift(notification);  
    },
    TRIM_OLDEST_NOTIFICATION(state) {
        state.notifications.pop();
    },
    ADD_WORKER(state, payload) {
        state.progress[payload.progressName].workers += payload.amount;
    },
    ADD_LEVEL(state, payload) {
        state.progress[payload.progressName].level += payload.amount;
    },
    ADD_USED_COUNT(state, payload) {
        state.progress[payload.progressName].used_count += payload.amount;
    },
    ADD_PROGRESS(state, payload) {
        state.progress[payload.progressName].progress_bar.value += payload.amount;
    },
    RESET_PROGRESS(state, progressName) {
        state.progress[progressName].progress_bar.value = 0;
    },
    START_PROGRESS(state, progressName) {
       state.progress[progressName].progress_bar.running = 1; 
    },
    END_PROGRESS(state, progressName) {
       state.progress[progressName].progress_bar.running = 0; 
    },
    INCREASE_RESOURCE(state, payload) {
        state.resources[payload.resourceName] += payload.amount;
    },
    SET_RESOURCE(state, payload) {
        state.resources[payload.resourceName] = payload.amount;
    },
};

const actions = {
    clearGameStage({ commit }, stage) {
        commit('CLEAR_GAME_STAGE', stage);
        if (stage === 'planted') { this.dispatch('addNotification', 'With the simple planting of a seed, a new life is born.'); }
    },
    addNotification({ commit }, notification) {
        commit('ADD_NOTIFICATION', notification);
        if (state.notifications.length > 15) {
            commit('TRIM_OLDEST_NOTIFICATION');
        }
    },
    startGather({ commit }, progressName) {
        commit('START_PROGRESS', progressName);
    },
    finishGather({ commit }, progressName) {
        store.commit('END_PROGRESS', progressName);
        store.commit('RESET_PROGRESS', progressName);
        store.commit('ADD_USED_COUNT', {progressName, amount: 1});
        this.dispatch('reward', { progressName, progress: state.progress[progressName] });
    },
    reward({ commit }, payload) {
        const { progressName, progress } = payload;

        if (progress.production) {
            let increase = 0;
            if (progress.production.value.per_level) {
                increase += progress.production.value.per_level * progress.level;
            }
            if (progress.production.value.add) {
                increase += progress.production.value.add;
            }
            if (progress.production.entity.includes('resources.')) {
                store.commit('INCREASE_RESOURCE', { resourceName: progress.production.entity.split('.')[1], amount: increase });
            } else if (progress.production.entity.includes('progress.')) {
                store.commit('ADD_LEVEL', { progressName: progress.production.entity.split('.')[1], amount: increase });
            }
        }
        
        // emerge_roots
        if (progressName === 'emerge_roots') {
            if (progress.used_count === 1) { this.dispatch('addNotification', 'You are the seed for a tree. You have the potential to grow into a large and beautiful tree.'); }
            if (progress.used_count === 2) { this.dispatch('addNotification', 'But currently you are still but a seed. Your first step is to grow out your roots.'); }
            if (progress.used_count === 3) { this.dispatch('addNotification', 'You sense that your roots are close to emerging.'); }
            if (progress.used_count === 4) { this.dispatch('addNotification', 'Just a little more!'); }
            if (progress.used_count === 5) { 
                this.dispatch('addNotification', 'Your roots have fully emerged! Tree roots are very important. They anchor the tree in the soil, keeping it straight and stable, and absorb water from the soil. Tree roots also take nutrients and chemicals out of the soil and use them to produce what they need for the tree’s growth, development, and repair.'); 
                this.dispatch('clearGameStage', 'roots_emerged');
            }      
        }
        
        // gather_nutrients
        //store.commit('')
    },
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
});

export default store;
