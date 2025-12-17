class WelcomeScreen {
    // Selectors
    // Prefer Accessibility ID because it's fast and stable across builds
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