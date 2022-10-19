import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/dataentity">
        <Translate contentKey="global.menu.entities.studyboardDataentity" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/sample">
        <Translate contentKey="global.menu.entities.studyboardSample" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ortholog">
        <Translate contentKey="global.menu.entities.studyboardOrtholog" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/project">
        <Translate contentKey="global.menu.entities.studyboardProject" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/b-dataref">
        <Translate contentKey="global.menu.entities.studyboardBDataref" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/xgroup">
        <Translate contentKey="global.menu.entities.studyboardXgroup" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/comparison">
        <Translate contentKey="global.menu.entities.studyboardComparison" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/dash">
        <Translate contentKey="global.menu.entities.studyboardDash" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/xperm">
        <Translate contentKey="global.menu.entities.studyboardXperm" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/genolist">
        <Translate contentKey="global.menu.entities.studyboardGenolist" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/xuser">
        <Translate contentKey="global.menu.entities.studyboardXuser" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/condition">
        <Translate contentKey="global.menu.entities.studyboardCondition" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu as React.ComponentType<any>;
