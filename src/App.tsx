import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

   function App() {
  return <RouterProvider router={router} />;
}

export default App;
