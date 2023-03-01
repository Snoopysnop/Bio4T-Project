import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ProjectComponentsPage from './project.page-object';
import ProjectUpdatePage from './project-update.page-object';
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

describe('Project e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projectComponentsPage: ProjectComponentsPage;
  let projectUpdatePage: ProjectUpdatePage;
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
    projectComponentsPage = new ProjectComponentsPage();
    projectComponentsPage = await projectComponentsPage.goToPage(navBarPage);
  });

  it('should load Projects', async () => {
    expect(await projectComponentsPage.title.getText()).to.match(/Projects/);
    expect(await projectComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Projects', async () => {
    const beforeRecordsCount = (await isVisible(projectComponentsPage.noRecords)) ? 0 : await getRecordsCount(projectComponentsPage.table);
    projectUpdatePage = await projectComponentsPage.goToCreateProject();
    await projectUpdatePage.enterData();
    expect(await isVisible(projectUpdatePage.saveButton)).to.be.false;

    expect(await projectComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(projectComponentsPage.table);
    await waitUntilCount(projectComponentsPage.records, beforeRecordsCount + 1);
    expect(await projectComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await projectComponentsPage.deleteProject();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(projectComponentsPage.records, beforeRecordsCount);
      expect(await projectComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(projectComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
