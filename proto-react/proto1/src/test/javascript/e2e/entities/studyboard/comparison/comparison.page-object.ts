import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import ComparisonUpdatePage from './comparison-update.page-object';

const expect = chai.expect;
export class ComparisonDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardComparison.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-comparison'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ComparisonComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('comparison-heading'));
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
    await navBarPage.getEntityPage('comparison');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateComparison() {
    await this.createButton.click();
    return new ComparisonUpdatePage();
  }

  async deleteComparison() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const comparisonDeleteDialog = new ComparisonDeleteDialog();
    await waitUntilDisplayed(comparisonDeleteDialog.deleteModal);
    expect(await comparisonDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardComparison.delete.question/);
    await comparisonDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(comparisonDeleteDialog.deleteModal);

    expect(await isVisible(comparisonDeleteDialog.deleteModal)).to.be.false;
  }
}
