import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.min.css";
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App/Layout/styles.css';
import { router } from './App/router/Routes'
import { store, StoreContext } from './App/stores/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // im wrapping my app in <> and not in <React.StrictMode> because StrictMode is duplicating things (the context ?)
  // <React.StrictMode>
  // </React.StrictMode>
  <>
    {/* we are providing our context to our application, and it has our store inside value (value={store})  */}
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </>
)
