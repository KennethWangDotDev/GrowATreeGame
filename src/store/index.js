import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    game_stages: {
        planted: 0,
        roots_emerged: 0,
        unlock_grow_roots: 0,
        unlock_grow_bigger: 0,
    },
    
    resources: {
        nutrients: 0,
    },
    
    stats: {
        tree_size: 0,  
    },
    
    progress: {
        emerge_roots: {
            used_count: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 1.25,
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
                increment: 0.5,
            },
            add_level: {
                start: 'grow_roots',
            },
            production: {
                multiplier: 1,
                entity: 'progress.gather_nutrients.progress_bar.increment',
                value: {
                    add: 0.1,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients',
                value: {
                    base: 2,
                    growth_rate: 1.07,
                },
                current: 2,
            },
        },
        grow_bigger: {
            level: 1,
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 0.5,
            },
            add_level: {
                start: 'grow_bigger',
            },
            production: {
                multiplier: 1,
                entity: 'stats.tree_size',
                value: {
                    add: 0.25,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients',
                value: {
                    base: 20,
                    growth_rate: 1.07,
                },
                current: 20,
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
    ADD_WORKERS(state, payload) {
        state.progress[payload.progressName].workers += payload.amount;
    },
    ADD_LEVELS(state, payload) {
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
    SET_RESOURCE(state, payload) {
        state.resources[payload.resourceName] = payload.amount;
    },
    INCREASE_PROGRESS_INCREMENT(state, payload) {
        state.progress[payload.progressName].progress_bar.increment += payload.amount; 
    },
    INCREASE_PRODUCTION_MULTIPLIER(state, payload) {
        state.progress[payload.progressName].progress.multiplier += payload.amount; 
    },
    INCREASE_COST_MULTIPLIER(state, payload) {
        state.progress[payload.progressName].cost.multiplier += payload.amount; 
    },
    SET_COST_CURRENT(state, payload) {
        state.progress[payload.progressName].cost.current = payload.amount; 
    },
    INCREASE_STATS(state, payload) {
        state.stats[payload.statsName] += payload.amount; 
    },
};

const actions = {
    clearGameStage({ commit }, stage) {
        commit('CLEAR_GAME_STAGE', stage);
        if (stage === 'planted') { this.dispatch('addNotification', 'With the simple planting of a seed, a new life is born.'); }
    },
    addNotification({ commit }, notification) {
        commit('ADD_NOTIFICATION', notification);
        if (state.notifications.length > 10) {
            commit('TRIM_OLDEST_NOTIFICATION');
        }
    },
    startGather({ commit }, progressName) {
        const cost = state.progress[progressName].cost;
        if (cost) {
            const entity = cost.entity;
            const entitySplit = entity.split('.');
            if (entity.startsWith('resources.')) {
                if (state.resources[entitySplit[1]] >= cost.current) {
                    commit('INCREASE_RESOURCE', { resourceName: entity.split('.')[1], amount: cost.current * -1 });
                    if (state.progress[progressName].add_level.start) {
                       commit('ADD_LEVELS', { progressName: state.progress[progressName].add_level.start, amount: 1 });
                    }
                    let base = cost.value.base || 1;
                    let growth = cost.value.growth_rate || 0;
                    let add = cost.value.add || 0;
                    const next = Math.ceil(base * Math.pow(growth, state.progress[progressName].level) + add);
                    commit('SET_COST_CURRENT', { progressName: progressName, amount: next });
                    commit('START_PROGRESS', progressName);
                } else {
                    this.dispatch('addNotification', `Not enough ${entity.split('.')[1]}.`);
                }
                
            }
        } else {
            commit('START_PROGRESS', progressName);
        }
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
            // Increase Math
            let increase = 0;
            if (progress.production.value.per_level) {
                increase += progress.production.value.per_level * progress.level;
            }
            if (progress.production.value.add) {
                increase += progress.production.value.add;
            }
            
            // Corresponding entity
            const entity = progress.production.entity;
            if (entity.startsWith('resources.')) {
                store.commit('INCREASE_RESOURCE', { resourceName: entity.split('.')[1], amount: increase });
            } else if (entity.startsWith('progress.')) {
                if (entity.endsWith('progress_bar.increment')) {
                    store.commit('INCREASE_PROGRESS_INCREMENT', { progressName: entity.split('.')[1], amount: increase });
                } else if (entity.endsWith('production.multiplier')) {
                    store.commit('INCREASE_PRODUCTION_MULTIPLIER', { progressName: entity.split('.')[1], amount: increase });
                } else if (entity.endsWith('production.value')) {
                    /* tbd*/
                } else if (entity.endsWith('cost.multiplier')) {
                    store.commit('INCREASE_COST_MULTIPLIER', { progressName: entity.split('.')[1], amount: increase });
                } else if (entity.endsWith('cost.value')) {
                    /* tbd */
                } else if (entity.endsWith('workers')) {
                    store.commit('ADD_WORKERS', { progressName: entity.split('.')[1], amount: increase });
                }
            } else if (entity.startsWith('stats.')) {
                store.commit('INCREASE_STATS', { statsName: entity.split('.')[1], amount: increase });
            }
        
            // Add level
            if (progress.add_level) {
                if (progress.add_level.end) {
                    store.commit('ADD_LEVELS', { progressName: progress.add_level, amount: 1 });
                }
            }
        }
        
        // Check notifications
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
        
        if (progressName === 'gather_nutrients') {
            console.log('test');
            if (progress.used_count === 1) {
                this.dispatch('addNotification', 'Gathering nutrients is a slow process. You can speed things up by growing out your roots!'); 
                this.dispatch('clearGameStage', 'unlock_grow_roots');
            }
            if (progress.used_count === 4) {
                this.dispatch('addNotification', 'You are still a seed covered in the dirt, but you are close to sprouting upwards...'); 
            }
            if (progress.used_count === 8) {
                this.dispatch('addNotification', 'A small stem has emerged from your seed, pointing upwards. You are almost about to experience fresh air.'); 
            }
            if (progress.used_count === 10) {
                this.dispatch('addNotification', 'You have officially passed the seed stage and are a baby tree! Now you can grow bigger and become the best tree there is!'); 
                this.dispatch('clearGameStage', 'unlock_grow_bigger');
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
