import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISample } from 'app/shared/model/studyboard/sample.model';
import { getEntities as getSamples } from 'app/entities/studyboard/sample/sample.reducer';
import { IXuser } from 'app/shared/model/studyboard/xuser.model';
import { getEntities as getXusers } from 'app/entities/studyboard/xuser/xuser.reducer';
import { IDash } from 'app/shared/model/studyboard/dash.model';
import { getEntities as getDashes } from 'app/entities/studyboard/dash/dash.reducer';
import { IProject } from 'app/shared/model/studyboard/project.model';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';

export const ProjectUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const samples = useAppSelector(state => state.gateway.sample.entities);
  const xusers = useAppSelector(state => state.gateway.xuser.entities);
  const dashes = useAppSelector(state => state.gateway.dash.entities);
  const projectEntity = useAppSelector(state => state.gateway.project.entity);
  const loading = useAppSelector(state => state.gateway.project.loading);
  const updating = useAppSelector(state => state.gateway.project.updating);
  const updateSuccess = useAppSelector(state => state.gateway.project.updateSuccess);
  const handleClose = () => {
    props.history.push('/project' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSamples({}));
    dispatch(getXusers({}));
    dispatch(getDashes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.creationDate = convertDateTimeToServer(values.creationDate);

    const entity = {
      ...projectEntity,
      ...values,
      samples: mapIdList(values.samples),
      user: xusers.find(it => it.id.toString() === values.user.toString()),
      dash: dashes.find(it => it.id.toString() === values.dash.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          creationDate: displayDefaultDateTime(),
        }
      : {
          ...projectEntity,
          creationDate: convertDateTimeFromServer(projectEntity.creationDate),
          samples: projectEntity?.samples?.map(e => e.id.toString()),
          user: projectEntity?.user?.id,
          dash: projectEntity?.dash?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.studyboardProject.home.createOrEditLabel" data-cy="ProjectCreateUpdateHeading">
            <Translate contentKey="gatewayApp.studyboardProject.home.createOrEditLabel">Create or edit a Project</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="project-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.studyboardProject.name')}
                id="project-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardProject.description')}
                id="project-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardProject.creationDate')}
                id="project-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardProject.sample')}
                id="project-sample"
                data-cy="sample"
                type="select"
                multiple
                name="samples"
              >
                <option value="" key="0" />
                {samples
                  ? samples.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="project-user"
                name="user"
                data-cy="user"
                label={translate('gatewayApp.studyboardProject.user')}
                type="select"
              >
                <option value="" key="0" />
                {xusers
                  ? xusers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="project-dash"
                name="dash"
                data-cy="dash"
                label={translate('gatewayApp.studyboardProject.dash')}
                type="select"
              >
                <option value="" key="0" />
                {dashes
                  ? dashes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/project" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProjectUpdate;
