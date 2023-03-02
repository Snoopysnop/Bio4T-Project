import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import DataentityUpdatePage from './dataentity-update.page-object';

const expect = chai.expect;
export class DataentityDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardDataentity.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-dataentity'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DataentityComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('dataentity-heading'));
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
    await navBarPage.getEntityPage('dataentity');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDataentity() {
    await this.createButton.click();
    return new DataentityUpdatePage();
  }

  async deleteDataentity() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const dataentityDeleteDialog = new DataentityDeleteDialog();
    await waitUntilDisplayed(dataentityDeleteDialog.deleteModal);
    expect(await dataentityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardDataentity.delete.question/);
    await dataentityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(dataentityDeleteDialog.deleteModal);

    expect(await isVisible(dataentityDeleteDialog.deleteModal)).to.be.false;
  }
}
