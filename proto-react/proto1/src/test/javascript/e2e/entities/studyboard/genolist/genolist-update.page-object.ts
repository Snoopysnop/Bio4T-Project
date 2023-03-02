import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../../util/utils';

const expect = chai.expect;

export default class GenolistUpdatePage {
  pageTitle: ElementFinder = element(by.id('gatewayApp.studyboardGenolist.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#genolist-title'));
  memberCountInput: ElementFinder = element(by.css('input#genolist-memberCount'));
  creationDateInput: ElementFinder = element(by.css('input#genolist-creationDate'));
  comparisonSelect: ElementFinder = element(by.css('select#genolist-comparison'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setMemberCountInput(memberCount) {
    await this.memberCountInput.sendKeys(memberCount);
  }

  async getMemberCountInput() {
    return this.memberCountInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return this.creationDateInput.getAttribute('value');
  }

  async comparisonSelectLastOption() {
    await this.comparisonSelect.all(by.tagName('option')).last().click();
  }

  async comparisonSelectOption(option) {
    await this.comparisonSelect.sendKeys(option);
  }

  getComparisonSelect() {
    return this.comparisonSelect;
  }

  async getComparisonSelectedOption() {
    return this.comparisonSelect.element(by.css('option:checked')).getText();
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
    await waitUntilDisplayed(this.saveButton);
    await this.setMemberCountInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await this.comparisonSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
