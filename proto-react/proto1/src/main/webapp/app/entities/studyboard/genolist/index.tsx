import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Genolist from './genolist';
import GenolistDetail from './genolist-detail';
import GenolistUpdate from './genolist-update';
import GenolistDeleteDialog from './genolist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GenolistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GenolistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GenolistDetail} />
      <ErrorBoundaryRoute path={match.url} component={Genolist} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GenolistDeleteDialog} />
  </>
);

export default Routes;
