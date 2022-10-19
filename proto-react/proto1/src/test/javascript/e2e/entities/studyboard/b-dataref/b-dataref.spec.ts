import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import BDatarefComponentsPage from './b-dataref.page-object';
import BDatarefUpdatePage from './b-dataref-update.page-object';
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

describe('BDataref e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bDatarefComponentsPage: BDatarefComponentsPage;
  let bDatarefUpdatePage: BDatarefUpdatePage;
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
    bDatarefComponentsPage = new BDatarefComponentsPage();
    bDatarefComponentsPage = await bDatarefComponentsPage.goToPage(navBarPage);
  });

  it('should load BDatarefs', async () => {
    expect(await bDatarefComponentsPage.title.getText()).to.match(/B Datarefs/);
    expect(await bDatarefComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BDatarefs', async () => {
    const beforeRecordsCount = (await isVisible(bDatarefComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bDatarefComponentsPage.table);
    bDatarefUpdatePage = await bDatarefComponentsPage.goToCreateBDataref();
    await bDatarefUpdatePage.enterData();
    expect(await isVisible(bDatarefUpdatePage.saveButton)).to.be.false;

    expect(await bDatarefComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bDatarefComponentsPage.table);
    await waitUntilCount(bDatarefComponentsPage.records, beforeRecordsCount + 1);
    expect(await bDatarefComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bDatarefComponentsPage.deleteBDataref();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bDatarefComponentsPage.records, beforeRecordsCount);
      expect(await bDatarefComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bDatarefComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
