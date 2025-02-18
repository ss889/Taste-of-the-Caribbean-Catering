import 'dotenv/config';

export default {
  "expo": {
    "name": "Taste of the Caribbean Market",
    "slug": "toc-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera so restaurant staff can add new menu items, including pictures for those items.",
        "CFBundleAllowMixedLocalizations": true,
        "CFBundleLocalizations": ["en"]
      },
      "supportsTablet": true,
      "usesAppleSignIn": true,
      "bundleIdentifier": "com.toc.tasteofthecaribbean",
      "buildNumber": "5"
    },
    "android": {
      "package": "com.toc.tasteofthecaribbean",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff",
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-apple-authentication",
      "expo-font",
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": "merchant.com.tasteofthecaribbeanfoodmarket",
          "enableGooglePay": true
        }
      ],
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      "eas": {
        "projectId": "6c812b1d-e0ed-4d46-9c0c-7e3dbedfb4db"
      }
    }
  }
}
