class LoginScreen {
    // Selectors
    get inputUsername() {
        return $('android=new UiSelector().resourceId("username")');
    }

    get inputPassword() {
        return $('android=new UiSelector().resourceId("password")');
    }

    get btnContinue() {
        return $('android=new UiSelector().text("Continue")');
    }

    // Screen actions
    async login(username: string, password: string) {
        // Wait for the username input to be visible before interacting to reduce flakiness
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });
        
        // Fill the login form fields with the provided credentials
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        
        // Tap the 'Continue' button to submit the form
        await this.btnContinue.click();
    }
}

export default new LoginScreen();