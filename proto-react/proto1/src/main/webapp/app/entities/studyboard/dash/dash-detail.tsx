import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './dash.reducer';

export const DashDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const dashEntity = useAppSelector(state => state.gateway.dash.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dashDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardDash.detail.title">Dash</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{dashEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardDash.name">Name</Translate>
            </span>
          </dt>
          <dd>{dashEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.studyboardDash.description">Description</Translate>
            </span>
          </dt>
          <dd>{dashEntity.description}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardDash.user">User</Translate>
          </dt>
          <dd>{dashEntity.user ? dashEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/dash" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dash/${dashEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DashDetail;
