import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuthContext from "./hooks/UseAuthContext";

const App = () => {
  const [showType, setShowType] = useState("table");
  const showChange = (type) => {
    setShowType(type);
  };
  const { user } = useAuthContext();

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/books" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/books" />}
        />
        <Route path="/" element={!user ? <Home /> : <Navigate to="/books" />} />
        <Route
          path="/books"
          element={
            user ? (
              <Books showType={showType} showChange={showChange} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/books/create"
          element={user ? <CreateBook /> : <Navigate to="/" />}
        />
        <Route
          path="/books/details/:id"
          element={user ? <ShowBook /> : <Navigate to="/" />}
        />
        <Route
          path="/books/edit/:id"
          element={user ? <EditBook /> : <Navigate to="/" />}
        />
        <Route
          path="/books/delete/:id"
          element={user ? <DeleteBook /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
