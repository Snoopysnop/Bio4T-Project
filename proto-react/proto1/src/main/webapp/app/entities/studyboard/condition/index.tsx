import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Condition from './condition';
import ConditionDetail from './condition-detail';
import ConditionUpdate from './condition-update';
import ConditionDeleteDialog from './condition-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConditionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConditionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConditionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Condition} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConditionDeleteDialog} />
  </>
);

export default Routes;
