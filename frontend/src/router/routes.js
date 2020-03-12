// 공통레이아웃
import Layout from '@/components/Layout';

// 메인페이지
import Main from '@/pages/Main';

// 404
import NotFound from '@/pages/NotFound';

export default [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: '메인메뉴',
                component: Main
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
];
