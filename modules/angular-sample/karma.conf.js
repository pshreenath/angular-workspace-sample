// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'src/test-config/test-polyfills.ts',
            'src/test-config/testbed-config.ts',
            'src/test-config/liferay-mock.js',
            { pattern: 'assets/app/**/*.html', served: true},
            'src/**/*.ts'
        ],
        exclude: [
            "src/index.ts",
            "src/app/dynamic.loader.ts"
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript'
        },
        reporters: ["progress", "kjhtml", "junit", "karma-typescript"],
        junitReporter: {
            outputDir: 'build/test-results/test',
            outputFile: "TESTS-angular_sample.xml",
            useBrowserName: false
        },
        client: {
            jasmine: {
                // you can add configuration options for Jasmine here
                // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
                // for example, you can disable the random execution with `random: false`
                // or set a specific seed with `seed: 4321`
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        proxies: {
            '/o/angular-sample/': '/base/assets/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        restartOnFileChange: true
    });
};