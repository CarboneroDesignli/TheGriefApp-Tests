import AppiumUtils from '../utils/AppiumUtils.js';

class GoodMoments {
    // --- Selectores ---
    // botón que abre el formulario de "Add a good moment" dentro de la pestaña Good moments
    get btnAddGoodMoment() { return $('//android.view.ViewGroup[@content-desc="Add a good moment"]'); }
    // el formulario usa el mismo botón de guardar y de cerrar que MemoryBook
    get btnSave()            { return $('//android.widget.TextView[@text="Save"]'); }
    get btnClose()           { return $('android=new UiSelector().className("com.horcrux.svg.RectView")'); }
    // campo de descripción específico de good moment
    get inputDescription()   { return $('//android.widget.EditText[@text="What was your good moment ?"]'); }

    /**
     * Selector para el área de "Agregar Imagen" en good moment
     */
    get btnAddImage() { 
            return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup');
    }

    // Mensajes de error
    get lblPhotoRequired()       { return $('android=new UiSelector().text("Photo is required")'); }
    get lblDescriptionRequired() { return $('android=new UiSelector().text("Description is required")'); }

    async openForm() {
        await AppiumUtils.waitAndClick(this.btnAddGoodMoment);
    }

    async fillDescription(text: string) {
        await this.inputDescription.waitForDisplayed();
        await this.inputDescription.setValue(text);
    }

    /**
     * Intenta regresar a la pantalla principal de Memory Book.
     * Si el formulario de creación/edición está abierto, se cierra con el botón de cierre.
     */
    async goBackToMainScreen() {
        if (await this.btnClose.isDisplayed()) {
            await AppiumUtils.waitAndClick(this.btnClose);
        }
    }
}

export default new GoodMoments();