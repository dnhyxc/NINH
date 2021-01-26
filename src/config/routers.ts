import * as Routes from '../routes/index';
import { RouteTypes } from './types';

const RoutesConfig: RouteTypes[] = [
  {
    key: 'home',
    path: '/app/home',
    component: Routes.Home,
    exact: true,
  },
  {
    key: 'react',
    path: '/app/react',
    component: Routes.React,
    exact: true,
  },
  {
    key: 'baseJs',
    path: '/app/basejs',
    component: Routes.BaseJs,
    exact: true,
  },
  {
    key: 'dvajs',
    path: '/app/dvajs',
    component: Routes.DvaJS,
    exact: true,
  },
  {
    key: 'dnd',
    path: '/app/dnd',
    component: Routes.ReactDnd,
    exact: true,
  },
  {
    key: 'redux',
    path: '/app/redux',
    component: Routes.Redux,
    exact: true,
  },
  {
    key: 'dnd',
    path: '/app/dnd',
    component: Routes.React,
    exact: true,
  },
  {
    key: 'webpack',
    path: '/app/webpack',
    component: Routes.Webpack,
    exact: true,
  },
  {
    key: 'auth',
    path: '/app/auth',
    component: Routes.Auth,
    exact: true,
  },
  {
    key: 'login',
    path: '/app/login',
    component: Routes.Login,
    exact: true,
  }
];

const LoginRouter = {
  key: 'login',
  path: '/app/login',
  component: Routes.Login,
  exact: true,
}

export {
  RoutesConfig,
  LoginRouter
};
