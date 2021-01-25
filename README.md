# React Native bot

This code is the adaptation from the example code from https://blog.expo.io/so-you-want-to-build-a-chat-app-with-react-native-expo-and-microsofts-bot-framework-4d2327f76ce3 or https://github.com/watadarkstar/article-chat-bot using the latest expo and react framework.

Note: This app will is having issue of compile failure in version '0.13.1' of 'botframework-directlinejs' (version '0.9.14' seems ok)

## To run this project
1. `npm install expo-cli --global` (if you run expo for the first time)
2. `npm install`
3. `npm start`
4. Launch the iOS or Android simulator
5. On the generated browser page, click `Run on Android device/emulator`, `Run on iOS simulator` or `Ru nin web browser`.

## How this project was created

Command: `npx expo-cli init rr_msbot --npm`

### Addition modules after the project was generated
1. `npm install react-native-gifted-chat`
2. `npm install botframework-directlinejs`
