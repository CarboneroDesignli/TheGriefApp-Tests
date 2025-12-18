import { Given, When, Then } from '@wdio/cucumber-framework';
import WelcomeScreen from '../../tests/screenobjects/WelcomeScreen';
import LoginScreen from '../../tests/screenobjects/LoginScreen';
import PermissionsScreen from '../../tests/screenobjects/PermissionsScreen';


Given('the user launches the app', async () => {
  await WelcomeScreen.tapGetStarted();
});

When('the user logs in with valid credentials', async () => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASS;

  if (!email || !password) {
    throw new Error('Missing credentials in .env');
  }

  await LoginScreen.login(email, password);
});

When('accepts system permissions', async () => {
  await PermissionsScreen.acceptNotifications();
});

Then('the user should reach the home screen', async () => {
  // TODO: assert HomeScreen
});
