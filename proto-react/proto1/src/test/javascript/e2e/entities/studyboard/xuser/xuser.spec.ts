import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import XuserComponentsPage from './xuser.page-object';
import XuserUpdatePage from './xuser-update.page-object';
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

describe('Xuser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let xuserComponentsPage: XuserComponentsPage;
  let xuserUpdatePage: XuserUpdatePage;
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
    xuserComponentsPage = new XuserComponentsPage();
    xuserComponentsPage = await xuserComponentsPage.goToPage(navBarPage);
  });

  it('should load Xusers', async () => {
    expect(await xuserComponentsPage.title.getText()).to.match(/Xusers/);
    expect(await xuserComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Xusers', async () => {
    const beforeRecordsCount = (await isVisible(xuserComponentsPage.noRecords)) ? 0 : await getRecordsCount(xuserComponentsPage.table);
    xuserUpdatePage = await xuserComponentsPage.goToCreateXuser();
    await xuserUpdatePage.enterData();
    expect(await isVisible(xuserUpdatePage.saveButton)).to.be.false;

    expect(await xuserComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(xuserComponentsPage.table);
    await waitUntilCount(xuserComponentsPage.records, beforeRecordsCount + 1);
    expect(await xuserComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await xuserComponentsPage.deleteXuser();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(xuserComponentsPage.records, beforeRecordsCount);
      expect(await xuserComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(xuserComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
