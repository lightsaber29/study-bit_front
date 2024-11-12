import { lazy } from 'react';

// 상대경로로 작성할 것
const StudyList = lazy(() => import('./my_weapon/StudyList'));
// const Lecture = lazy(() => import('./my_weapon/Lecture'));

const sampleRoutes = [
  {
    path: '/weapon/study',
    element: <StudyList />
  },
  // {
  //   path: '/weapon/lecture',
  //   element: <Lecture />
  // }
];

export default sampleRoutes; 