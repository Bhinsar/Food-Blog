import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layout/defaultLayout";
import MyRecipe from "./pages/MyRecipe";
import Favorite from "./pages/Favorite";
import PrivateRoute from "./PrivateRoute";
import { useEffect, useState } from "react";
import AddRecipe from "./pages/AddReipe";
import EditRecipe from "./pages/EditRecipe";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/myrecipe"
          element={
            <DefaultLayout>
              <PrivateRoute token={token} component={MyRecipe} />
            </DefaultLayout>
          }
        />
        <Route
          path="/favorite"
          element={
            <DefaultLayout>
              <PrivateRoute token={token} component={Favorite} />
            </DefaultLayout>
          }
        />
        <Route
          path="/addrecipe"
          element={
            <DefaultLayout>
              <PrivateRoute token={token} component={AddRecipe} />
            </DefaultLayout>
          }
        />
        <Route
          path="/editRecipe/:id"
          element={
            <DefaultLayout>
              <PrivateRoute token={token} component={EditRecipe} />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
