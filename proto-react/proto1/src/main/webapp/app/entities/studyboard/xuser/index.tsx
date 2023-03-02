import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Xuser from './xuser';
import XuserDetail from './xuser-detail';
import XuserUpdate from './xuser-update';
import XuserDeleteDialog from './xuser-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={XuserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={XuserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={XuserDetail} />
      <ErrorBoundaryRoute path={match.url} component={Xuser} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={XuserDeleteDialog} />
  </>
);

export default Routes;
