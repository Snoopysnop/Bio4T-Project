import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import OrthologComponentsPage from './ortholog.page-object';
import OrthologUpdatePage from './ortholog-update.page-object';
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

describe('Ortholog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orthologComponentsPage: OrthologComponentsPage;
  let orthologUpdatePage: OrthologUpdatePage;
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
    orthologComponentsPage = new OrthologComponentsPage();
    orthologComponentsPage = await orthologComponentsPage.goToPage(navBarPage);
  });

  it('should load Orthologs', async () => {
    expect(await orthologComponentsPage.title.getText()).to.match(/Orthologs/);
    expect(await orthologComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Orthologs', async () => {
    const beforeRecordsCount = (await isVisible(orthologComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(orthologComponentsPage.table);
    orthologUpdatePage = await orthologComponentsPage.goToCreateOrtholog();
    await orthologUpdatePage.enterData();
    expect(await isVisible(orthologUpdatePage.saveButton)).to.be.false;

    expect(await orthologComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(orthologComponentsPage.table);
    await waitUntilCount(orthologComponentsPage.records, beforeRecordsCount + 1);
    expect(await orthologComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await orthologComponentsPage.deleteOrtholog();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(orthologComponentsPage.records, beforeRecordsCount);
      expect(await orthologComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(orthologComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
