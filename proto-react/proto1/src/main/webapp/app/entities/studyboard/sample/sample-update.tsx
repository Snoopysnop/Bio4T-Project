import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICondition } from 'app/shared/model/studyboard/condition.model';
import { getEntities as getConditions } from 'app/entities/studyboard/condition/condition.reducer';
import { IProject } from 'app/shared/model/studyboard/project.model';
import { getEntities as getProjects } from 'app/entities/studyboard/project/project.reducer';
import { ISample } from 'app/shared/model/studyboard/sample.model';
import { getEntity, updateEntity, createEntity, reset } from './sample.reducer';

export const SampleUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const conditions = useAppSelector(state => state.gateway.condition.entities);
  const projects = useAppSelector(state => state.gateway.project.entities);
  const sampleEntity = useAppSelector(state => state.gateway.sample.entity);
  const loading = useAppSelector(state => state.gateway.sample.loading);
  const updating = useAppSelector(state => state.gateway.sample.updating);
  const updateSuccess = useAppSelector(state => state.gateway.sample.updateSuccess);
  const handleClose = () => {
    props.history.push('/sample' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getConditions({}));
    dispatch(getProjects({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...sampleEntity,
      ...values,
      conditions: mapIdList(values.conditions),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...sampleEntity,
          conditions: sampleEntity?.conditions?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.studyboardSample.home.createOrEditLabel" data-cy="SampleCreateUpdateHeading">
            <Translate contentKey="gatewayApp.studyboardSample.home.createOrEditLabel">Create or edit a Sample</Translate>
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
                  id="sample-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.name')}
                id="sample-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.description')}
                id="sample-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.developmentStage')}
                id="sample-developmentStage"
                name="developmentStage"
                data-cy="developmentStage"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.species')}
                id="sample-species"
                name="species"
                data-cy="species"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.organ')}
                id="sample-organ"
                name="organ"
                data-cy="organ"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.tissues')}
                id="sample-tissues"
                name="tissues"
                data-cy="tissues"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardSample.condition')}
                id="sample-condition"
                data-cy="condition"
                type="select"
                multiple
                name="conditions"
              >
                <option value="" key="0" />
                {conditions
                  ? conditions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sample" replace color="info">
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

export default SampleUpdate;
