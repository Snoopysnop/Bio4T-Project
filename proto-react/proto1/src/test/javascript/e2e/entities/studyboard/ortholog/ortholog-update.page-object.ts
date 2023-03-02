import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class OrthologUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardOrtholog.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#ortholog-name'));
  sourceInput: ElementFinder = element(by.css('input#ortholog-source'));
  aliasListInput: ElementFinder = element(by.css('input#ortholog-aliasList'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setSourceInput(source) {
    await this.sourceInput.sendKeys(source);
  }

  async getSourceInput() {
    return this.sourceInput.getAttribute('value');
  }

  async setAliasListInput(aliasList) {
    await this.aliasListInput.sendKeys(aliasList);
  }

  async getAliasListInput() {
    return this.aliasListInput.getAttribute('value');
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
    await waitUntilDisplayed(this.saveButton);
    await this.setSourceInput('source');
    await waitUntilDisplayed(this.saveButton);
    await this.setAliasListInput('aliasList');
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
