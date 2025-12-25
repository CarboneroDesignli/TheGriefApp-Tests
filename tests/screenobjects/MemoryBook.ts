import AppiumUtils from '../utils/AppiumUtils.js';

class MemoryBook {
    // --- Selectores ---
    get btnAddToMemoryBook() { return $('android=new UiSelector().text("Add to memory book")'); }
    get btnSave()            { return $('~Save'); }
    get btnClose()           { return $('//com.horcrux.svg.RectView'); }
    get inputDescription()   { return $('android=new UiSelector().className("android.widget.EditText")'); }

    /**
     * Selector para el área de "Agregar Imagen".
     */
    get btnAddImage() { 
            return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup');
    }

    // Mensajes de error
    get lblPhotoRequired()       { return $('android=new UiSelector().text("Photo is required")'); }
    get lblDescriptionRequired() { return $('android=new UiSelector().text("Description is required")'); }

    getMemoryEntry(text: string) {
        return $(`android=new UiSelector().text("${text}")`);
    }

    async openForm() {
        await AppiumUtils.waitAndClick(this.btnAddToMemoryBook);
    }

    async fillDescription(text: string) {
        await this.inputDescription.waitForDisplayed();
        await this.inputDescription.setValue(text);
    }
}

export default new MemoryBook();