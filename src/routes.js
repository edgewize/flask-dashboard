import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Wave = React.lazy(() => import('./views/Wave/Wave'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/wave/:site_id', name: 'Wave', component: Wave },
];

export default routes;
