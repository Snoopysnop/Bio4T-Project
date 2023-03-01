import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import SampleComponentsPage from './sample.page-object';
import SampleUpdatePage from './sample-update.page-object';
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

describe('Sample e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sampleComponentsPage: SampleComponentsPage;
  let sampleUpdatePage: SampleUpdatePage;
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
    sampleComponentsPage = new SampleComponentsPage();
    sampleComponentsPage = await sampleComponentsPage.goToPage(navBarPage);
  });

  it('should load Samples', async () => {
    expect(await sampleComponentsPage.title.getText()).to.match(/Samples/);
    expect(await sampleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Samples', async () => {
    const beforeRecordsCount = (await isVisible(sampleComponentsPage.noRecords)) ? 0 : await getRecordsCount(sampleComponentsPage.table);
    sampleUpdatePage = await sampleComponentsPage.goToCreateSample();
    await sampleUpdatePage.enterData();
    expect(await isVisible(sampleUpdatePage.saveButton)).to.be.false;

    expect(await sampleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(sampleComponentsPage.table);
    await waitUntilCount(sampleComponentsPage.records, beforeRecordsCount + 1);
    expect(await sampleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await sampleComponentsPage.deleteSample();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(sampleComponentsPage.records, beforeRecordsCount);
      expect(await sampleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(sampleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
