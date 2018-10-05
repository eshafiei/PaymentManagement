// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDENyWVV5h3P97n9FKDOabTOU4EibknoR4",
    authDomain: "remote-payment-processor.firebaseapp.com",
    databaseURL: "https://remote-payment-processor.firebaseio.com",
    projectId: "remote-payment-processor",
    storageBucket: "remote-payment-processor.appspot.com",
    messagingSenderId: "37829883538"
  }
};
