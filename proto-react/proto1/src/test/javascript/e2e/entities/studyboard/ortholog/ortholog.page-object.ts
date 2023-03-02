import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import OrthologUpdatePage from './ortholog-update.page-object';

const expect = chai.expect;
export class OrthologDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardOrtholog.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-ortholog'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OrthologComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ortholog-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('ortholog');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOrtholog() {
    await this.createButton.click();
    return new OrthologUpdatePage();
  }

  async deleteOrtholog() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const orthologDeleteDialog = new OrthologDeleteDialog();
    await waitUntilDisplayed(orthologDeleteDialog.deleteModal);
    expect(await orthologDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardOrtholog.delete.question/);
    await orthologDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(orthologDeleteDialog.deleteModal);

    expect(await isVisible(orthologDeleteDialog.deleteModal)).to.be.false;
  }
}
