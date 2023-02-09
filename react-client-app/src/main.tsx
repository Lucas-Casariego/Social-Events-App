import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/layout/App'
import './App/Layout/styles.css'
import { store, StoreContext } from './App/stores/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // im wrapping my app in <> and not in <React.StrictMode> because StrictMode is duplicating things (the context ?)
  // <React.StrictMode>
  // </React.StrictMode>
  <>
  {/* we are providing our context to our application, and it has our store inside value (value={store})  */}
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
</>
)
