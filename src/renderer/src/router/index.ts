import { lazy } from 'react';
import Root from '../components/root';
import { createHashRouter } from 'react-router';

const router = createHashRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: lazy(() => import('@renderer/pages/home')) },
      { path: '/unpack-app', Component: lazy(() => import('@renderer/pages/unpack-app')) },
      // { path: '/unpack-app', Component: lazy(() => import('@renderer/pages/unpack-app')) },
      // { path: '/edit-app', Component: lazy(() => import('@renderer/pages/edit-app')) },
      // { path: '/sign-app', Component: lazy(() => import('@renderer/pages/sign-app')) },
    ],
  },
]);

export default router;
