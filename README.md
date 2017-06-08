# React Native continuous integrations tool
Change application bundle name and ID on the fly (build time) for both Android and IOS

Usage: react-native-ci-tools [options] [command]


  Commands:

    bundle <bundleId> <bundleName>  Change application bundle ID and name (display name)

  Options:

    -h, --help                             output usage information
    -i, --ios                              Appy changes to IOS project (IOS .plist files)
    -a, --android                          Appy changes to Android project (Android Manifest and Java classes)
    --directory <projectDirectory>         IOS project sub directory (relative)
    --iosSubDir <iosSubDirectory>          IOS project sub directory (relative)
    --androidSubDir <androidSubDirectory>  Android project sub directory (relative)


  Example:

    react-native-ci-tools bundle "MyApp.UAT" "APP UAT" -ia --directory /Users/mohamme89d/src/jenius/jenius2-apps