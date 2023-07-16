const { join, resolve } = require('path');
const telescope = require('@osmonauts/telescope').default;
const contractsDir = '/Users/aswin/Documents/auranft/contract/cw721-base'
const contracts = [
  {
    name: 'aswin',
    dir: join(contractsDir, 'wasmswap')
  }
];

telescope({
  outPath: '/Users/aswin/Documents/auranft/frontend/output',
  options: {
    cosmwasm: {
      options: {
        useContractsHooks: {
          enabled: true
        },
        bundle: {
          enabled: true,
          bundleFile: 'cw721.ts',
          scope: 'contracts'
        },
        types: {
          enabled: true
        },
        client: {
          enabled: true
        },
        reactQuery: {
          enabled: false,
          optionalClient: true,
          version: 'v4',
          mutations: true
        },
        recoil: {
          enabled: false
        },
        messageComposer: {
          enabled: true
        }
      },
      contracts: [
        {
          name: 'CW721',
          dir: '/Users/aswin/Documents/auranft/contract/cw721-base/schema'
        },
      ],
      outPath: '/Users/aswin/Documents/auranft/frontend/output'
    }
  }
}).then(() => {
  console.log('✨ all done!');
}).catch(e=>{
  console.error(e);
});