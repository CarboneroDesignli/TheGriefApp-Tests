import { Given, When, Then } from '@wdio/cucumber-framework';
import WelcomeScreen from '../../tests/screenobjects/WelcomeScreen';
import LoginScreen from '../../tests/screenobjects/LoginScreen';
import PermissionsScreen from '../../tests/screenobjects/PermissionsScreen';
import HomeScreen from '../../tests/screenobjects/HomeScreen';

Given('the user launches the app', async () => {
  await WelcomeScreen.tapGetStarted();
});

When('the user logs in with valid credentials', async () => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASS;

  if (!email || !password) {
    throw new Error('Missing environment variables: TEST_USER_EMAIL or TEST_USER_PASS');
  }

  await LoginScreen.login(email, password);
});

When('accepts system permissions', async () => {
  await PermissionsScreen.acceptNotifications();
});

Then('the user should reach the home screen', async () => {
  /**
   * IMPORTANT: These assertions verify the UI state after the login/permission flow.
   * expect(...).toBeDisplayed() includes an implicit wait, making the test more resilient.
   */
  await expect(HomeScreen.btnGriefWave).toBeDisplayed();
  await expect(HomeScreen.btnGiveMeABreak).toBeDisplayed();
  await expect(HomeScreen.txtWorkbook).toBeDisplayed();
});


When('denies system permissions', async () => {
  await PermissionsScreen.denyNotifications();
});