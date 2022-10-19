import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project.reducer';

export const ProjectDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectEntity = useAppSelector(state => state.gateway.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">
          <Translate contentKey="gatewayApp.studyboardProject.detail.title">Project</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.studyboardProject.name">Name</Translate>
            </span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.studyboardProject.description">Description</Translate>
            </span>
          </dt>
          <dd>{projectEntity.description}</dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="gatewayApp.studyboardProject.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {projectEntity.creationDate ? <TextFormat value={projectEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardProject.sample">Sample</Translate>
          </dt>
          <dd>
            {projectEntity.samples
              ? projectEntity.samples.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {projectEntity.samples && i === projectEntity.samples.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardProject.user">User</Translate>
          </dt>
          <dd>{projectEntity.user ? projectEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.studyboardProject.dash">Dash</Translate>
          </dt>
          <dd>{projectEntity.dash ? projectEntity.dash.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
