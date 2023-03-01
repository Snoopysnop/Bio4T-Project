import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dataentity from './dataentity';
import DataentityDetail from './dataentity-detail';
import DataentityUpdate from './dataentity-update';
import DataentityDeleteDialog from './dataentity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DataentityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DataentityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DataentityDetail} />
      <ErrorBoundaryRoute path={match.url} component={Dataentity} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DataentityDeleteDialog} />
  </>
);

export default Routes;
