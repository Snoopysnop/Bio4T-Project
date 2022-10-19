import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import SampleUpdatePage from './sample-update.page-object';

const expect = chai.expect;
export class SampleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardSample.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-sample'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SampleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('sample-heading'));
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
    await navBarPage.getEntityPage('sample');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSample() {
    await this.createButton.click();
    return new SampleUpdatePage();
  }

  async deleteSample() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const sampleDeleteDialog = new SampleDeleteDialog();
    await waitUntilDisplayed(sampleDeleteDialog.deleteModal);
    expect(await sampleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardSample.delete.question/);
    await sampleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(sampleDeleteDialog.deleteModal);

    expect(await isVisible(sampleDeleteDialog.deleteModal)).to.be.false;
  }
}
