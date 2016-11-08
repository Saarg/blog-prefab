import { BlogPrefabPage } from './app.po';

describe('blog-prefab App', function() {
  let page: BlogPrefabPage;

  beforeEach(() => {
    page = new BlogPrefabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
