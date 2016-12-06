import { browser, element, by } from 'protractor';

export class BlogPrefabPage {
  navigateToHome() {
    return browser.get('/');
  }

  navigateToGallery() {
    return browser.get('/#/gallery');
  }

  navigateToActivity() {
    return browser.get('/#/activity');
  }

  getTitle() {
    return element(by.css('app-root div h1')).getText();
  }
}
