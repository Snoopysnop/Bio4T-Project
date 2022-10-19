import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import XpermUpdatePage from './xperm-update.page-object';

const expect = chai.expect;
export class XpermDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardXperm.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-xperm'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class XpermComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('xperm-heading'));
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
    await navBarPage.getEntityPage('xperm');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateXperm() {
    await this.createButton.click();
    return new XpermUpdatePage();
  }

  async deleteXperm() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const xpermDeleteDialog = new XpermDeleteDialog();
    await waitUntilDisplayed(xpermDeleteDialog.deleteModal);
    expect(await xpermDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardXperm.delete.question/);
    await xpermDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(xpermDeleteDialog.deleteModal);

    expect(await isVisible(xpermDeleteDialog.deleteModal)).to.be.false;
  }
}
