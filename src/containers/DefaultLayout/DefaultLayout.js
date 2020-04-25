import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppHeader,
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

const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      navConfig: null,
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  // signOut(e) {
  //   e.preventDefault();
  //   this.props.history.push("/login");
  // }

  buildSideNav() {
    let static_nav_items = [
      {
        title: true,
        name: "Idaho Waves",
        wrapper: {
          element: "",
          attributes: {},
        },
      },
    ];
    let api_target =
      process.env.NODE_ENV === "development" ? "http://127.0.0.1:9999" : "";
    let fetch_path = api_target + "/api/sites/getinfo";
    fetch(fetch_path)
      .then((res) => res.json())
      .then((result) => {
        let site_nav_items = result.map((record) => {
          let d = {
            name: record["name"],
            url: "/wave/" + record["site_id"],
            icon: "icon-star",
          };
          return d;
        });
        this.setState({
          isLoading: false,
          navConfig: { items: [...static_nav_items, ...site_nav_items] },
        });
      });
  }

  componentDidMount() {
    this.buildSideNav();
  }

  render() {
    return (
      <div className="app">
        <AppHeader>
          <Suspense fallback={this.loading()}>
            {!this.state.isLoading && (
              <DefaultHeader nav={this.state.navConfig} />
            )}
          </Suspense>
        </AppHeader>
        <div className="app-body ">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              {!this.state.isLoading && (
                <AppSidebarNav
                  navConfig={this.state.navConfig}
                  {...this.props}
                  router={router}
                />
              )}
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
