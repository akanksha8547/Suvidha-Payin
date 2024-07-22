import { Routes as Switch, Route } from "react-router-dom";
import Routes from "./Routes";
import { useState } from "react";

import Layout from "../Component/Layout/Layout";
import Dashboard from "../Component/Dashboard";
import AddFund from "../Component/AddFund";
import Settlement from "../Component/Settlement";
import PayinRequest from "../Component/PayinRequest";
import PayinReport from "../Component/PayinReport";
import Reports from "../Component/Reports";
import APILogsReport from "../Component/APILogsReport";
import APICredentials from "../Component/APICredentials";
import Analytics from "../Component/Analytics";

export default function PrivateRoute() {
  const [navigationPage, setNavigationPage] = useState("Dashboard");
  
  return (
    <>
      <Switch>
        <Route path={Routes.COMMON} element={<Layout />}>
          <Route index exact path={Routes.DASHBOARD} element={<Dashboard navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.ADDFUND} element={<AddFund navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.SETTLEMENT} element={<Settlement navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.PAYINREQUEST} element={<PayinRequest navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.PAYINREPORT} element={<PayinReport navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.REPORTS} element={<Reports navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.APILOGSREPORT} element={<APILogsReport navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.APICREDENTIALS} element={<APICredentials navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
          <Route index exact path={Routes.ANALYTICS} element={<Analytics navigationPage={navigationPage} setNavigationPage={setNavigationPage} />} />
        </Route>
      </Switch>
    </>
  );
}
