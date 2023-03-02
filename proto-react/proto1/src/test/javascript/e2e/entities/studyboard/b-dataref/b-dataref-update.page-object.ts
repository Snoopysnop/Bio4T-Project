import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class BDatarefUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardBDataref.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  reflistInput: ElementFinder = element(by.css('input#b-dataref-reflist'));
  dateInput: ElementFinder = element(by.css('input#b-dataref-date'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setReflistInput(reflist) {
    await this.reflistInput.sendKeys(reflist);
  }

  async getReflistInput() {
    return this.reflistInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setReflistInput('reflist');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
