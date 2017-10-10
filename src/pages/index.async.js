import asyncRoute from '../lib/asyncRoute';

const Home = asyncRoute(() => import( /* webpackChunkName: "Home" */ './Home'));

export {
  Home
}
