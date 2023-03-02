import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import BDatarefUpdatePage from './b-dataref-update.page-object';

const expect = chai.expect;
export class BDatarefDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardBDataref.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bDataref'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BDatarefComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('b-dataref-heading'));
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
    await navBarPage.getEntityPage('b-dataref');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBDataref() {
    await this.createButton.click();
    return new BDatarefUpdatePage();
  }

  async deleteBDataref() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bDatarefDeleteDialog = new BDatarefDeleteDialog();
    await waitUntilDisplayed(bDatarefDeleteDialog.deleteModal);
    expect(await bDatarefDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardBDataref.delete.question/);
    await bDatarefDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bDatarefDeleteDialog.deleteModal);

    expect(await isVisible(bDatarefDeleteDialog.deleteModal)).to.be.false;
  }
}
