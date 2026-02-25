import { Given, When, Then, After } from '../support/stepRetry.js';
import { 
    MemoryBook, 
    GoodMoments,
    NavigationMenu, 
    AppiumUtils, 
    LoginScreen, 
    WelcomeScreen,
    PermissionsScreen,
    HomeScreen
} from '../../tests/screenobjects/index.js';
import { currentSection, setSection } from '../../tests/utils/SectionTracker.js';

let savedText: string;

// --- BACKGROUND: Dividido en dos pasos ---

Given(/^I am logged in and on the Home screen$/, async () => {
    // 1. Manejar onboarding
    await WelcomeScreen.tapGetStarted(); //

    // 2. Realizar login usando variables de entorno (.env)
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASS!;
    
    await LoginScreen.login(email, password); //
    await PermissionsScreen.acceptNotifications();

    // after login we should land on the home dashboard; wait for main elements
    // to be visible so later steps (especially grief wave) don't race ahead.
    // HomeScreen.isDisplayed() internally waits for the Grief Wave button.
    await HomeScreen.isDisplayed();
});

Given(/^I navigate to the Memory Book screen$/, async () => {
    // 3. Navegar a la sección específica
    await NavigationMenu.openMemoryBook();
    setSection('memory');
});

// --- ESCENARIOS DE MEMORY BOOK ---

When(/^I add a memory with a unique description and a photo$/, async () => {
    savedText = `Auto Memory ${Date.now()}`;

    // Aseguramos que haya una foto de prueba en la galería del dispositivo/emulador
    await AppiumUtils.uploadTestPhotoToDevice();

    await MemoryBook.openForm(); // Clic en "Add to memory book"
    
    // Paso 1: Usamos el primer XPath que encontraste (limpio)
    await AppiumUtils.waitAndClick(MemoryBook.btnAddImage);
    
    // Paso 2: Usamos el segundo XPath (Compose)
    await AppiumUtils.selectFirstImageFromGallery(); 
    
    // Paso 3: Terminamos el flujo
    await MemoryBook.fillDescription(savedText);
    await AppiumUtils.waitAndClick(MemoryBook.btnSave);
});

When(/^I enter a description but no photo$/, async () => {
    const screen = currentSection === 'good' ? GoodMoments : MemoryBook;
    const prefix = currentSection === 'good' ? 'Auto GoodMoment no photo' : 'Auto Memory no photo';
    await screen.openForm();
    await screen.fillDescription(`${prefix} ${Date.now()}`);
});

When(/^I select a photo but leave the description empty$/, async () => {
    const screen = currentSection === 'good' ? GoodMoments : MemoryBook;
    await AppiumUtils.uploadTestPhotoToDevice();
    await screen.openForm();
    await AppiumUtils.waitAndClick(screen.btnAddImage);
    await AppiumUtils.selectFirstImageFromGallery();
});

Then(/^I should be on the Memory Book main screen$/, async () => {
    // always tap the bottom nav to land on the Memory Book screen; this
    // ensures the "Add to memory book" button is visible even if we were
    // already there or coming from Good moments.
    await NavigationMenu.openMemoryBook();
    setSection('memory');

    // the presence of the button confirms we have arrived
    await MemoryBook.btnAddToMemoryBook.waitForDisplayed({ timeout: 10000 });
    expect(await MemoryBook.btnAddToMemoryBook.isDisplayed()).toBe(true);
});

Then(/^I go back to the Memory Book main screen$/, async () => {
    // close any open form (works for both memory and good moments)
    await MemoryBook.goBackToMainScreen();

    // if we were in good moments, also switch the tab back
    if (currentSection === 'good') {
        await NavigationMenu.openMemoryBook();
        setSection('memory');
    }
});

// --- PASOS DE VALIDACIÓN ---

When(/^I try to save the memory$/, async () => {
    const screen = currentSection === 'good' ? GoodMoments : MemoryBook;
    await AppiumUtils.waitAndClick(screen.btnSave);
});

Then(/^I should see the error message "([^"]*)"$/, async (message: string) => {
    const screen = currentSection === 'good' ? GoodMoments : MemoryBook;
    const errorLabel = message === "Photo is required" 
        ? screen.lblPhotoRequired 
        : screen.lblDescriptionRequired;
        
    await expect(errorLabel).toBeDisplayed();
    await expect(errorLabel).toHaveText(message);
});

When(/^I try to save the memory without any data$/, async () => {
    const screen = currentSection === 'good' ? GoodMoments : MemoryBook;
    await screen.openForm();
    await AppiumUtils.waitAndClick(screen.btnSave);
});
Then(/^the button should stay disabled$/, async () => {
    const saveButtonSelector = 'new UiSelector().description("Save")';
    const saveButton = $(`android=${saveButtonSelector}`);

    // 1. Wait for the element to exist so we don't get a "not found" error
    await saveButton.waitForExist({ timeout: 5000 });

    // 2. Retrieve the 'clickable' attribute
    const isClickable = await saveButton.getAttribute('clickable');

    // 3. Assert that it is false
    // Note: getAttribute returns a string "false" or "true" in some versions, 
    // so we compare against the string or boolean.
    expect(isClickable.toString()).toBe('false');
});

// --- HOOK DE LIMPIEZA ---
// Se ejecuta al final de cada escenario
After(async () => {
    // close whichever form might be open (memory book or good moment)
    try {
        if (await MemoryBook.btnClose.isDisplayed()) {
            await AppiumUtils.waitAndClick(MemoryBook.btnClose);
            // don't return here; we want to continue and take the screenshot below
        }
    } catch {
        // element not present
    }

    try {
        if (await GoodMoments.btnClose.isDisplayed()) {
            await AppiumUtils.waitAndClick(GoodMoments.btnClose);
        }
    } catch {
        // ignore
    }

    // after every scenario we navigate to Good moments tab and snapshot it
    // this ensures the next scenario starts from that tab and provides a
    // screenshot for debugging/reporting
    await NavigationMenu.openGoodMoments();
    setSection('good');
});