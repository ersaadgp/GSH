import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './components/Form/route';

import Dev from './components/Spinner';

import pages from './components/pages';
import history from './history';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <AuthRoute exact path="/" component={pages.Home} />
        <AuthRoute
          exact
          path="/project-member/new"
          component={pages.AdmEditMember}
        />
        <AuthRoute exact path="/new-project" component={pages.AdmNewProject} />
        <AuthRoute
          exact
          path="/main-board/:projectId"
          component={pages.MainBoard}
        />
        <AuthRoute
          exact
          path="/product-backlog/:projectId"
          component={pages.ProductBacklog}
        />
        <AuthRoute
          exact
          path="/edit-member/:projectId"
          component={pages.AdmEditMember}
        />
        <AuthRoute
          exact
          path="/sprint-planning/:projectId"
          component={pages.SprintPlanning}
        />
        <AuthRoute
          exact
          path="/retrospective/:projectID/:sprintID"
          component={pages.Retrospective}
        />
        <AuthRoute
          exact
          path="/history"
          component={pages.HistoryProject}
        />
        <AuthRoute
          exact
          path="/history/:projectID"
          component={pages.DetailProject}
        />
        <Route exact path="/login" component={pages.Login} />
        <Route exact path="/register" component={pages.Register} />
        <Route exact path="/dev" component={Dev} />
        <Route path="/not-found" component={pages.NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
