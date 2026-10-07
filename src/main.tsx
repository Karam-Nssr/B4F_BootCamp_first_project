import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router'
import Posts from './components/Posts/Posts.tsx'
import { UserIdProvider } from './userContext.tsx'
import Users from './components/Users/Users.tsx'
import {my_todos_url, posts_url, my_albums_url, users_url } from '../core/end_points.ts'
import MyPosts from './components/MyPosts/MyPosts.tsx'
import MyAlbums from './components/MyAlbums/MyAlbums.tsx'
import MyTodos from './components/MyTodos/MyTodos.tsx'

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
    path:"/"+posts_url+"/:id",
    element:<MyPosts/>
  },
  {
    path:"/"+my_todos_url+"/:id",
    element:<MyTodos/>
  },
   {
    path:"/"+my_albums_url+"/:id",
    element:<MyAlbums/>
   },
  
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


