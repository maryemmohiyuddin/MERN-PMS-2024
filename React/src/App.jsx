import React from "react";
import "./index.css";
import { dark } from '@clerk/themes';
import { ClerkProvider } from "@clerk/clerk-react";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark
            }}
            publishableKey={clerkPubKey}
        >
            <div>Hello from clerk</div>
        </ClerkProvider>
    );
}

export default App;