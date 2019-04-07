/**
 * by Aleksandar Panic
 * Company: 2amigOS!
 *
 **/

"use strict";

const {src, dest} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

module.exports = {
    jsPipeline: jsPipeline,
    sassPipeline: sassPipeline
};

function sassPipeline({inputFiles, debugMode, outputName, outputPath}) {
    let pipeline = src(inputFiles);

    if (debugMode) {
        pipeline = pipeline.pipe(sourcemaps.init());
    }

    pipeline = pipeline.pipe(concat(outputName));

    let sassStyle = debugMode ? {} : {outputStyle: 'compressed'};

    pipeline = pipeline.pipe(sass(sassStyle).on('error', sass.logError));

    if (debugMode) {
        pipeline = pipeline.pipe(sourcemaps.write('./'));
    }
        
    return pipeline.pipe(dest(outputPath));
}

function jsPipeline({inputFiles, debugMode, outputName, outputPath}) {
    let pipeline = src(inputFiles);

    if (debugMode) {
        pipeline = pipeline.pipe(sourcemaps.init());
    }
    
    pipeline = pipeline.pipe(concat(outputName));

    if (!debugMode) {
        pipeline = pipeline.pipe(uglify().on('error', function (e) {
            console.log(e);
        }));
    } else {
        pipeline = pipeline.pipe(sourcemaps.write('./'));
    }

    return pipeline.pipe(dest(outputPath));
}
