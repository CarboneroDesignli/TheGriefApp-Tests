class NavigationMenu {
    // Usamos el selector de accesibilidad (~) que es el más estable
    get memoryBookTab() { return $('~Memory Book'); }
    get journalTab()    { return $('~Journal'); }
    get resourcesTab()  { return $('~Resources'); }

    async goToJournal() {
        await this.journalTab.waitForDisplayed();
        await this.journalTab.click();
    }
}

export default new NavigationMenu();