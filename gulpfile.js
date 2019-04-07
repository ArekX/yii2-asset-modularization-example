/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

const fs = require('fs');
const childProcess = require('child_process');
const {
    parallel,
    task,
    series,
    watch
} = require('gulp');
const del = require('del');
const path = require('path');
const log = require('fancy-log');

const {
    outputPath,
    bundles,
    aliasMap,
    baseDir
} = require('./asset_config');

const destinationPath = resolvePath(outputPath);
let pathWatchList = [];

const [buildAll, buildAllDebug] = buildAllBundleTasks();

function watchFiles() {
    return watch(pathWatchList, buildAllDebug);
}

function clearDist() {
    return del([
        path.join(destinationPath, '/**'),
        '!' + destinationPath
    ], {force:true});
}

module.exports.watch = series(buildAllDebug, watchFiles);
module.exports.deploy = series(clearDist, buildAll);
module.exports.build = series(clearDist, buildAllDebug);

function buildAllBundleTasks() {
    const bundleTasks = [];
    const bundleDebugTasks = [];
    
    for(const [bundleTask, debugBundleTask] of Object.entries(bundles).map(buildBundleTask)) {
        if (bundleTask === null || debugBundleTask === null) {
            continue;
        }
        
        bundleTasks.push(bundleTask);
        bundleDebugTasks.push(debugBundleTask);
    }

    return [
        parallel(...bundleTasks),
        parallel(...bundleDebugTasks)
    ];
}

function buildBundleTask([bundleName, {pipeline, items, outputName}]) {
    if (items.length === 0) {
        return [null, null];
    }

    const inputFiles = items.map(resolvePath);

    pathWatchList = pathWatchList.concat(inputFiles);

    const pipelineConfig = {
        inputFiles,
        outputPath: destinationPath,
        outputName
    };

    const bundleTask = `bundle:${bundleName}`;
    const debugBundleTask = bundleTask + ':debug';

    task(bundleTask, () => pipeline(pipelineConfig));
    task(debugBundleTask, () => pipeline({...pipelineConfig, debugMode: true}));

    return [bundleTask, debugBundleTask];
}

function resolvePath(filePath) {
    var parts = filePath.split('/');

    if (parts[0].substr(0, 1) === '@') {

        if (!(parts[0] in aliasMap)) {
            throw new Error(parts[0] + ' is not defined in alias map!');
        }

        parts[0] = aliasMap[parts[0]];
    }

    parts.unshift(baseDir);

    const fullPath = path.join.apply(path, parts);

    if (fullPath.indexOf('*') === -1 && !fs.existsSync(fullPath)) {
        throw new Error('Cannot find file at: ' + fullPath);
    }

    if (fullPath.includes('@')) {
        return resolvePath(fullPath);
    }

    return fullPath;
}