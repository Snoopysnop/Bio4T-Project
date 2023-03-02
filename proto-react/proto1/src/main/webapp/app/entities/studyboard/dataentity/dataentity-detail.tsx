import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './dataentity.reducer';

export const DataentityDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const dataentityEntity = useAppSelector(state => state.gateway.dataentity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dataentityDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardDataentity.detail.title">Dataentity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{dataentityEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardDataentity.name">Name</Translate>
            </span>
          </dt>
          <dd>{dataentityEntity.name}</dd>
          <dt>
            <span id="dtype">
              <Translate contentKey="gatewayApp.studyboardDataentity.dtype">Dtype</Translate>
            </span>
          </dt>
          <dd>{dataentityEntity.dtype}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardDataentity.user">User</Translate>
          </dt>
          <dd>{dataentityEntity.user ? dataentityEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/dataentity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dataentity/${dataentityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DataentityDetail;
