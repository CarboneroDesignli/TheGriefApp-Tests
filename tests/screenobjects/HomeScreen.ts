class HomeScreen {

    /**
     * Locators for the Home Screen dashboard.
     */
    get btnGriefWave() {
        return $('~Grief Wave'); // Using Accessibility ID for stability
    }

    get btnGiveMeABreak() {
        // XPath for the specific SVG element provided by the user
        return $('//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[4]/com.horcrux.svg.SvgView/com.horcrux.svg.GroupView/com.horcrux.svg.GroupView/com.horcrux.svg.CircleView[5]');
    }

    get txtWorkbook() {
        return $('//android.widget.TextView[@text="Workbook"]');
    }
    

    /**
     * Validates that the Home Screen is correctly loaded and visible.
     * @returns {Promise<boolean>} True if all main components are displayed.
     */
    async isDisplayed() {
        await this.btnGriefWave.waitForDisplayed({ timeout: 10000 });
        return (
            await this.btnGriefWave.isDisplayed() &&
            await this.btnGiveMeABreak.isDisplayed() &&
            await this.txtWorkbook.isDisplayed()
        );
    }
}

export default new HomeScreen();