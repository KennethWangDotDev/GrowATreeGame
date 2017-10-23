import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    /*===================================
    =            Game Stages            =
    ===================================*/
    game_stages: {
        /*----------  Intro  ----------*/
        planted: 1,
        roots_emerged: 1,
        
        /*----------  Progress Resources  ----------*/
        cells: 1,
        energy: 0,
        mana: 0,
        lifeforce: 0,
        
        /*----------  Tabs  ----------*/
        research: 1,
        micromanagement: 0,
    },
    
    
    /*=================================
    =            Resources            =
    =================================*/
    resources: {
        nutrients: 30,
        nutrients_max: 30,
        cells: 30,
        cells_max: 30,
        energy: 0,
        energy_max: 10,
        mana: 0,
        mana_max: 10,
        lifeforce: 0,
        lifeforce_max: 5,
        workers: 0,
        workers_max: 1,
    },
    
    
    /*=============================
    =            Stats            =
    =============================*/
    stats: {
        tree_size: 0,  
    },
    
    
    /*================================
    =            Progress            =
    ================================*/
    progress: {
        
        /*----------  Emerge Roots  ----------*/
        emerge_roots: {
            used_count: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 1.25,
            },
        },
        /**/
        
        /*----------  Gather Nutrients  ----------*/
        gather_nutrients: {
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 0.5,
            },
            production: {
                multiplier: 1,
                entity: 'resources.nutrients',
                value: {
                    modify: 1,
                },
            },
            upgrades: {
                speed: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'progress.gather_nutrients.progress_bar.increment',
                        value: {
                            modify: 0.15,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.nutrients',
                        value: {
                            base: 4,
                            growth: 1.12,
                            add: -2,
                        },
                        current: 2,
                    },
                },
                supply: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'resources.nutrients_max',
                        value: {
                            base: 10,
                            growth: 1.06,
                            per_level: 5,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.cells',
                        value: {
                            base: 5,
                            add: -4,
                            growth: 1.10,
                        },
                        current: 1,
                    },
                },
            },
        },
        /**/
        
        /*----------  Grow Cells  ----------*/
        grow_cells: {
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 0.25,
            },
            production: {
                multiplier: 1,
                entity: 'resources.cells',
                value: {
                    modify: 1,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients',
                current: 5,
            },
            upgrades: {
                speed: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'progress.grow_cells.progress_bar.increment',
                        value: {
                            modify: 0.1,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.nutrients',
                        value: {
                            base: 10,
                            growth: 1.10,
                        },
                        current: 10,
                    },
                },
                supply: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'resources.cells_max',
                        value: {
                            base: 10,
                            growth: 1.05,
                            per_level: 5,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.cells',
                        value: {
                            base: 8,
                            growth: 1.10,
                            add: -7,
                        },
                        current: 1,
                    },
                },
            },
        },
        /**/
        
        /*----------  Gain Energy  ----------*/
        gain_energy: {
            used_count: 0,
            workers: 0,
            progress_bar: {
                value: 0,
                running: 0,
                increment: 0.1,
            },
            production: {
                multiplier: 1,
                entity: 'resources.energy',
                value: {
                    modify: 1,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients',
                current: 100,
            },
            upgrades: {
                speed: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'progress.gain_energy.progress_bar.increment',
                        value: {
                            modify: 0.075,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.nutrients',
                        value: {
                            base: 100,
                            growth: 1.12,
                        },
                        current: 100,
                    },
                },
                supply: {
                    used_count: 0,
                    production: {
                        multiplier: 1,
                        entity: 'resources.energy_max',
                        value: {
                            base: 10,
                            growth: 1.05,
                            per_level: 5,
                        },
                    },
                    cost: {
                        multiplier: 1,
                        entity: 'resources.cells',
                        value: {
                            base: 100,
                            growth: 1.12,
                        },
                        current: 100,
                    },
                },
            },
        },
        /**/
    },
        
        
    /*================================
    =            Research            =
    ================================*/
    research: [
        {
            title: 'Grow Leaf',
            desc: 'Enables the Micromanagement tab. Allows you access to workers among other things.',
            production: {
                entity: 'game_stages.micromanagement',
                value: {
                    modify: 1,
                },
            },
            cost: {
                entity: 'resources.nutrients',
                current: 15,
            },
            unlock: 'cells',
            purchased: 0,
        },
        {
            title: 'Grow Leaf 2',
            desc: 'Enables the Micromanagement tab. Allows you access to workers among other things.',
            cost: {
                entity: 'resources.cells',
                current: 15,
            },
            unlock: 'unlock_grow_leaf',
            purchased: 0,
        },
    ],
    
    
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
            if (entity.parent[entity.part] > entity.parent[`${entity.part}_max`]) {
                entity.parent[entity.part] = entity.parent[`${entity.part}_max`];
            }
        }
    },
    MUTATE_STATE_INCREASE(state, payload) {
        const entity = getEntity(payload.entity);
        entity.parent[entity.part] += payload.amount;
        if (payload.entity.startsWith('resources')) {
            if (entity.parent[entity.part] > entity.parent[`${entity.part}_max`]) {
                entity.parent[entity.part] = entity.parent[`${entity.part}_max`];
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
        const upgrade = state.progress[payload.progress].upgrades[payload.upgrade];
        if (resolveCost(upgrade.cost, upgrade.used_count)) {
            resolveProduction(upgrade.production, upgrade.used_count);
            commit('MUTATE_STATE_INCREASE', { entity: `progress.${payload.progress}.upgrades.${payload.upgrade}.used_count`, amount: 1 });
        } else {
            this.dispatch('addNotification', `Not enough ${upgrade.cost.entity.split('.')[upgrade.cost.entity.split('.').length - 1]}.`);
        }
    },
    
    purchaseResearch({ commit }, payload) {
        if (resolveCost(payload.research.cost)) {
            resolveProduction(payload.research.production);
            commit('PURCHASE_RESEARCH', payload.index);
        } else {
            this.dispatch('addNotification', `Not enough ${upgrade.cost.entity.split('.')[upgrade.cost.entity.split('.').length - 1]}.`);
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
            if (progress.used_count === 2) { this.dispatch('addNotification', 'But currently you are still but a seed. Your first step is to grow out your roots.'); }
            if (progress.used_count === 3) { this.dispatch('addNotification', 'You sense that your roots are close to emerging.'); }
            if (progress.used_count === 4) { this.dispatch('addNotification', 'Just a little more!'); }
            if (progress.used_count === 5) { 
                this.dispatch('addNotification', 'Your roots have fully emerged! Tree roots are very important. They anchor the tree in the soil, keeping it straight and stable, and absorb water from the soil. Tree roots also take nutrients and chemicals out of the soil and use them to produce what they need for the tree’s growth, development, and repair.'); 
                this.dispatch('clearGameStage', 'roots_emerged');
            }      
        }
        
        if (progressName === 'gather_nutrients') {
            if (progress.used_count === 1) {
                this.dispatch('addNotification', 'Gathering nutrients is a slow process. You can speed things up by growing out your roots!'); 
            }
            if (progress.used_count === 3) {
                this.dispatch('clearGameStage', 'cells');
            }
            if (progress.used_count === 4) {
                this.dispatch('addNotification', 'You are still a seed covered in the dirt, but you are close to sprouting upwards...'); 
            }
            if (progress.used_count === 8) {
                this.dispatch('addNotification', 'A small stem has emerged from your seed, pointing upwards. You are almost about to experience fresh air.'); 
            }
            if (progress.used_count === 10) {
                this.dispatch('addNotification', 'You have officially passed the seed stage and are a baby tree! Now you can grow bigger and become the best tree there is!'); 
                this.dispatch('clearGameStage', 'research');
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
