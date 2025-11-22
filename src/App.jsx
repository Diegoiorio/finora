import './App.css'; 
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react"
import BooksList from './components/BooksList';

function App() {

  const {user} = useUser();

  return (
    <div className="app-container">

      <header>
        <h1>Finora.io</h1>
        <h3>Your favourite library</h3>
      </header>

      <SignedOut>
        <div>
          <p>Login to access the library</p>
          <SignIn></SignIn>
        </div>
      </SignedOut>

      <SignedIn>
        {user ? (
          <div>
            <div className="user-header">
              <UserButton></UserButton>
              <p>Hello, {user.firstName || user.name || "User"}!</p>
            </div>
            
            <BooksList userId={user.id}></BooksList>
          </div>
          
        ) : (
          <p>Loading user...</p>
        )
        }
        
      </SignedIn>
    </div>
  )
}

export default App
