const grow_cells = {
    used_count: 0,
    workers: 0,
    progress_bar: {
        value: 0,
        running: 0,
        increment: 0.25,
    },
    production: {
        multiplier: 1,
        entity: 'resources.cells.current',
        value: {
            modify: 1,
        },
    },
    cost: {
        multiplier: 1,
        entity: 'resources.nutrients.current',
        current: 5,
    },
    upgrades: [
        {
            title: 'Speed',
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
                entity: 'resources.nutrients.current',
                value: {
                    base: 10,
                    growth: 1.10,
                },
                current: 10,
            },
        },
        {
            title: 'Max Supply',
            used_count: 0,
            production: {
                multiplier: 1,
                entity: 'resources.cells.max',
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
                    base: 8,
                    growth: 1.10,
                    add: -7,
                },
                current: 1,
            },
        },
    ],
};

export default grow_cells;
