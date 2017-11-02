import Vue from 'vue';
import Vuex from 'vuex';

import game_stages from './modules/game_stages.js';
import resources from './modules/resources.js';
import stats from './modules/stats.js';
import progress from './modules/progress.js';
import research from './modules/research.js';
import workers from './modules/workers.js';
import { capFirstLetter, getResourceName } from '../js/utility.js';

Vue.use(Vuex);

const state = {
    game_stages,
    resources,
    stats,
    progress,
    research,
    workers,
    notifications: [],
};


function getEntity(entity) {
    let current = state;
    const split = entity.split('.');
    let parent;
    split.forEach((part) => {
        parent = current;
        current = current[part]; 
    });
    return { value: current, parent, part: split[split.length - 1]};
}

function resolveProduction(production, used_count) {
    const value = production.value;
    if (value.modify) {
        store.commit('MUTATE_STATE_INCREASE', { entity: production.entity, amount: value.modify });
    } else if (value.base && value.growth && used_count !== null) {
        let newValue = value.base * Math.pow(value.growth, used_count);
        newValue = Math.ceil(newValue);
        if (value.add) {
            newValue += value.add;
        }
        if (value.per_level) {
            newValue += (value.per_level * (used_count + 1));
        }
        store.commit('MUTATE_STATE', { entity: production.entity, amount: newValue });
    }
}

function resolveCost(cost, used_count) {
    if (getEntity(cost.entity).value >= cost.current) {
        store.commit('MUTATE_STATE_INCREASE', { entity: cost.entity, amount: cost.current * -1 });
        if (cost.value) {
            const value = cost.value;
            if (value.base && value.growth && used_count !== null) { 
                let newValue = value.base * Math.pow(value.growth, used_count + 1);
                newValue = Math.ceil(newValue);
                if (value.add) {
                    newValue += value.add;
                }
                if (value.per_level) {
                    newValue += (value.per_level * (used_count + 1));
                }
                store.commit('MUTATE_CURRENT_COST', { cost, amount: newValue});
            } 
        }
        return true;
    } else {
        return false;
    }
}

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
    MUTATE_STATE(state, payload) {
        const entity = getEntity(payload.entity);
        entity.parent[entity.part] = payload.amount;
        if (payload.entity.startsWith('resources')) {
            if (entity.parent.current > entity.parent.max) {
                entity.parent.current = entity.parent.max;
            }
        }
    },
    MUTATE_STATE_INCREASE(state, payload) {
        const entity = getEntity(payload.entity);
        entity.parent[entity.part] += payload.amount;
        if (payload.entity.startsWith('resources')) {
            if (entity.parent.current > entity.parent.max) {
                entity.parent.current = entity.parent.max;
            }
        }
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
    MUTATE_CURRENT_COST(state, payload) {
        payload.cost.current = payload.amount;
    },
    PURCHASE_RESEARCH(state, index) {
        state.research[index].purchased = 1;
    },
    INCREMENT_UPGRADE(state, payload) {
        state.progress[payload.progress].upgrades[payload.index].used_count += 1;
    }
};

