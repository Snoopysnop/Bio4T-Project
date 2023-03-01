import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import XpermComponentsPage from './xperm.page-object';
import XpermUpdatePage from './xperm-update.page-object';
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

describe('Xperm e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let xpermComponentsPage: XpermComponentsPage;
  let xpermUpdatePage: XpermUpdatePage;
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
    xpermComponentsPage = new XpermComponentsPage();
    xpermComponentsPage = await xpermComponentsPage.goToPage(navBarPage);
  });

  it('should load Xperms', async () => {
    expect(await xpermComponentsPage.title.getText()).to.match(/Xperms/);
    expect(await xpermComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Xperms', async () => {
    const beforeRecordsCount = (await isVisible(xpermComponentsPage.noRecords)) ? 0 : await getRecordsCount(xpermComponentsPage.table);
    xpermUpdatePage = await xpermComponentsPage.goToCreateXperm();
    await xpermUpdatePage.enterData();
    expect(await isVisible(xpermUpdatePage.saveButton)).to.be.false;

    expect(await xpermComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(xpermComponentsPage.table);
    await waitUntilCount(xpermComponentsPage.records, beforeRecordsCount + 1);
    expect(await xpermComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await xpermComponentsPage.deleteXperm();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(xpermComponentsPage.records, beforeRecordsCount);
      expect(await xpermComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(xpermComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
