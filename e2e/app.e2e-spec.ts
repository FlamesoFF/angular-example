import { GmailGrabberPage } from './app.po';

describe('gmail-grabber App', () => {
  let page: GmailGrabberPage;

  beforeEach(() => {
    page = new GmailGrabberPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to root!!');
  });
});
