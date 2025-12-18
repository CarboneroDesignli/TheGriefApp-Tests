class WelcomeScreen {
    // Selectors
    get btnGetStarted() {
        return $('~Get started'); 
    }

    // Screen actions
    async tapGetStarted() {
        await this.btnGetStarted.waitForDisplayed({ timeout: 5000 });
        await this.btnGetStarted.click();
    }
}

export default new WelcomeScreen();