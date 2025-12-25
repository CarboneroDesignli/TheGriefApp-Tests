class AppiumUtils {
    /**
     * Espera a que un elemento sea visible y hace clic en él.
     * Usamos ReturnType<typeof $> para obtener el tipo exacto (ChainablePromiseElement)
     * sin depender de importaciones manuales que fallen.
     */
    async waitAndClick(element: ReturnType<typeof $>) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    /**
     * Selecciona la primera imagen disponible en la galería de Android
     */
    async selectFirstImageFromGallery() {
        const composePhotoSelector = '//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View[5]/android.view.View[1]/android.view.View[2]/android.view.View';        
        const photo = $(composePhotoSelector);
        await photo.waitForDisplayed({ timeout: 15000 });
        await photo.click();
    }

    /**
     * Oculta el teclado si está visible
     */
    async hideKeyboardIfShown() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }
}

export default new AppiumUtils();