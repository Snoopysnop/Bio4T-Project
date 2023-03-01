import React from 'react';
import { Switch } from 'react-router-dom';
import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import getStore from 'app/config/store';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import entitiesReducers from './reducers';

import Dataentity from './studyboard/dataentity';
import Sample from './studyboard/sample';
import Ortholog from './studyboard/ortholog';
import Project from './studyboard/project';
import BDataref from './studyboard/b-dataref';
import Xgroup from './studyboard/xgroup';
import Comparison from './studyboard/comparison';
import Dash from './studyboard/dash';
import Xperm from './studyboard/xperm';
import Genolist from './studyboard/genolist';
import Xuser from './studyboard/xuser';
import Condition from './studyboard/condition';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  const store = getStore();
  store.injectReducer('gateway', combineReducers(entitiesReducers as ReducersMapObject));
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}dataentity`} component={Dataentity} />
        <ErrorBoundaryRoute path={`${match.url}sample`} component={Sample} />
        <ErrorBoundaryRoute path={`${match.url}ortholog`} component={Ortholog} />
        <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
        <ErrorBoundaryRoute path={`${match.url}b-dataref`} component={BDataref} />
        <ErrorBoundaryRoute path={`${match.url}xgroup`} component={Xgroup} />
        <ErrorBoundaryRoute path={`${match.url}comparison`} component={Comparison} />
        <ErrorBoundaryRoute path={`${match.url}dash`} component={Dash} />
        <ErrorBoundaryRoute path={`${match.url}xperm`} component={Xperm} />
        <ErrorBoundaryRoute path={`${match.url}genolist`} component={Genolist} />
        <ErrorBoundaryRoute path={`${match.url}xuser`} component={Xuser} />
        <ErrorBoundaryRoute path={`${match.url}condition`} component={Condition} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
