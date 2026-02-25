import { Given, When, After } from '../support/stepRetry.js';
import { 
    NavigationMenu,
    GoodMoments,
    AppiumUtils
} from '../../tests/screenobjects/index.js';
import { setSection } from '../../tests/utils/SectionTracker.js';

let goodSavedText: string;

Given(/^I navigate to the Good moments screen$/, async () => {
    await NavigationMenu.openGoodMoments();
    setSection('good');
});

When(/^I add a good moment with a unique description and a photo$/, async () => {
    goodSavedText = `Auto GoodMoment ${Date.now()}`;

    await AppiumUtils.uploadTestPhotoToDevice();

    await GoodMoments.openForm();
    await AppiumUtils.waitAndClick(GoodMoments.btnAddImage);
    await AppiumUtils.selectFirstImageFromGallery();
    await GoodMoments.fillDescription(goodSavedText);
    await AppiumUtils.waitAndClick(GoodMoments.btnSave);
});

// cleanup similar to memory book tests - close form if it's still open
After(async () => {
    if (await GoodMoments.btnClose.isDisplayed()) {
        await AppiumUtils.waitAndClick(GoodMoments.btnClose);
    }

    // once we're done with a good-moments scenario navigate to the tab,
    // update the tracker and record a screenshot for the report
    await NavigationMenu.openGoodMoments();
    setSection('good');
});