import './Navbar.css'
const Navbar = () => {
  return (
    <>
    <nav>
        <div>
            <h1>App</h1>
        </div>
        <ul>
            
            <li>
                <a href="/users">Users</a>
            </li>
            <li>
                <a href="/posts">Posts</a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar