import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './b-dataref.reducer';

export const BDatarefDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const bDatarefEntity = useAppSelector(state => state.gateway.bDataref.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bDatarefDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardBDataref.detail.title">BDataref</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bDatarefEntity.id}</dd>
          <dt>
            <span id="reflist">
              <Translate contentKey="gatewayApp.studyboardBDataref.reflist">Reflist</Translate>
            </span>
          </dt>
          <dd>{bDatarefEntity.reflist}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="gatewayApp.studyboardBDataref.date">Date</Translate>
            </span>
          </dt>
          <dd>{bDatarefEntity.date ? <TextFormat value={bDatarefEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/b-dataref" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/b-dataref/${bDatarefEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BDatarefDetail;
