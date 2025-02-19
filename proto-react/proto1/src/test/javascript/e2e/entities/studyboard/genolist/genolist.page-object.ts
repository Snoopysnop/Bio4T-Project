import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../../util/utils';

import NavBarPage from './../../../page-objects/navbar-page';

import GenolistUpdatePage from './genolist-update.page-object';

const expect = chai.expect;
export class GenolistDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gatewayApp.studyboardGenolist.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-genolist'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class GenolistComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('genolist-heading'));
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
    await navBarPage.getEntityPage('genolist');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateGenolist() {
    await this.createButton.click();
    return new GenolistUpdatePage();
  }

  async deleteGenolist() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const genolistDeleteDialog = new GenolistDeleteDialog();
    await waitUntilDisplayed(genolistDeleteDialog.deleteModal);
    expect(await genolistDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gatewayApp.studyboardGenolist.delete.question/);
    await genolistDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(genolistDeleteDialog.deleteModal);

    expect(await isVisible(genolistDeleteDialog.deleteModal)).to.be.false;
  }
}
