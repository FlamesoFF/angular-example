// The attachment contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which attachment can be found in `.angular-cli.json`.

const environment = {
  production: false,

  auth: { 
    ip: '192.168.2.22',
    port: '8081'
  },

  api: {
    ip: '192.168.2.22',
    port: '8082'
  },

};

export default environment;