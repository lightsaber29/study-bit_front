import { lazy } from 'react';

// 상대경로로 작성할 것
const Home = lazy(() => import('./Home'));
// const MyPage = lazy(() => import('./MyPage'));
// const Settings = lazy(() => import('./Settings'));

const mainRoutes = [
  {
    path: '/',
    element: <Home />
  },
  // {
  //   path: '/mypage',
  //   element: <MyPage />
  // },
  // {
  //   path: '/settings',
  //   element: <Settings />
  // }
];

export default mainRoutes; 