/*================================
=            Research            =
================================*/
const research = [
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
];

export default research;
