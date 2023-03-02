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
import { IComparison } from 'app/shared/model/studyboard/comparison.model';
import { getEntity, updateEntity, createEntity, reset } from './comparison.reducer';

export const ComparisonUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const conditions = useAppSelector(state => state.gateway.condition.entities);
  const projects = useAppSelector(state => state.gateway.project.entities);
  const comparisonEntity = useAppSelector(state => state.gateway.comparison.entity);
  const loading = useAppSelector(state => state.gateway.comparison.loading);
  const updating = useAppSelector(state => state.gateway.comparison.updating);
  const updateSuccess = useAppSelector(state => state.gateway.comparison.updateSuccess);
  const handleClose = () => {
    props.history.push('/comparison' + props.location.search);
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
      ...comparisonEntity,
      ...values,
      conditions: mapIdList(values.conditions),
      project: projects.find(it => it.id.toString() === values.project.toString()),
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
          ...comparisonEntity,
          conditions: comparisonEntity?.conditions?.map(e => e.id.toString()),
          project: comparisonEntity?.project?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.studyboardComparison.home.createOrEditLabel" data-cy="ComparisonCreateUpdateHeading">
            <Translate contentKey="gatewayApp.studyboardComparison.home.createOrEditLabel">Create or edit a Comparison</Translate>
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
                  id="comparison-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.studyboardComparison.title')}
                id="comparison-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardComparison.condition')}
                id="comparison-condition"
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
              <ValidatedField
                id="comparison-project"
                name="project"
                data-cy="project"
                label={translate('gatewayApp.studyboardComparison.project')}
                type="select"
              >
                <option value="" key="0" />
                {projects
                  ? projects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/comparison" replace color="info">
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

export default ComparisonUpdate;
