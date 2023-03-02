import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IXuser } from 'app/shared/model/studyboard/xuser.model';
import { getEntities as getXusers } from 'app/entities/studyboard/xuser/xuser.reducer';
import { IDataentity } from 'app/shared/model/studyboard/dataentity.model';
import { getEntity, updateEntity, createEntity, reset } from './dataentity.reducer';

export const DataentityUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const xusers = useAppSelector(state => state.gateway.xuser.entities);
  const dataentityEntity = useAppSelector(state => state.gateway.dataentity.entity);
  const loading = useAppSelector(state => state.gateway.dataentity.loading);
  const updating = useAppSelector(state => state.gateway.dataentity.updating);
  const updateSuccess = useAppSelector(state => state.gateway.dataentity.updateSuccess);
  const handleClose = () => {
    props.history.push('/dataentity' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getXusers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...dataentityEntity,
      ...values,
      user: xusers.find(it => it.id.toString() === values.user.toString()),
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
          ...dataentityEntity,
          user: dataentityEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.studyboardDataentity.home.createOrEditLabel" data-cy="DataentityCreateUpdateHeading">
            <Translate contentKey="gatewayApp.studyboardDataentity.home.createOrEditLabel">Create or edit a Dataentity</Translate>
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
                  id="dataentity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.studyboardDataentity.name')}
                id="dataentity-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.studyboardDataentity.dtype')}
                id="dataentity-dtype"
                name="dtype"
                data-cy="dtype"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="dataentity-user"
                name="user"
                data-cy="user"
                label={translate('gatewayApp.studyboardDataentity.user')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/dataentity" replace color="info">
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

export default DataentityUpdate;
