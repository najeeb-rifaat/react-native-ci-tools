#!/usr/bin/env node

const program = require('commander');

const bundle = require('./src/bundle');

const defaultIosProjectSubDir = 'ios';
const defaultAndroidProjectSubDir = 'android';

program
    .option('-i, --ios', 'Appy changes to IOS project (IOS .plist files)')
    .option('-a, --android', 'Appy changes to Android project (Android Manifest and Java classes)')
    .option('--directory <projectDirectory>', 'project main directory (absolute)')
    .option('--iosSubDir <iosSubDirectory>', 'IOS project sub directory (relative)')
    .option('--androidSubDir <androidSubDirectory>', 'Android project sub directory (relative)');

program
    .command('bundle')
    .arguments('<bundleId> <bundleName>')
    .usage('"MyApp.UAT" "APP UAT"')
    .description('Change application bundle ID and name (display name)')
    .action((bundleId, bundleName) =>
        bundle.processBundle({
            projectPath: program.directory || process.cwd(),
            iosProjectSubDir: program.iosSubDir || defaultIosProjectSubDir,
            androidProjectSubDir: program.androidSubDir || defaultAndroidProjectSubDir,
            displayName: bundleName,
            bundleId: bundleId,
            bundleName: bundleName
        })
    );

program.parse(process.argv);