import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Xperm from './xperm';
import XpermDetail from './xperm-detail';
import XpermUpdate from './xperm-update';
import XpermDeleteDialog from './xperm-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={XpermUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={XpermUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={XpermDetail} />
      <ErrorBoundaryRoute path={match.url} component={Xperm} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={XpermDeleteDialog} />
  </>
);

export default Routes;
