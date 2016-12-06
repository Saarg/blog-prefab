import { BlogPrefabPage } from './app.po';

describe('blog-prefab App', function() {
  let page: BlogPrefabPage;

  beforeEach(() => {
    page = new BlogPrefabPage();
  });

  it('should display Homepage', () => {
    page.navigateToHome();
    expect(page.getTitle()).toEqual('Home');
  });

  it('should display Gallery', () => {
    page.navigateToGallery();
    expect(page.getTitle()).toEqual('Gallery');
  });

  it('should display Activity', () => {
    page.navigateToActivity();
    expect(page.getTitle()).toEqual('Activities');
  });
});
