import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Comparison from './comparison';
import ComparisonDetail from './comparison-detail';
import ComparisonUpdate from './comparison-update';
import ComparisonDeleteDialog from './comparison-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComparisonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComparisonUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComparisonDetail} />
      <ErrorBoundaryRoute path={match.url} component={Comparison} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ComparisonDeleteDialog} />
  </>
);

export default Routes;
