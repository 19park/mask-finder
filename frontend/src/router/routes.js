// 공통레이아웃
import Layout from '@/components/Layout';

// pages
import Main from '@/pages/Main';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';

export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: '리스트',
                component: Main
            },
            {
                path: 'about',
                name: 'About',
                component: About
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
];
