import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Xgroup from './xgroup';
import XgroupDetail from './xgroup-detail';
import XgroupUpdate from './xgroup-update';
import XgroupDeleteDialog from './xgroup-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={XgroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={XgroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={XgroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={Xgroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={XgroupDeleteDialog} />
  </>
);

export default Routes;
