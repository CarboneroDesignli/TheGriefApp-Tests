import { When, Then } from '../support/stepRetry.js';
import AppiumUtils from '../../tests/utils/AppiumUtils.js';
import { HomeScreen } from '../../tests/screenobjects/index.js';

When(/^I start a Grief Wave and run the full flow$/, async () => {
    // open home screen element from the screen object; it already uses
    // accessibility id and is a more stable locator. waiting for it ensures
    // the dashboard has finished rendering too.
    await AppiumUtils.waitAndClick(await HomeScreen.btnGriefWave);

    // choose 1 Minute by coordinate
    // wait 3 seconds
    await browser.pause(3000);
    await driver.touchAction({ action: 'tap', x: 120, y: 1490 });

    // press Start
    // wait 3 seconds
    await browser.pause(3000);
    await driver.touchAction({ action: 'tap', x: 550, y: 1750 });

    // wait 50 seconds// wait 3 seconds
    await browser.pause(3000);
    await browser.pause(50000);

    // extend +1minute
    await driver.touchAction({ action: 'tap', x: 125, y: 1355 });

    // wait additional 75 seconds
    await browser.pause(75000);
});

When(/^I start a Grief Wave and stop after a short time$/, async () => {
    // tap the grief wave button again using the screen object for consistency
    await AppiumUtils.waitAndClick(await HomeScreen.btnGriefWave);// wait 3 seconds
    await browser.pause(3000);
    
    await driver.touchAction({ action: 'tap', x: 120, y: 1490 });// wait 3 seconds
    await browser.pause(3000);
    
    await driver.touchAction({ action: 'tap', x: 550, y: 1750 });

    // wait 10 seconds and then stop
    await browser.pause(10000);
    await driver.touchAction({ action: 'tap', x: 800, y: 1650 });
});

Then(/^I should see the gratitude message$/, async () => {
    const text = $('//android.widget.TextView[@text="You’ve nurtured yourself and honored your loved one by being present with your grief"]');
    await text.waitForDisplayed({ timeout: 30000 });
});

Then(/^I go back to the home screen$/, async () => {
    const btn = $('//android.widget.TextView[@text="Go to Homescreen"]');
    await AppiumUtils.waitAndClick(btn);
});