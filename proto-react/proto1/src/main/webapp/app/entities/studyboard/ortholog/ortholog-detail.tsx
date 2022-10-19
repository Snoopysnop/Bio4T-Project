import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ortholog.reducer';

export const OrthologDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const orthologEntity = useAppSelector(state => state.gateway.ortholog.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orthologDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardOrtholog.detail.title">Ortholog</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orthologEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardOrtholog.name">Name</Translate>
            </span>
          </dt>
          <dd>{orthologEntity.name}</dd>
          <dt>
            <span id="source">
              <Translate contentKey="gatewayApp.studyboardOrtholog.source">Source</Translate>
            </span>
          </dt>
          <dd>{orthologEntity.source}</dd>
          <dt>
            <span id="aliasList">
              <Translate contentKey="gatewayApp.studyboardOrtholog.aliasList">Alias List</Translate>
            </span>
          </dt>
          <dd>{orthologEntity.aliasList}</dd>
        </dl>
        <Button tag={Link} to="/ortholog" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ortholog/${orthologEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrthologDetail;
