import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home.jsx"
import News from "./pages/News.jsx"
import Brch from "./pages/Brch.jsx"
import Gram from "./pages/Gram.jsx"
import Dicio from "./pages/Dicio"
import brxUp from "./pages/brxUp"
import PostDetail from "./pages/PostDetail"
import UserProfile from './pages/UserProfile';
import ForgetPassword from './pages/ForgetPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Login from "./pages/Login";
import About from "./pages/About";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import AuthorPosts from "./pages/AuthorPosts";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import Authors from "./pages/Authors";
import UserProvider from './context/userContext.js';

const router = createBrowserRouter([
  {
      path: "/",
      element: <UserProvider><Layout/></UserProvider>,
      errorElement: <ErrorPage/>,
      children:[
        {index: true, element: <Home/>},
        {path: "posts/:id", element: <PostDetail/>},
        {path: "register", element: <Register/>},
        {path: "news", element: <News/>},
        {path: "brochure", element: <Brch/>},
        {path: "grammar", element: <Gram/>},
        {path: "about", element: <About/>},
        {path: "dicionary", element: <Dicio/>},
        {path: "update", element: <brxUp/>},
        {path: "login", element: <Login/>},
        {path: "forget-password", element: <ForgetPassword/>},
        {path: "reset-password/:id/:token", element: <ResetPassword/>},
        {path: "profile/:id", element: <UserProfile/>},
        {path: "pass/", element: <UserProfile/>},
        {path: "authors", element: <Authors/>},
        {path: "create", element: <CreatePost/>},
        {path: "posts/categories/:category", element: <CategoryPosts/>},
        {path: "posts/users/:id", element: <AuthorPosts/>},
        {path: "myposts/:id/", element: <Dashboard/>},
        {path: "posts/:id/edit", element: <EditPost/>},
        {path: "posts/:id/delete", element: <DeletePost/>},
        {path: "logout", element: <Logout/>},
      ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


