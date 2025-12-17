class PermissionsScreen {
    // App selectors
    get btnAllowNotifications() {
        return $('android=new UiSelector().text("Allow push notifications")');
    }

    get btnMaybeLater() {
        return $('android=new UiSelector().text("Maybe later")');
    }

    // System selectors (Android native permission dialog)
    get btnSystemAllow() {
        return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
    }

    get btnSystemDeny() {
        return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_deny_button")');
    }

    // Screen actions
    async acceptNotifications() {
        // 1) Tap the app's notifications prompt
        await this.btnAllowNotifications.waitForDisplayed({ timeout: 5000 });
        await this.btnAllowNotifications.click();

        // 2) If the OS permission dialog appears, accept it.
        // Use try/catch because Android may not show the dialog if it was previously handled
        try {
            await this.btnSystemAllow.waitForDisplayed({ timeout: 5000 });
            await this.btnSystemAllow.click();
        } catch (error) {
            console.log("System permission dialog did not appear or was already handled.");
        }
    }
}

export default new PermissionsScreen();