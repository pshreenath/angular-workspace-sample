# Sample Angular Module for Unit Testing


##### Install the karma-cli to get the karma commands:
> sudo npm i -g karma-cli

##### Run the karma wizard:

> karma init

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> `src/**/*.spec.ts`
> `src/**/*.ts`

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
> `src/index.ts`
> `src/polyfills.ts`

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes

#### Install karma-typescript plugin:

> npm i karma-typescript
>

1. Create a global file for storing js variables:

- Create liferay-mocks.js under src/test-config folder:

```
let Liferay = {
    Language: {
        get: function (key) {
            return key;
        }
    },
    ThemeDisplay: {
        getCompanyId: function () {
            return 'companyId';
        },
        getUserName: function () {
            return 'Test Test'
        }
    }
};
```

2. Modify the files entry in **karma.config.js** file to the following:
```
	files: [
		 'src/test-config/liferay-mocks.js',
		],
```
 
 
3. Also in karma.config.js file:

- Add karma-typescript in the framework entry:
> frameworks: ['jasmine','karma-typescript'],

- Add karma-typescript in preprocessors entry:
```
preprocessors: {
"**/*.ts": "karma-typescript"
},
```

- Add "kjhtml", "karma-typescript" in the reporters entry:
> reporters: ["progress","kjhtml", "karma-typescript"],
 
- Add this key (without this key we won't see the unit test in the browser, but only in the terminal):
	```
	client: {
		clearContext: false
	},
 
#### Configure testBed:
1. Create file testbed-config.ts under src/test-config folder:
```
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
BrowserDynamicTestingModule,
platformBrowserDynamicTesting()
);
```

2. Add this file in karma.conf.js, add this entry in the files key array at the beginning :
>'src/test-config/testbed-config.ts',

3. To use testbed we will need to use awaitSync, so configure zone.js,so create file test-polyfills.ts under src/spec/config:
```
import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
```

4. Add this file in karma.conf.js, add this entry in the files key array at the beginning :
> 'src/spec/config/test-polyfills.ts',

##### If your components use jquery, you will need to include jquery in karma:
1. Download jquery.min.js and jquery-ui.min.js and put them in 
> "src/test-config/js"

2. Add the file path in the files entry in karma.conf.js at the beginning:
>'src/spec/config/jquery/jquery-ui.min.js',

##### Location of test file
Your Unit test file *.spec.ts will reside in teh same folder as that of its corresponding source *.ts file 

##### Configure karma for npm test:
1. In package.json, under the scripts entry add the following:
> "test": "karma start"

2. Launching the test:
> npm test

