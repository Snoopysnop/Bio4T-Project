import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class ProjectUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardProject.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#project-name'));
  descriptionInput: ElementFinder = element(by.css('input#project-description'));
  creationDateInput: ElementFinder = element(by.css('input#project-creationDate'));
  sampleSelect: ElementFinder = element(by.css('select#project-sample'));
  userSelect: ElementFinder = element(by.css('select#project-user'));
  dashSelect: ElementFinder = element(by.css('select#project-dash'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return this.creationDateInput.getAttribute('value');
  }

  async sampleSelectLastOption() {
    await this.sampleSelect.all(by.tagName('option')).last().click();
  }

  async sampleSelectOption(option) {
    await this.sampleSelect.sendKeys(option);
  }

  getSampleSelect() {
    return this.sampleSelect;
  }

  async getSampleSelectedOption() {
    return this.sampleSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async dashSelectLastOption() {
    await this.dashSelect.all(by.tagName('option')).last().click();
  }

  async dashSelectOption(option) {
    await this.dashSelect.sendKeys(option);
  }

  getDashSelect() {
    return this.dashSelect;
  }

  async getDashSelectedOption() {
    return this.dashSelect.element(by.css('option:checked')).getText();
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
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    // this.sampleSelectLastOption();
    await this.userSelectLastOption();
    await this.dashSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
