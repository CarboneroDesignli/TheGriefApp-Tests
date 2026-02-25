This folder is used for non-personal test media that the automated tests can safely upload.

Currently expected files:

- `memory-book-photo.jpg` — a generic, non-sensitive image used by the Memory Book scenarios.

How it is used:

- The step definition `I add a memory with a unique description and a photo` calls
  `AppiumUtils.uploadTestPhotoToDevice()`, which:
  - Reads `assets/memory-book-photo.jpg` from this repository.
  - Pushes it to the device/emulator at `/sdcard/Pictures/memory-book-photo.jpg`.
  - Then the app’s gallery UI is opened and the first image is selected.

To set this up:

1. Add any non-personal test image file to this folder named `memory-book-photo.jpg`.
2. Run the Memory Book Cucumber scenarios against an emulator or dedicated test device.

