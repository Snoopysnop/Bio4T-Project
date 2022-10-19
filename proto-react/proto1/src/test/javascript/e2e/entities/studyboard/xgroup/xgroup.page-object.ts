import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import XgroupUpdatePage from './xgroup-update.page-object';

const expect = chai.expect;
export class XgroupDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardXgroup.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-xgroup'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class XgroupComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('xgroup-heading'));
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
    await navBarPage.getEntityPage('xgroup');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateXgroup() {
    await this.createButton.click();
    return new XgroupUpdatePage();
  }

  async deleteXgroup() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const xgroupDeleteDialog = new XgroupDeleteDialog();
    await waitUntilDisplayed(xgroupDeleteDialog.deleteModal);
    expect(await xgroupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardXgroup.delete.question/);
    await xgroupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(xgroupDeleteDialog.deleteModal);

    expect(await isVisible(xgroupDeleteDialog.deleteModal)).to.be.false;
  }
}
