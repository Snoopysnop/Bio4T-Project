import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class XuserUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardXuser.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#xuser-name'));
  groupSelect: ElementFinder = element(by.css('select#xuser-group'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async groupSelectLastOption() {
    await this.groupSelect.all(by.tagName('option')).last().click();
  }

  async groupSelectOption(option) {
    await this.groupSelect.sendKeys(option);
  }

  getGroupSelect() {
    return this.groupSelect;
  }

  async getGroupSelectedOption() {
    return this.groupSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    // this.groupSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
