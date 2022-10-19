import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './genolist.reducer';

export const GenolistDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const genolistEntity = useAppSelector(state => state.gateway.genolist.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="genolistDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardGenolist.detail.title">Genolist</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{genolistEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="gatewayApp.studyboardGenolist.title">Title</Translate>
            </span>
          </dt>
          <dd>{genolistEntity.title}</dd>
          <dt>
            <span id="memberCount">
              <Translate contentKey="gatewayApp.studyboardGenolist.memberCount">Member Count</Translate>
            </span>
          </dt>
          <dd>{genolistEntity.memberCount}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="gatewayApp.studyboardGenolist.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {genolistEntity.creationDate ? <TextFormat value={genolistEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardGenolist.comparison">Comparison</Translate>
          </dt>
          <dd>{genolistEntity.comparison ? genolistEntity.comparison.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/genolist" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/genolist/${genolistEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GenolistDetail;
