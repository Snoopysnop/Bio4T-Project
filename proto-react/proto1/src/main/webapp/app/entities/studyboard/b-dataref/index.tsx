import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BDataref from './b-dataref';
import BDatarefDetail from './b-dataref-detail';
import BDatarefUpdate from './b-dataref-update';
import BDatarefDeleteDialog from './b-dataref-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BDatarefUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BDatarefUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BDatarefDetail} />
      <ErrorBoundaryRoute path={match.url} component={BDataref} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BDatarefDeleteDialog} />
  </>
);

export default Routes;
