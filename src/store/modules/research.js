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
            entity: 'resources.nutrients.current',
            current: 15,
        },
        unlock: 'cells',
        purchased: 0,
    },
];

export default research;
