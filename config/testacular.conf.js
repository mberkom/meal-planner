basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'public/spec/e2e/**/*.js'
];

urlRoot = '/__testacular/'; 

autoWatch = false;

browsers = ['PhantomJS'];

singleRun = true;

proxies = {
  '/': 'http://localhost:3000/'
};

reporters = ['progress']

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
