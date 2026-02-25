class WelcomeScreen {
    // Selectors
    get btnGetStarted() {
        return $('~Get started'); 
    }

    // Screen actions
    async tapGetStarted() {
        const button = this.btnGetStarted;
        try {
            await button.waitForDisplayed({ timeout: 15000 });
            await button.click();
        } catch (error) {
            // Si el botón de onboarding no aparece (por ejemplo, app ya abrió en Login/Home),
            // continuamos sin fallar para que el flujo pueda seguir.
            // eslint-disable-next-line no-console
            console.warn('Get started button not found or not visible, continuing:', error);
        }
    }
}

export default new WelcomeScreen();