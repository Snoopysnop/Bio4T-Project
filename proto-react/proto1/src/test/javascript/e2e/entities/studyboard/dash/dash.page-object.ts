import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import DashUpdatePage from './dash-update.page-object';

const expect = chai.expect;
export class DashDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardDash.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-dash'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DashComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('dash-heading'));
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
    await navBarPage.getEntityPage('dash');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDash() {
    await this.createButton.click();
    return new DashUpdatePage();
  }

  async deleteDash() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const dashDeleteDialog = new DashDeleteDialog();
    await waitUntilDisplayed(dashDeleteDialog.deleteModal);
    expect(await dashDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardDash.delete.question/);
    await dashDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(dashDeleteDialog.deleteModal);

    expect(await isVisible(dashDeleteDialog.deleteModal)).to.be.false;
  }
}
