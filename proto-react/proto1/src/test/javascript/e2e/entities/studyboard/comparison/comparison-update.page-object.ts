import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class ComparisonUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardComparison.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#comparison-title'));
  conditionSelect: ElementFinder = element(by.css('select#comparison-condition'));
  projectSelect: ElementFinder = element(by.css('select#comparison-project'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async conditionSelectLastOption() {
    await this.conditionSelect.all(by.tagName('option')).last().click();
  }

  async conditionSelectOption(option) {
    await this.conditionSelect.sendKeys(option);
  }

  getConditionSelect() {
    return this.conditionSelect;
  }

  async getConditionSelectedOption() {
    return this.conditionSelect.element(by.css('option:checked')).getText();
  }

  async projectSelectLastOption() {
    await this.projectSelect.all(by.tagName('option')).last().click();
  }

  async projectSelectOption(option) {
    await this.projectSelect.sendKeys(option);
  }

  getProjectSelect() {
    return this.projectSelect;
  }

  async getProjectSelectedOption() {
    return this.projectSelect.element(by.css('option:checked')).getText();
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
    await this.setTitleInput('title');
    // this.conditionSelectLastOption();
    await this.projectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
