import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './xuser.reducer';

export const XuserDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const xuserEntity = useAppSelector(state => state.gateway.xuser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="xuserDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardXuser.detail.title">Xuser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{xuserEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardXuser.name">Name</Translate>
            </span>
          </dt>
          <dd>{xuserEntity.name}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardXuser.group">Group</Translate>
          </dt>
          <dd>
            {xuserEntity.groups
              ? xuserEntity.groups.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {xuserEntity.groups && i === xuserEntity.groups.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/xuser" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/xuser/${xuserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default XuserDetail;
