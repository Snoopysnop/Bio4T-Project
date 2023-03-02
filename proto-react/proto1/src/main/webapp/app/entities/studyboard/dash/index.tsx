import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dash from './dash';
import DashDetail from './dash-detail';
import DashUpdate from './dash-update';
import DashDeleteDialog from './dash-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DashUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DashUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DashDetail} />
      <ErrorBoundaryRoute path={match.url} component={Dash} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DashDeleteDialog} />
  </>
);

export default Routes;
