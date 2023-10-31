import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {
  const { isAuth } = useTypedSelector((state) => state.auth);

  return isAuth ? (
    <>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          ></Route>
        ))}
      </Routes>
      <Navigate to="/" />
    </>
  ) : (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          ></Route>
        ))}
      </Routes>
      <Navigate to="/login" />
    </>
  );
};

export default AppRouter;
