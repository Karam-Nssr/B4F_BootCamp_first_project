import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router'
import Posts from './components/Posts/Posts.tsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/posts",
    element:<Posts/>
  },
  // {
  //   path:"/my_posts",
  //   element:<MyPosts/>
  // },
  // {
  //   path:"/todos",
  //   element:<Todos/>
  // },
  // {
  //   path:"/albums",
  //   element:<Albums/>
  // },
  // {
  //   path:"/users",
  //   element:<Users/>
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
    <RouterProvider router={router} />
  </StrictMode>,
)


