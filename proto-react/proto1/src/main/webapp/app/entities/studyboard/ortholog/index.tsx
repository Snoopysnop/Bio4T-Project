import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Ortholog from './ortholog';
import OrthologDetail from './ortholog-detail';
import OrthologUpdate from './ortholog-update';
import OrthologDeleteDialog from './ortholog-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrthologUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OrthologUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrthologDetail} />
      <ErrorBoundaryRoute path={match.url} component={Ortholog} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OrthologDeleteDialog} />
  </>
);

export default Routes;
