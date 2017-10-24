const gain_energy = {
    used_count: 0,
    workers: 0,
    progress_bar: {
        value: 0,
        running: 0,
        increment: 0.1,
    },
    production: {
        multiplier: 1,
        entity: 'resources.energy.current',
        value: {
            modify: 1,
        },
    },
    cost: {
        multiplier: 1,
        entity: 'resources.nutrients.current',
        current: 100,
    },
    upgrades: [
        {
            title: 'Speed',
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
                entity: 'resources.nutrients.current',
                value: {
                    base: 100,
                    growth: 1.12,
                },
                current: 100,
            },
        },
        {
            title: 'Max Supply',
            used_count: 0,
            production: {
                multiplier: 1,
                entity: 'resources.energy.max',
                value: {
                    base: 10,
                    growth: 1.05,
                    per_level: 5,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.cells.current',
                value: {
                    base: 100,
                    growth: 1.12,
                },
                current: 100,
            },
        },
    ],
};

export default gain_energy;
