import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DashComponentsPage from './dash.page-object';
import DashUpdatePage from './dash-update.page-object';
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

describe('Dash e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dashComponentsPage: DashComponentsPage;
  let dashUpdatePage: DashUpdatePage;
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
    dashComponentsPage = new DashComponentsPage();
    dashComponentsPage = await dashComponentsPage.goToPage(navBarPage);
  });

  it('should load Dashes', async () => {
    expect(await dashComponentsPage.title.getText()).to.match(/Dashes/);
    expect(await dashComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Dashes', async () => {
    const beforeRecordsCount = (await isVisible(dashComponentsPage.noRecords)) ? 0 : await getRecordsCount(dashComponentsPage.table);
    dashUpdatePage = await dashComponentsPage.goToCreateDash();
    await dashUpdatePage.enterData();
    expect(await isVisible(dashUpdatePage.saveButton)).to.be.false;

    expect(await dashComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(dashComponentsPage.table);
    await waitUntilCount(dashComponentsPage.records, beforeRecordsCount + 1);
    expect(await dashComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await dashComponentsPage.deleteDash();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(dashComponentsPage.records, beforeRecordsCount);
      expect(await dashComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(dashComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
