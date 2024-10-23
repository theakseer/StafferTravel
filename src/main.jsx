import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} 
    appearance={{
      baseTheme: [dark]
    }}
    afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)

// // 

// <style>
// .libutton {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 7px;
//   text-align: center;
//   outline: none;
//   text-decoration: none !important;
//   color: #ffffff !important;
//   width: 200px;
//   height: 32px;
//   border-radius: 16px;
//   background-color: #0A66C2;
//   font-family: "SF Pro Text", Helvetica, sans-serif;
// }
// </style>
// <a class="libutton" href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=akseer" target="_blank">Follow on LinkedIn</a>