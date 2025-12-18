class PermissionsScreen {
    /**
     * Application-level selectors for notification prompts.
     */
    get btnAllowNotifications() {
        return $('android=new UiSelector().text("Allow push notifications")');
    }

    get btnMaybeLater() {
        return $('android=new UiSelector().text("Maybe later")');
    }

    /**
     * System-level selectors for Android native permission dialogs.
     */
    get btnSystemAllow() {
        return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
    }

    /**
     * Handles the notification permission flow by accepting them.
     * This triggers the OS-level permission dialog.
     */
    async acceptNotifications() {
        await this.btnAllowNotifications.waitForDisplayed({ timeout: 5000 });
        await this.btnAllowNotifications.click();

        try {
            await this.btnSystemAllow.waitForDisplayed({ timeout: 5000 });
            await this.btnSystemAllow.click();
        } catch (error) {
            console.warn("System permission dialog did not appear or was previously dismissed.");
        }
    }

    /**
     * Handles the notification permission flow by denying them.
     * Per business logic, the system dialog does not appear when "Maybe later" is selected.
     */
    async denyNotifications() {
        await this.btnMaybeLater.waitForDisplayed({ timeout: 5000 });
        await this.btnMaybeLater.click();
        // No system dialog handling needed here as it is not triggered.
    }
}

export default new PermissionsScreen();