import { Given, When, Then, After } from '@wdio/cucumber-framework';
import { 
    MemoryBook, 
    NavigationMenu, 
    AppiumUtils, 
    LoginScreen, 
    WelcomeScreen,
    PermissionsScreen
} from '../../tests/screenobjects/index.js';

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
    
});

Given(/^I navigate to the Memory Book screen$/, async () => {
    // 3. Navegar a la sección específica
    await NavigationMenu.openMemoryBook();
});

// --- ESCENARIOS DE MEMORY BOOK ---

When(/^I add a memory with a unique description and a photo$/, async () => {
    savedText = `Auto Memory ${Date.now()}`;

    await MemoryBook.openForm(); // Clic en "Add to memory book"
    
    // Paso 1: Usamos el primer XPath que encontraste (limpio)
    await AppiumUtils.waitAndClick(MemoryBook.btnAddImage);
    
    // Paso 2: Usamos el segundo XPath (Compose)
    await AppiumUtils.selectFirstImageFromGallery(); 
    
    // Paso 3: Terminamos el flujo
    await MemoryBook.fillDescription(savedText);
    await AppiumUtils.waitAndClick(MemoryBook.btnSave);
});

Then(/^I should see the new memory entry in the list$/, async () => {
    const entry = await MemoryBook.getMemoryEntry(savedText);
    await expect(entry).toBeDisplayed();
});

// --- PASOS DE VALIDACIÓN ---

When(/^I try to save the memory$/, async () => {
    await AppiumUtils.waitAndClick(MemoryBook.btnSave);
});

Then(/^I should see the error message "([^"]*)"$/, async (message: string) => {
    const errorLabel = message === "Photo is required" 
        ? MemoryBook.lblPhotoRequired 
        : MemoryBook.lblDescriptionRequired;
        
    await expect(errorLabel).toBeDisplayed();
    await expect(errorLabel).toHaveText(message);
});

// --- HOOK DE LIMPIEZA ---
// Se ejecuta al final de cada escenario con el tag @validation
After({ tags: '@validation' }, async () => {
    if (await MemoryBook.btnClose.isDisplayed()) {
        await AppiumUtils.waitAndClick(MemoryBook.btnClose);
    }
});