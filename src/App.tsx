import { useContext } from 'react';
import './App.css'
import Users from './components/Users/Users.tsx'
import Posts from './components/Posts/Posts.tsx';
import { useUser } from './userContext.tsx';
function App() {
  const userId = useUser();
  return (
    <>
    {console.log(userId)}
    {userId != null ? <Posts /> : <Users />}
    </>
  )
}

export default App
