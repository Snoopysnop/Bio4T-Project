import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IComparison } from 'app/shared/model/studyboard/comparison.model';
import { getEntities as getComparisons } from 'app/entities/studyboard/comparison/comparison.reducer';
import { IGenolist } from 'app/shared/model/studyboard/genolist.model';
import { getEntity, updateEntity, createEntity, reset } from './genolist.reducer';

export const GenolistUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const comparisons = useAppSelector(state => state.gateway.comparison.entities);
  const genolistEntity = useAppSelector(state => state.gateway.genolist.entity);
  const loading = useAppSelector(state => state.gateway.genolist.loading);
  const updating = useAppSelector(state => state.gateway.genolist.updating);
  const updateSuccess = useAppSelector(state => state.gateway.genolist.updateSuccess);
  const handleClose = () => {
    props.history.push('/genolist' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getComparisons({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.creationDate = convertDateTimeToServer(values.creationDate);

    const entity = {
      ...genolistEntity,
      ...values,
      comparison: comparisons.find(it => it.id.toString() === values.comparison.toString()),
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
          ...genolistEntity,
          creationDate: convertDateTimeFromServer(genolistEntity.creationDate),
          comparison: genolistEntity?.comparison?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.studyboardGenolist.home.createOrEditLabel" data-cy="GenolistCreateUpdateHeading">
            <Translate contentKey="gatewayApp.studyboardGenolist.home.createOrEditLabel">Create or edit a Genolist</Translate>
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
                  id="genolist-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.studyboardGenolist.title')}
                id="genolist-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardGenolist.memberCount')}
                id="genolist-memberCount"
                name="memberCount"
                data-cy="memberCount"
                type="text"
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardGenolist.creationDate')}
                id="genolist-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="genolist-comparison"
                name="comparison"
                data-cy="comparison"
                label={translate('gatewayApp.studyboardGenolist.comparison')}
                type="select"
              >
                <option value="" key="0" />
                {comparisons
                  ? comparisons.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/genolist" replace color="info">
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

export default GenolistUpdate;
