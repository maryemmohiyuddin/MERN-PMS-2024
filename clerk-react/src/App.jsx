import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { SignOutButton, SignUpButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SignedOut>
          <SignInButton />
          <p>This content is public. Only signed out users can see the SignInButton above this text.</p>
          <SignUpButton />
          <p>This content is public. Only signed out users can see the SignUpButton above this text.</p>
        </SignedOut>
        <SignedIn>
          <SignOutButton afterSignOutUrl="/" />
          <p>This content is private. Only signed in users can see the SignOutButton above this text.</p>

        </SignedIn>
      </div>
    </>
  )
}

export default App
