# React Native Web UTF8Map
An infinite scrolling example app with React Native + React Native Web

![UTF8Map ReactJS, ReactNative, React Native Web](https://cloud.githubusercontent.com/assets/8074/14461026/0d960ecc-00c1-11e6-8c05-a0a486170081.gif)

Are you undecided between the Web and Native or both? With UTF8Map you get an idea of the performance you could get and the code base is the same, you just have to choose to render the code in a WebView or in Native.

## Usage

Setup the environment, Android SDK, Xcode, and..
```
npm install -g react-native
npm install
```

### Run on the Web
```
npm run start
```

### Run inside Cordova Android (WebView)

You need to `npm run start` in another console and put you development computer ip in `cordova/www/js/index.js`

```
cordova:android:start
```

### Run on Android (native or simulator)
```
react-native run-android
```

### Run on iOS (simulator)
```
react-native run-ios
```

### License

MIT License (c) 2016 Luigi Maselli https://corso-javascript.it / https://grigio.org
