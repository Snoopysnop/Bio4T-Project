import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import DataentityComponentsPage from './dataentity.page-object';
import DataentityUpdatePage from './dataentity-update.page-object';
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

describe('Dataentity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dataentityComponentsPage: DataentityComponentsPage;
  let dataentityUpdatePage: DataentityUpdatePage;
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
    dataentityComponentsPage = new DataentityComponentsPage();
    dataentityComponentsPage = await dataentityComponentsPage.goToPage(navBarPage);
  });

  it('should load Dataentities', async () => {
    expect(await dataentityComponentsPage.title.getText()).to.match(/Dataentities/);
    expect(await dataentityComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Dataentities', async () => {
    const beforeRecordsCount = (await isVisible(dataentityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(dataentityComponentsPage.table);
    dataentityUpdatePage = await dataentityComponentsPage.goToCreateDataentity();
    await dataentityUpdatePage.enterData();
    expect(await isVisible(dataentityUpdatePage.saveButton)).to.be.false;

    expect(await dataentityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(dataentityComponentsPage.table);
    await waitUntilCount(dataentityComponentsPage.records, beforeRecordsCount + 1);
    expect(await dataentityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await dataentityComponentsPage.deleteDataentity();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(dataentityComponentsPage.records, beforeRecordsCount);
      expect(await dataentityComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(dataentityComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
