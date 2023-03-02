import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import ConditionUpdatePage from './condition-update.page-object';

const expect = chai.expect;
export class ConditionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardCondition.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-condition'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ConditionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('condition-heading'));
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
    await navBarPage.getEntityPage('condition');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCondition() {
    await this.createButton.click();
    return new ConditionUpdatePage();
  }

  async deleteCondition() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const conditionDeleteDialog = new ConditionDeleteDialog();
    await waitUntilDisplayed(conditionDeleteDialog.deleteModal);
    expect(await conditionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardCondition.delete.question/);
    await conditionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(conditionDeleteDialog.deleteModal);

    expect(await isVisible(conditionDeleteDialog.deleteModal)).to.be.false;
  }
}
