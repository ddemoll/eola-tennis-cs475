# eola-tennis-cs475
<p align="center">
  <img src="https://lh3.googleusercontent.com/cFATyILPPw5j1fMfWyJFMQZRnji8LdwRazVS8ykp-8Bl6eNyvDRrdi5emXnpImNIUNc=s360-rw" alt="EolaTennis" title="EolaTennis">
</p>

### Available for iOS on the [App Store](https://itunes.apple.com/us/app/eola-tennis/id1399154275?mt=8) and Android on the [Google Play Store](https://play.google.com/store/apps/details?id=com.eolatennis&hl=en_US)

![Sreenshots](screenshots/iphones.png?raw=true)

## App Features

Eola Tennis features:
* Access all announcements and information
* View featured tennis players
* View schedule of all upcoming tournaments and events
* Contact page
* Admin log in to access CRUD capabilities

[![React Native][react_native-badge]][react_native-url]
[![iOS Platform][ios_platform-badge]][ios_platform-url]
[![Xcode][xcode-badge]][xcode-url]
[![Android Platform][android_platform-badge]][android_platform-url]
[![Android Studio][android_studio-badge]][android_studio-url]

## Project Architecture

`App` folder contains client react-native app. Let's walk through them in more detail. Start with `Containers/App.js` (described below) and work your way down the walkthrough in order.

### Containers

Containers are (mostly) full screens, although they can be sections of screens or application containers.

* `App.js` - main application. Redux store is created and configured here
* `RootContainer.js` - main view of the application
* `Styles` - styling for each of the above containers and screens

### Navigation

Your primary and other navigation components reside here.

* `NavigationDrawer.js` - loads in the initial screen and creates menu for to access each screen
* `Styles` - styling for the navigation

### Components

React components go here

### Themes

Styling themes used throughout your app styles.

* `ApplicationStyles.js` - app-wide styles
* `Colors.js` - defined colors for your app
* `Fonts.js` - defined fonts for your app
* `Images.js` - loads and caches images used in your app
* `Metrics.js` - useful measurements of things like navBarHeight

### Config

Initialize and configure things here.

* `AppConfig.js` - simple React Native configuration here
* `DebugConfig.js` - defines the debug environment

### Fixtures

Contains json files that mimic API responses for quicker development. These are used by the `Services/FixtureApi.js` object to mock API responses.

### Redux, Sagas

Contains the Redux and Redux-Sagas setup. Mananges asynchronous events such as fetching data.

### Services

Contains API service and other important utilities for the application.

* `Api.js` - main API service, providing an interface to communicate with AWS backend

### Lib

External modules used by the application such as the PayPal library

### Images

Contains actual images (usually png) used in the application.

---

`dev-env` folder contains development environment to test API locally

## How to run
- Clone repository and install dependencies:
    ```bash
    $ git clone https://github.com/ddemoll/eola-tennis-cs475.git
    $ cd eola-tennis-cs475
    $ npm install
    ```
    
- Create database and start dev server:
    ```bash
    $ mysql < eolatennisdevdb.sql
    $ cd eola-tennis-cs475/dev-env/server
    $ node server.js
    ```

- Run application
    ```bash
    $ react-native run-ios
    ```
    ```bash
    $ react-native run-android

[react_native-badge]: https://img.shields.io/badge/React%20Native-0.59.2-blue.svg?style=flat
[react_native-url]: https://facebook.github.io/react-native/
[ios_platform-badge]: https://img.shields.io/badge/iOS-10.0+-lightgrey.svg
[ios_platform-url]: https://developer.apple.com/
[xcode-badge]: https://img.shields.io/badge/Xcode-10.1+-lightgrey.svg
[xcode-url]: https://developer.apple.com/xcode/
[android_platform-badge]: https://img.shields.io/badge/Android-4.1+-green.svg
[android_platform-url]: https://developer.android.com/index.html
[android_studio-badge]: https://img.shields.io/badge/Android%20Studio-3.2.1+-green.svg
[android_studio-url]: https://developer.android.com/studio/install
