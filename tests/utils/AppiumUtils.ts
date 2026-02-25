import fs from 'node:fs';
import path from 'node:path';

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
        // We target the first android.view.View that has a content description 
        // starting with "Photo taken on", which is specific to this picker.
        const selector = 'new UiSelector().className("android.view.View").descriptionStartsWith("Photo taken on")';
        const photo = $(`android=${selector}`);
    
        try {
            await photo.waitForDisplayed({ timeout: 15000 });
            await photo.click();
        } catch (error) {
            console.warn('Compose Gallery photo not found, attempting fallback:', error.message);
            // Fallback: Use the Xpath derived from your inspector but simplified to the first child
            const fallback = $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]');
            await fallback.click();
        }
    }

    /**
     * Sube una foto de prueba al dispositivo/emulador para que aparezca en la galería.
     * Importante: debes colocar un archivo de imagen real en
     * `assets/memory-book-photo.jpg` dentro del proyecto.
     */
    async uploadTestPhotoToDevice() {
        const projectRoot = process.cwd();
        const imagePath = path.resolve(projectRoot, 'assets', 'memory-book-photo.jpg');

        if (!fs.existsSync(imagePath)) {
            throw new Error(
                `Test image not found at ${imagePath}. ` +
                'Please add a non-personal test photo named "memory-book-photo.jpg" to the assets folder.'
            );
        }

        const buffer = fs.readFileSync(imagePath);
        const base64 = buffer.toString('base64');

        // Ruta típica en Android donde la galería busca imágenes
        await driver.pushFile('/sdcard/Pictures/memory-book-photo.jpg', base64);
    }

    /**
     * Garantiza que la app bajo prueba esté instalada desde el APK proporcionado.
     * Si ya está instalada, primero la desinstala y luego la vuelve a instalar.
     *
     * Ruta del APK:
     * - Por defecto: `apps/thegriefapp-qa.apk` relativa a la raíz del repo.
     * - Opcional: puedes sobreescribirla con la variable de entorno ANDROID_APP_APK.
     */
    async ensureFreshAppInstall() {
        const appPackage = 'com.thegriefapp.qa';
        const projectRoot = process.cwd();

        const apkRelative = process.env.ANDROID_APP_APK ?? 'apps/thegriefapp-qa.apk';
        const apkPath = path.resolve(projectRoot, apkRelative);

        if (!fs.existsSync(apkPath)) {
            throw new Error(
                `APK not found at ${apkPath}. ` +
                'Place your QA APK there or set ANDROID_APP_APK to a valid relative path.'
            );
        }

        const isInstalled = await driver.isAppInstalled(appPackage);

        if (isInstalled) {
            await driver.removeApp(appPackage);
        }

        await driver.installApp(apkPath);
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