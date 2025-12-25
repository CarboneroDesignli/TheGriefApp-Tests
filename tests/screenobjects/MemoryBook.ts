class MemoryBookScreen {
    // --- Pantalla Principal del Memory Book ---
    get btnAddToMemoryBook() { 
        return $('android=new UiSelector().text("Add to memory book")'); 
    }
    
    // Selectores para los items ya creados (usamos una función para buscar por texto dinámico)
    getMemoryText(text: string) {
        return $(`android=new UiSelector().text("${text}")`);
    }
    
    getMemoryDate(date: string) {
        return $(`android=new UiSelector().text("${date}")`);
    }

    get lastMemoryImage() {
        return $('//android.widget.ImageView');
    }

    // --- Modal / Formulario de "Add Memory" ---
    get btnCloseModal() {
        // Si el RectView no tiene ID, este XPath es necesario, pero intentamos que sea único
        return $('//com.horcrux.svg.RectView'); 
    }

    get btnAddImage() {
        // Cambiamos el instance(13) por algo más descriptivo si es posible, 
        // pero mantengo la lógica de ViewGroup si no hay IDs.
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(13)');
    }

    get btnDateSelector() {
        // Como el content-desc cambia según el mes, usamos "contains"
        return $('android=new UiSelector().descriptionContains("Date")');
    }

    get inputDescription() {
        return $('android=new UiSelector().className("android.widget.EditText")');
    }

    get btnSave() {
        return $('~Save'); // Accessibility ID "Save"
    }

    // --- Acciones ---

    async openAddMemoryForm() {
        await this.btnAddToMemoryBook.waitForDisplayed();
        await this.btnAddToMemoryBook.click();
    }

    async createMemory(description: string) {
        // 1. Seleccionar imagen (Aquí deberás manejar la galería del cel si se abre)
        await this.btnAddImage.click();
        // Nota: Aquí faltaría la lógica para elegir la foto de la galería de Android
        
        // 2. Escribir descripción
        await this.inputDescription.setValue(description);
        
        // 3. Guardar
        await this.btnSave.click();
    }

    async isMemoryPresent(text: string) {
        const element = this.getMemoryText(text);
        return await element.isDisplayed();
    }
}

export default new MemoryBookScreen();