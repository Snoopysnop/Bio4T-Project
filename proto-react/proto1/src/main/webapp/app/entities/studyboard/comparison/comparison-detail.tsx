import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './comparison.reducer';

export const ComparisonDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const comparisonEntity = useAppSelector(state => state.gateway.comparison.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="comparisonDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardComparison.detail.title">Comparison</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{comparisonEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="gatewayApp.studyboardComparison.title">Title</Translate>
            </span>
          </dt>
          <dd>{comparisonEntity.title}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardComparison.condition">Condition</Translate>
          </dt>
          <dd>
            {comparisonEntity.conditions
              ? comparisonEntity.conditions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {comparisonEntity.conditions && i === comparisonEntity.conditions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardComparison.project">Project</Translate>
          </dt>
          <dd>{comparisonEntity.project ? comparisonEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comparison" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comparison/${comparisonEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ComparisonDetail;
