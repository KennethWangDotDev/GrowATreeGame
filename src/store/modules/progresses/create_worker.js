const create_worker = {
    used_count: 0,
    progress_bar: {
        value: 0,
        running: 0,
        increment: 0.05,
    },
    production: {
        multiplier: 1,
        entity: 'workers.idle',
        value: {
            modify: 1,
        },
    },
    cost: {
        multiplier: 1,
        entity: 'resources.cells.current',
        current: 5,
        value: {
            multiply: 10,  
        },
    },
    upgrades: [
        {
            title: 'Worker Coexisting Efficiency',
            used_count: 0,
            production: {
                multiplier: 1,
                entity: 'workers.efficiency',
                value: {
                    modify: 1,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.nutrients.current',
                value: {
                    base: 100,
                    growth: 1.35,
                },
                current: 100,
            },
        },
    ],
};

export default create_worker;
