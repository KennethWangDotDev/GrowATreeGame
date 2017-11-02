const gather_nutrients = {
    used_count: 0,
    workers: 0,
    progress_bar: {
        value: 0,
        running: 0,
        increment: 0.5,
    },
    production: {
        multiplier: 1,
        entity: 'resources.nutrients.current',
        value: {
            modify: 1,
        },
    },
    upgrades: [
        {
            title: 'Speed',
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
                entity: 'resources.nutrients.current',
                value: {
                    base: 4,
                    growth: 1.12,
                    add: -2,
                },
                current: 2,
            },
        },
        {
            title: 'Max Supply',
            used_count: 0,
            production: {
                multiplier: 1,
                entity: 'resources.nutrients.max',
                value: {
                    base: 10,
                    growth: 1.06,
                    per_level: 5,
                },
            },
            cost: {
                multiplier: 1,
                entity: 'resources.cells.current',
                value: {
                    base: 5,
                    add: -4,
                    growth: 1.10,
                },
                current: 1,
            },
        },
    ],
};

export default gather_nutrients;
