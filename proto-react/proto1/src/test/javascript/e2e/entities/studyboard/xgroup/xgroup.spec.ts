import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import XgroupComponentsPage from './xgroup.page-object';
import XgroupUpdatePage from './xgroup-update.page-object';
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

describe('Xgroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let xgroupComponentsPage: XgroupComponentsPage;
  let xgroupUpdatePage: XgroupUpdatePage;
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
    xgroupComponentsPage = new XgroupComponentsPage();
    xgroupComponentsPage = await xgroupComponentsPage.goToPage(navBarPage);
  });

  it('should load Xgroups', async () => {
    expect(await xgroupComponentsPage.title.getText()).to.match(/Xgroups/);
    expect(await xgroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Xgroups', async () => {
    const beforeRecordsCount = (await isVisible(xgroupComponentsPage.noRecords)) ? 0 : await getRecordsCount(xgroupComponentsPage.table);
    xgroupUpdatePage = await xgroupComponentsPage.goToCreateXgroup();
    await xgroupUpdatePage.enterData();
    expect(await isVisible(xgroupUpdatePage.saveButton)).to.be.false;

    expect(await xgroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(xgroupComponentsPage.table);
    await waitUntilCount(xgroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await xgroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await xgroupComponentsPage.deleteXgroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(xgroupComponentsPage.records, beforeRecordsCount);
      expect(await xgroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(xgroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
