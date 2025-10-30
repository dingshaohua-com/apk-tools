import { lazy } from 'react';
import Root from '../components/root';
import { createHashRouter } from 'react-router';

const router = createHashRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: lazy(() => import('@renderer/pages/home')) },
      { path: '/decode-apk', Component: lazy(() => import('@renderer/pages/decode-apk')) },
      { path: '/build-apk', Component: lazy(() => import('@renderer/pages/build-apk')) },
       { path: '/sign-apk', Component: lazy(() => import('@renderer/pages/sign-apk')) },
      // { path: '/edit-app', Component: lazy(() => import('@renderer/pages/edit-app')) },
     
    ],
  },
]);

export default router;
