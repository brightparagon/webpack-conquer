import asyncRoute from '../lib/asyncRoute';

const Home = asyncRoute(() => import( /* webpackChunkName: "Home" */ './Home'));
const About = asyncRoute(() => import( /* webpackChunkName: "About" */ './About'));
const Post = asyncRoute(() => import( /* webpackChunkName: "Post" */ './Post'));
const Posts = asyncRoute(() => import( /* webpackChunkName: "Posts" */ './Posts'));

export {
  Home,
  About,
  Post,
  Posts
}
