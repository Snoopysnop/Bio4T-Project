import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Sample from './sample';
import SampleDetail from './sample-detail';
import SampleUpdate from './sample-update';
import SampleDeleteDialog from './sample-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SampleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SampleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SampleDetail} />
      <ErrorBoundaryRoute path={match.url} component={Sample} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SampleDeleteDialog} />
  </>
);

export default Routes;
