class NavigationMenu {
    // Selectores de accesibilidad para las pestañas del menú inferior
    get memoryBookTab() { return $('~Memory Book'); }
    get journalTab()    { return $('~Journal'); }
    get resourcesTab()  { return $('~Resources'); }

    // Método para abrir Memory Book
    async openMemoryBook() {
        await this.memoryBookTab.waitForDisplayed({ timeout: 10000 });
        await this.memoryBookTab.click();
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