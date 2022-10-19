import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ConditionComponentsPage from './condition.page-object';
import ConditionUpdatePage from './condition-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';

const expect = chai.expect;

describe('Condition e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let conditionComponentsPage: ConditionComponentsPage;
  let conditionUpdatePage: ConditionUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth(username, password);
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    conditionComponentsPage = new ConditionComponentsPage();
    conditionComponentsPage = await conditionComponentsPage.goToPage(navBarPage);
  });

  it('should load Conditions', async () => {
    expect(await conditionComponentsPage.title.getText()).to.match(/Conditions/);
    expect(await conditionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Conditions', async () => {
    const beforeRecordsCount = (await isVisible(conditionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(conditionComponentsPage.table);
    conditionUpdatePage = await conditionComponentsPage.goToCreateCondition();
    await conditionUpdatePage.enterData();
    expect(await isVisible(conditionUpdatePage.saveButton)).to.be.false;

    expect(await conditionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(conditionComponentsPage.table);
    await waitUntilCount(conditionComponentsPage.records, beforeRecordsCount + 1);
    expect(await conditionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await conditionComponentsPage.deleteCondition();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(conditionComponentsPage.records, beforeRecordsCount);
      expect(await conditionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(conditionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
