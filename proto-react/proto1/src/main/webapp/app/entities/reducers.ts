import dataentity from 'app/entities/studyboard/dataentity/dataentity.reducer';
import sample from 'app/entities/studyboard/sample/sample.reducer';
import ortholog from 'app/entities/studyboard/ortholog/ortholog.reducer';
import project from 'app/entities/studyboard/project/project.reducer';
import bDataref from 'app/entities/studyboard/b-dataref/b-dataref.reducer';
import xgroup from 'app/entities/studyboard/xgroup/xgroup.reducer';
import comparison from 'app/entities/studyboard/comparison/comparison.reducer';
import dash from 'app/entities/studyboard/dash/dash.reducer';
import xperm from 'app/entities/studyboard/xperm/xperm.reducer';
import genolist from 'app/entities/studyboard/genolist/genolist.reducer';
import xuser from 'app/entities/studyboard/xuser/xuser.reducer';
import condition from 'app/entities/studyboard/condition/condition.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  dataentity,
  sample,
  ortholog,
  project,
  bDataref,
  xgroup,
  comparison,
  dash,
  xperm,
  genolist,
  xuser,
  condition,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
