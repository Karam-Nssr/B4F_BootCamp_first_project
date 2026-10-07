import { useContext } from 'react';
import './App.css'
import Users from './components/Users/Users.tsx'
import { useUser } from './userContext.tsx';
import MyPosts from './components/MyPosts/MyPosts.tsx';
function App() {
  const userId = useUser();
  return (
    <>
    {console.log(userId)}
    {userId != null ? <MyPosts /> : <Users />}
    </>
  )
}

export default App
