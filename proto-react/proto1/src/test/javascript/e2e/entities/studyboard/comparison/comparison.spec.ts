import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ComparisonComponentsPage from './comparison.page-object';
import ComparisonUpdatePage from './comparison-update.page-object';
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

describe('Comparison e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let comparisonComponentsPage: ComparisonComponentsPage;
  let comparisonUpdatePage: ComparisonUpdatePage;
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
    comparisonComponentsPage = new ComparisonComponentsPage();
    comparisonComponentsPage = await comparisonComponentsPage.goToPage(navBarPage);
  });

  it('should load Comparisons', async () => {
    expect(await comparisonComponentsPage.title.getText()).to.match(/Comparisons/);
    expect(await comparisonComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Comparisons', async () => {
    const beforeRecordsCount = (await isVisible(comparisonComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(comparisonComponentsPage.table);
    comparisonUpdatePage = await comparisonComponentsPage.goToCreateComparison();
    await comparisonUpdatePage.enterData();
    expect(await isVisible(comparisonUpdatePage.saveButton)).to.be.false;

    expect(await comparisonComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(comparisonComponentsPage.table);
    await waitUntilCount(comparisonComponentsPage.records, beforeRecordsCount + 1);
    expect(await comparisonComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await comparisonComponentsPage.deleteComparison();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(comparisonComponentsPage.records, beforeRecordsCount);
      expect(await comparisonComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(comparisonComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
