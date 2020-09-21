import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  })

  it('Then: I should able to see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });

  it('Then: I should able to undo addition in my reading list', async () => {
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_2');
    await readinglistAdd.click();
    const items = await $$('[data-testing="reading-list-container"]');
    expect(items.length).toBe(1, 'at leat one');
  });

  it('Then: I should able to set marked as finished in my reading list', async () => {
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const readinglistAdd = await $('#wantToRead_1');
    await readinglistAdd.click();
    const items = await $$('[data-testing="reading-list-container"]');
    if (items.length > 0) {
      const readingListToggle = await $('[data-testing="toggle-reading-list"]');
      await readingListToggle.click();
      const btnMarkAsFinish = await $('#markasFinish_1');
      await btnMarkAsFinish.click();
      const buttonText = await readinglistAdd.getText();
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(readinglistAdd, 'Finished')
      );
    }
  });
});
