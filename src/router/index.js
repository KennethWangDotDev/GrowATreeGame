import Vue from 'vue';
import Router from 'vue-router';
import Tree from '../components/Tree.vue';
import Research from '../components/Research.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: Tree,
        },
        {
            path: '/research',
            component: Research,
        },
    ],
});
