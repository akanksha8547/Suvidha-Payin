import React from 'react'
import { Routes as Switch, Route, BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import PrivateRoute from './PrivateRoute';
import Login from '../Component/Login';
function AllRoute() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path={Routes.LOGIN} element={<Login />} />
        </>
        <>
        <Route exact path={Routes.MAIN} element={<PrivateRoute />} />
        </>
      </Switch>
    </BrowserRouter>
  </>
  )
}

export default AllRoute