import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sample.reducer';

export const SampleDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const sampleEntity = useAppSelector(state => state.gateway.sample.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sampleDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardSample.detail.title">Sample</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardSample.name">Name</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.studyboardSample.description">Description</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.description}</dd>
          <dt>
            <span id="developmentStage">
              <Translate contentKey="gatewayApp.studyboardSample.developmentStage">Development Stage</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.developmentStage}</dd>
          <dt>
            <span id="species">
              <Translate contentKey="gatewayApp.studyboardSample.species">Species</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.species}</dd>
          <dt>
            <span id="organ">
              <Translate contentKey="gatewayApp.studyboardSample.organ">Organ</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.organ}</dd>
          <dt>
            <span id="tissues">
              <Translate contentKey="gatewayApp.studyboardSample.tissues">Tissues</Translate>
            </span>
          </dt>
          <dd>{sampleEntity.tissues}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardSample.condition">Condition</Translate>
          </dt>
          <dd>
            {sampleEntity.conditions
              ? sampleEntity.conditions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {sampleEntity.conditions && i === sampleEntity.conditions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/sample" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sample/${sampleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SampleDetail;
