import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import GenolistComponentsPage from './genolist.page-object';
import GenolistUpdatePage from './genolist-update.page-object';
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

describe('Genolist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genolistComponentsPage: GenolistComponentsPage;
  let genolistUpdatePage: GenolistUpdatePage;
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
    genolistComponentsPage = new GenolistComponentsPage();
    genolistComponentsPage = await genolistComponentsPage.goToPage(navBarPage);
  });

  it('should load Genolists', async () => {
    expect(await genolistComponentsPage.title.getText()).to.match(/Genolists/);
    expect(await genolistComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Genolists', async () => {
    const beforeRecordsCount = (await isVisible(genolistComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(genolistComponentsPage.table);
    genolistUpdatePage = await genolistComponentsPage.goToCreateGenolist();
    await genolistUpdatePage.enterData();
    expect(await isVisible(genolistUpdatePage.saveButton)).to.be.false;

    expect(await genolistComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(genolistComponentsPage.table);
    await waitUntilCount(genolistComponentsPage.records, beforeRecordsCount + 1);
    expect(await genolistComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await genolistComponentsPage.deleteGenolist();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(genolistComponentsPage.records, beforeRecordsCount);
      expect(await genolistComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(genolistComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
