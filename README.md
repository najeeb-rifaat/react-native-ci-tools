# React Native continuous integrations tool 
[![Build Status](https://travis-ci.org/najeeb-rifaat/react-native-ci-tools.svg?branch=master)](https://travis-ci.org/najeeb-rifaat/react-native-ci-tools) | [![Coverage Status](https://coveralls.io/repos/github/najeeb-rifaat/react-native-ci-tools/badge.svg)](https://coveralls.io/github/najeeb-rifaat/react-native-ci-tools) | [![npm version](https://badge.fury.io/js/react-native-ci-tools.svg)](https://badge.fury.io/js/react-native-ci-tools)

Change application bundle name and ID on the fly (build time) for both Android and IOS

Usage: react-native-ci-tools [options] [command]


  Commands:

    bundle <bundleId> <bundleName>  Change application bundle ID and name (display name)

  Options:

    -h, --help                             output usage information
    -i, --ios                              Appy changes to IOS project (IOS .plist files)
    -a, --android                          Appy changes to Android project (Android Manifest and Java classes)
    --directory <projectDirectory>         project main directory (absolute)
    --iosSubDir <iosSubDirectory>          IOS project sub directory (relative)
    --androidSubDir <androidSubDirectory>  Android project sub directory (relative)


  Example:

    * feed in project location [Ios and Android]
    react-native-ci-tools bundle "MyApp.UAT" "APP UAT" -ia --directory /Users/myUser/src/Cool/Project

    * without project location (automatically use current location) [Ios and Android]
    react-native-ci-tools bundle "BigApp.Build.300" "BIG App 300" -ia 

    * with project location but chnage android only [Android (-a flag)]
    react-native-ci-tools bundle "NANdroid.X" "NANdroid X" -a