import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import XuserUpdatePage from './xuser-update.page-object';

const expect = chai.expect;
export class XuserDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardXuser.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-xuser'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class XuserComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('xuser-heading'));
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
    await navBarPage.getEntityPage('xuser');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateXuser() {
    await this.createButton.click();
    return new XuserUpdatePage();
  }

  async deleteXuser() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const xuserDeleteDialog = new XuserDeleteDialog();
    await waitUntilDisplayed(xuserDeleteDialog.deleteModal);
    expect(await xuserDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardXuser.delete.question/);
    await xuserDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(xuserDeleteDialog.deleteModal);

    expect(await isVisible(xuserDeleteDialog.deleteModal)).to.be.false;
  }
}
