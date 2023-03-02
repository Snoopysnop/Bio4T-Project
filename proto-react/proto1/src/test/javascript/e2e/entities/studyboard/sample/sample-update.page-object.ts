import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class SampleUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardSample.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#sample-name'));
  descriptionInput: ElementFinder = element(by.css('input#sample-description'));
  developmentStageInput: ElementFinder = element(by.css('input#sample-developmentStage'));
  speciesInput: ElementFinder = element(by.css('input#sample-species'));
  organInput: ElementFinder = element(by.css('input#sample-organ'));
  tissuesInput: ElementFinder = element(by.css('input#sample-tissues'));
  conditionSelect: ElementFinder = element(by.css('select#sample-condition'));

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

  async setDevelopmentStageInput(developmentStage) {
    await this.developmentStageInput.sendKeys(developmentStage);
  }

  async getDevelopmentStageInput() {
    return this.developmentStageInput.getAttribute('value');
  }

  async setSpeciesInput(species) {
    await this.speciesInput.sendKeys(species);
  }

  async getSpeciesInput() {
    return this.speciesInput.getAttribute('value');
  }

  async setOrganInput(organ) {
    await this.organInput.sendKeys(organ);
  }

  async getOrganInput() {
    return this.organInput.getAttribute('value');
  }

  async setTissuesInput(tissues) {
    await this.tissuesInput.sendKeys(tissues);
  }

  async getTissuesInput() {
    return this.tissuesInput.getAttribute('value');
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
    await this.setDevelopmentStageInput('developmentStage');
    await waitUntilDisplayed(this.saveButton);
    await this.setSpeciesInput('species');
    await waitUntilDisplayed(this.saveButton);
    await this.setOrganInput('organ');
    await waitUntilDisplayed(this.saveButton);
    await this.setTissuesInput('tissues');
    // this.conditionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
