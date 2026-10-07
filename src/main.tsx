import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router'
import Posts from './components/Posts/Posts.tsx'
import { UserIdProvider } from './userContext.tsx'
import Users from './components/Users/Users.tsx'
import { my_posts_url, posts_url, users_url } from '../core/end_points.ts'
import MyPosts from './components/MyPosts/MyPosts.tsx'

 const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/"+posts_url,
    element:<Posts/>
  },
  {
    path:"/"+users_url,
    element:<Users/>
  },
  {
    path:"/"+my_posts_url,
    element:<MyPosts/>
  },
  // {
  //   path:"/todos",
  //   element:<Todos/>
  // },
  // {
  //   path:"/albums",
  //   element:<Albums/>
  // },
  
  // {
  //   path:"/posts/:id",
  //   element:<PostDetails />
  // },
  // {
  //   path:"*",
  //   element:<App/>
  // },
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <UserIdProvider>
      <RouterProvider router={router} />
    </UserIdProvider>
  </StrictMode>,
)