const actions = {
    
    clearGameStage({ commit }, stage) {
        commit('CLEAR_GAME_STAGE', stage);
        if (stage === 'planted') { this.dispatch('addNotification', 'With the simple planting of a seed, a new life is born.'); }
    },
    
    addNotification({ commit }, notification) {
        commit('ADD_NOTIFICATION', notification);
        if (state.notifications.length > 30) {
            commit('TRIM_OLDEST_NOTIFICATION');
        }
    },
    
    startGather({ commit }, progressName) {
        const cost = state.progress[progressName].cost;
        // If cost object exists
        if (cost) {
            // Resolve the cost
            if (resolveCost(cost)) {
                // Working!
                commit('MUTATE_STATE_INCREASE', { entity: `progress.${progressName}.used_count`, amount: 1 });
                commit('START_PROGRESS', progressName);
            } else {
                // Can't afford
                this.dispatch('addNotification', `Not enough ${cost.entity.split('.')[cost.entity.split('.').length - 1]}.`);
            }
        } else {
            // If no cost, then just work
            commit('MUTATE_STATE_INCREASE', { entity: `progress.${progressName}.used_count`, amount: 1 });
            commit('START_PROGRESS', progressName);
        }
    },
    
    finishGather({ commit }, progressName) {
        store.commit('END_PROGRESS', progressName);
        store.commit('RESET_PROGRESS', progressName);
        this.dispatch('reward', { progressName });
    },
    
    purchaseUpgrade({ commit }, payload) {
        const upgrade = state.progress[payload.progress].upgrades[payload.index];
        if (resolveCost(upgrade.cost, upgrade.used_count)) {
            resolveProduction(upgrade.production, upgrade.used_count);
            commit('INCREMENT_UPGRADE', payload);
        } else {
            this.dispatch('addNotification', `Not enough ${getResourceName(upgrade.cost.entity)}.`);
        }
    },
    
    purchaseResearch({ commit }, payload) {
        if (resolveCost(payload.research.cost)) {
            resolveProduction(payload.research.production);
            commit('PURCHASE_RESEARCH', payload.index);
        } else {
            this.dispatch('addNotification', `Not enough ${getResourceName(payload.research.cost.entity)}.`);
        }
    },
    
    addWorker({ commit }, progress) {
        if (state.workers.idle > 0) {
            commit('MUTATE_STATE_INCREASE', { entity: 'workers.idle', amount: -1 });
            commit('MUTATE_STATE_INCREASE', { entity: `progress.${progress}.workers`, amount: 1 });
        } else {
            this.dispatch('addNotification', `No available idle worker.`);
        }
    },
    
    removeWorker({ commit }, progressName) {
        if (state.progress[progressName].workers > 0) {
            commit('MUTATE_STATE_INCREASE', { entity: 'workers.idle', amount: 1 });
            commit('MUTATE_STATE_INCREASE', { entity: `progress.${progressName}.workers`, amount: -1 });
        } else {
            this.dispatch('addNotification', `No worker to remove.`);
        }
    },
    
    reward({ commit }, payload) {
        const { progressName } = payload;
        const progress = state.progress[progressName];

        if (progress.production) {
            resolveProduction(progress.production);
        }
        
        // Check notifications
        if (progressName === 'emerge_roots') {
            if (progress.used_count === 1) { this.dispatch('addNotification', 'You are the seed for a tree. You have the potential to grow into a large and beautiful tree.'); }
            if (progress.used_count === 2) { this.dispatch('addNotification', 'Your first step is to grow out your roots.'); }
            if (progress.used_count === 3) { this.dispatch('addNotification', 'You sense that your roots are close to emerging.'); }
            if (progress.used_count === 4) { this.dispatch('addNotification', 'Just a little more!'); }
            if (progress.used_count === 5) { 
                this.dispatch('addNotification', 'Congratulations, you have passed the initial stage! Now, the next step is to gather nutrients.');
                this.dispatch('clearGameStage', 'roots_emerged');
            }      
        }
        
        if (progressName === 'gather_nutrients') {
            if (progress.used_count === 1) {
                this.dispatch('addNotification', 'Tree roots gather nutrients from soil and use them to produce the tree’s growth, development, and repair.'); 
            }
            if (progress.used_count === 2) {
                this.dispatch('addNotification', 'Gathering nutrients can be slow. You can speed things up by toggling the section and upgrading the speed. It costs 2 nutrients initially, but is a worthy investment.'); 
            }
            if (progress.used_count === 10) {
                this.dispatch('clearGameStage', 'cells');
                this.dispatch('addNotification', 'You can use cells to upgrade the maximum number of nutrients you can store.'); 
            }
        }
        
        if (progressName === 'grow_cells') {
            if (progress.used_count === 1) {
                this.dispatch('addNotification', 'You have unlocked the research tab!'); 
                this.dispatch('clearGameStage', 'research');
            }
        }
        
        if (progressName === 'create_worker') {
            if (progress.used_count === 1) {
                this.dispatch('addNotification', 'Your worker has finished! Try assigning it to a task!'); 
                this.dispatch('addNotification', 'There is no more content left in this demo. Thank you for playing! :)'); 
            }
        }
        
    },
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
});

export default store;
