import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import * as router from "react-router-dom";

import {
  AppAside,
  // AppHeader,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// routes config
import routes from "../../routes";

// const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

const nav = {
  items: [
    {
      title: true,
      name: 'Idaho Surf Report',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Home",
      url: "/",
      icon: "icon-home",
    },
    {
      name: 'Waves',
      icon: 'icon-chart',
      children: [
        {
          name: "Boise",
          url: "/wave/13206000",
          icon: "icon-globe",
        },
        {
          name: "Cascade",
          url: "/wave/13246000",
          icon: "icon-globe",
        },
        {
          name: "Lochsa",
          url: "/wave/13337000",
          icon: "icon-globe",
        },
        {
          name: "Horseshoe",
          url: "/wave/13247500",
          icon: "icon-globe",
        },
      ]
    },
    {
      name: "Search",
      url: "/search/id",
      icon: "icon-magnifier",
    },
  ],
};

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="app">
        <div className="app-body ">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={nav} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main mt-4">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
