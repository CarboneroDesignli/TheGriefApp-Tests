class NavigationMenu {
    // Selectores de accesibilidad para las pestañas del menú inferior
    get memoryBookTab() { return $('~Memory Book'); }
    get journalTab()    { return $('~Journal'); }
    get resourcesTab()  { return $('~Resources'); }
    get goodMomentsTab() { return $('//android.view.ViewGroup[@content-desc="Good moments"]'); }

    // Método para abrir Memory Book
    async openMemoryBook() {
        await this.memoryBookTab.waitForDisplayed({ timeout: 10000 });
        await this.memoryBookTab.click();
    }

    // Método para abrir Good Moments.
    // El usuario primero debe entrar a Memory Book y luego tocar la pestaña "Good moments" dentro de esa pantalla.
    async openGoodMoments() {
        // asegurarse de estar en la pantalla principal de Memory Book
        await this.openMemoryBook();
        // luego seleccionar la pestaña interna
        await this.goodMomentsTab.waitForDisplayed({ timeout: 10000 });
        await this.goodMomentsTab.click();
    }

    // Método para abrir Journal
    async goToJournal() {
        await this.journalTab.waitForDisplayed();
        await this.journalTab.click();
    }

    // Método para abrir Resources
    async openResources() {
        await this.resourcesTab.waitForDisplayed();
        await this.resourcesTab.click();
    }
}

export default new NavigationMenu();