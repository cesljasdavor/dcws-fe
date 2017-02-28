import { DcwsPage } from './app.po';

describe('dcws App', function() {
  let page: DcwsPage;

  beforeEach(() => {
    page = new DcwsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
