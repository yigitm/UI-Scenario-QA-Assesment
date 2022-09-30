require('chromedriver');

const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Chrome browser tests', () => {
  it(
    'User scenario',
    (chromeTest = async () => {
      const driver = await new Builder().forBrowser('chrome').build();

      //go to 'https://www.company.com'
      await driver.get('https://www.company.com');

      //Click 'Login' button.
      await driver.findElement({ className: '_1bEBSm' }).click();

      //Click 'Membership'.
      await driver
        .findElement(
          By.css('div._2tosxD button.ej27.ej1.ej3.ej6._3gH3oX.nWFrjm._2MKhpX'),
        )
        .click();

      //Select membership.
      const buttonText = await driver
        .findElement(By.css('div.Uikvx_ button span'))
        .getText();
      assert.strictEqual(buttonText, 'Membership');

      //Fill name in membership form.
      const userName = await driver.findElement(
        By.css('input#custom-css-outlined-input'),
      );
      await userName.sendKeys('John Doe');

      //Fill text inputs in membership form.
      const inputs = await driver.findElements(By.css('input[type="text"]'));
      assert.strictEqual(inputs.length, 4);

      //Fill email.
      await inputs[3].sendKeys('test@mail.com');

      //Fill password.
      const userPassword = await driver.findElement(
        By.css('input[type="password"]'),
      );
      await userPassword.sendKeys('6X7sksa#oA');

      //Allow all checkboxes.
      const checkboxes = await driver.findElements(
        By.css('div._2WHzaQ input[type="checkbox"]'),
      );

      assert.strictEqual(checkboxes.length, 4);
      checkboxes.forEach((box) => box.click());

      //Click to 'Be Member' button.
      await driver
        .findElement(By.css('button[data-ej-category="forms"]'))
        .click();

      //Wait for email activation message to click button.
      let messageButton = await driver.wait(
        until.elementLocated(By.css('div._2qEDdJ p button')),
        10000,
      );

      let textButton = await messageButton.getText();
      assert(textButton == 'Okay');

      //Go back to home page after membership.
      await messageButton.click();

      //Screenshot after membership.
      await driver.takeScreenshot().then(function (uyeOl) {
        require('fs').writeFileSync(
          './screenshots/membership.png',
          uyeOl,
          'base64',
        );
      });

      //Login after email activation.
      await driver.findElement({ className: '_1bEBSm' }).click();

      //Find all text inputs in login form.
      const memberInputs = await driver.findElements(
        By.css('input[type="text"]'),
      );
      assert.strictEqual(memberInputs.length, 2);

      //Fill email in the form.
      await memberInputs[1].sendKeys('test@mail.com');

      //Fill password to form.
      const memberPassword = await driver.findElement(
        By.css('input[type="password"]'),
      );

      //Click 'Login' button.
      await memberPassword.sendKeys('6X7sksa#oA');

      loginButton = await driver
        .findElement(By.css('div._2tosxD button.ej27 span.ej2'))
        .click();

      //Login to user account & go back to home page.
      const userProfile = await driver.wait(
        until.elementLocated(By.css('span._3TtF9S')),
        10000,
      );
      const username = await userProfile.getText();
      assert(username == 'John Doe');

      //Screenshot after member login.
      await driver.takeScreenshot().then(function (uyeGiris) {
        require('fs').writeFileSync(
          './screenshots/member-login.png',
          uyeGiris,
          'base64',
        );
      });

      //Login to 'https://www.company.com'.
      await driver.get('https://company.com');

      //Select sale item from top menu.
      await driver.findElement(By.css('span.ej2')).click();
      await driver.findElement(By.linkText('Sale-item')).click();

      //Go to related page.
      const saleUrl = await driver.getCurrentUrl();
      assert.strictEqual(saleUrl, 'https://www.company.com/sale-items/');

      //Sale items screenshot.
      await driver.takeScreenshot().then(function (satilikKonut) {
        require('fs').writeFileSync(
          './screenshots/sale-items.png',
          satilikKonut,
          'base64',
        );
      });

      //Town & State is selected.
      const filterParent = await driver.wait(
        until.elementLocated(By.css('div._13uvj9 button span.ej2 div.qOcF-e')),
        10000,
      );

      const parentText = await filterParent.getText();
      assert.match(parentText, /Town - State - Neighborhood/);

      //Click to 'Town & State'.
      driver.executeScript(function () {
        var parentElm = document.getElementsByClassName('_13uvj9');
        parentElm[0].firstChild.click();
      });

      //Town list is located.
      const expandList = await driver.wait(
        until.elementLocated(By.id('city-gotham')),
        10000,
      );
      const city = await expandList.getText();
      assert.match(city, /Gotham/);

      //Select Gotham City.
      await driver.executeScript(function () {
        const gotham = document.getElementById('city-gotham');
        istanbul.firstElementChild.click();
      });

      //State list is located.
      const districtElm = await driver.wait(
        until.elementLocated(By.id('district-mountain-drive-1007')),
        10000,
      );
      const district = await districtElm.getText();
      assert.match(district, /Crest Hill/);

      //State is selected.
      await driver.executeScript(function () {
        const mountainDrive = document.getElementById(
          'district-mountain-drive-1007',
        );
        mountainDrive.firstElementChild.firstElementChild.click();
      });

      //Room list located.
      const roomList = await driver.wait(
        until.elementLocated(By.css('div.dvg_v3 button')),
        10000,
      );
      const room = await roomList.getText();
      assert.match(room, /Room Number/);

      //Room list is selected.
      await driver.executeScript(function () {
        const roomNumber = document.getElementsByClassName('_3zda8i');
        roomNumber[0].click();
      });

      //4 room selected.
      await driver.executeScript(function () {
        const roomNumber = document.getElementsByClassName('_2YckML');
        roomNumber[0].children.item(8).click();
      });

      //Find price list.
      await driver.findElement(By.css('div._2qrqEk')).click();

      //Select price range.
      const priceInputs = await driver.findElements(
        By.css('input[inputmode="numeric"]'),
      );
      priceInputs[0].sendKeys('1.000.000');
      priceInputs[1].sendKeys('2.000.000');

      //All fitrs button located.
      const allFilter = await driver.findElement(
        By.css('div[data-ej-label="button_allfilters"]'),
      );
      const filterButton = await allFilter.getText();
      assert.match(filterButton, /All Filters/);

      //Click to filter list.
      await allFilter.click();

      //Sale item age located & clicked.
      await driver
        .findElement(
          By.css('div.RXkAC7 div._2Mr62X div#ej-filter-dropdown-wrapper'),
        )
        .click();

      //Picked 0,1,2,3,4,5-10 from list.
      await driver.executeScript(function () {
        document.getElementsByClassName('_1tx6iq')[0].children.item(0).click();
        document.getElementsByClassName('_1tx6iq')[0].children.item(1).click();
        document.getElementsByClassName('_1tx6iq')[0].children.item(2).click();
        document.getElementsByClassName('_1tx6iq')[0].children.item(3).click();
        document.getElementsByClassName('_1tx6iq')[0].children.item(4).click();
        document.getElementsByClassName('_1tx6iq')[0].children.item(5).click();
      });

      //Scroll to selected item.
      await driver.executeScript(
        'arguments[0].scrollIntoView(true);',
        allFilter,
      );

      //Screenshot of filter choices.
      await driver.takeScreenshot().then(function (filterChoice) {
        require('fs').writeFileSync(
          './screenshots/filter-choice.png',
          filterChoice,
          'base64',
        );
      });

      //Click & run selected filters.
      await driver.executeScript(function () {
        document
          .getElementsByClassName('_1hg6f7')[0]
          .lastElementChild.firstElementChild.click();
      });

      //Select second element from top & open it.
      await driver.executeScript(function () {
        const searchList = document
          .getElementById('listing-search-wrapper')
          .children.item(0);
        searchList.children.item(1).firstElementChild.click();
      });

      //Element header located.
      const loadPost = await driver.wait(
        until.elementLocated(By.css('h1._3OKyci')),
      );
      const post = await loadPost.getTagName();
      assert.strictEqual(post, 'h1');

      //Screenshot of second item from top.
      await driver.takeScreenshot().then(function (item) {
        require('fs').writeFileSync(
          './screenshots/second-item.png',
          item,
          'base64',
        );
      });

      //Click to 'Favorites' button.
      await driver.executeScript(() => {
        document.getElementsByClassName('_3mdGPg')[0].children.item(1).click();
      });

      //Click to create new list button.
      await driver.executeScript(() => {
        document.getElementsByClassName('_2SSJxY')[0].click();
      });

      //Created a list & name it as: 'Qa-list'.
      const favInput = await driver.findElements(
        By.id('custom-css-outlined-input'),
      );
      assert.strictEqual(favInput.length, 5);
      await favInput[4].sendKeys('Qa-list');
      await driver.findElement(By.css('div.stzSqm._23bKM0')).click();

      //Add created list to favorites.
      const favElement = await driver.wait(
        until.elementLocated(By.css('div._3Z_bGr')),
        10000,
      );

      //Screenshot of favorite lists.
      await driver.takeScreenshot().then(function (favorites) {
        require('fs').writeFileSync(
          './screenshots/favorites.png',
          favorites,
          'base64',
        );
      });

      await favElement.click();

      //Wait for to appear pop-up & go to favorite list.
      const goToFavList = await driver.wait(
        until.elementLocated(By.css('span#snackbar-message-id a')),
        10000,
      );
      await goToFavList.click();

      //Screenshot of favorite list that goes through the pop up.
      await driver.takeScreenshot().then(function (favorites) {
        require('fs').writeFileSync(
          './screenshots/favorite-list.png',
          favorites,
          'base64',
        );
      });

      await driver.executeScript(() => {
        document.getElementsByClassName('_3TtF9S')[0].click();
      });

      //Screenshot of clicked menu.
      await driver.takeScreenshot().then(function (memberMenu) {
        require('fs').writeFileSync(
          './screenshots/member-menu.png',
          memberMenu,
          'base64',
        );
      });

      await driver.executeScript(() => {
        document.getElementsByClassName('_1RexvE')[6].click();
      });

      //Screenshot after logout.
      await driver.takeScreenshot().then(function (memberOut) {
        require('fs').writeFileSync(
          './screenshots/member-out.png',
          memberOut,
          'base64',
        );
      });

      await driver.close();
      await driver.quit();
    }),
  );
});
