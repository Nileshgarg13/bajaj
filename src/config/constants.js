exports.blockchain = {
  None: 'none',
  Ethereum: 'ethereum',
  Polygon: 'polygon',
  Cosmos: 'cosmos',
};

exports.rpc = {
  '1' : 'https://eth-mainnet.g.alchemy.com/v2/UeBOut-q5xqq5-vtg5zHpMpI1b8lcLcL',
  '5' : 'https://goerli.infura.io/v3/a703f70e85934fd481ed204c1bc0c8a2',
  '56' : 'https://bsc-dataseed1.binance.org/',
  '97' : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  '137' : 'https://polygon-rpc.com/',
  '80001' : 'https://rpc-mumbai.maticvigil.com/'
};

exports.uniswap = {
  V3_SWAP_ROUTER_ADDRESS: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
  POOL_FACTORY_CONTRACT_ADDRESS : '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  QUOTER_CONTRACT_ADDRESS : '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', 
};

exports.ERC20_ABI = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
];

exports.openoceanSwapTransactionUrl = `https://open-api.openocean.finance/v3/aptos/swap_quote`
exports.openoceanSwapQuoteUrl = `https://open-api.openocean.finance/v3/aptos/quote`

exports.aptos = {
  rpc : {
    '0' : 'https://fullnode.mainnet.aptoslabs.com/v1',
    '2' : 'https://fullnode.testnet.aptoslabs.com/v1',
    '1' : 'https://fullnode.devnet.aptoslabs.com/v1'
  },
  networks : {
    MAINNET : 0,
    TESTNET : 2,
    DEVNET : 1
  },

  exchanges : {
    'openocean' : { 
      aggregator : undefined,
      name : 'OpenOcean'  , 
      logoUrl : 'https://openocean.finance/favicon.ico' , 
    },
    'animeswap' : { 
      aggregator : undefined,
      name: 'Animeswap',
      logoUrl: 'https://stakingcrypto.info/static/assets/coins/animeswap-logo.png',
    },
    'cetus' : { 
      aggregator : undefined,
      name: 'Cetuss',
      logoUrl : 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1531916577-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F8SWjCXiKjhHxRWaXqCU9%252Ficon%252FsodkAqQEd7VW2REzhsk2%252F02.png%3Falt%3Dmedia%26token%3D699a1493-bd9f-4357-a9cd-1aa63fad2994',
    },
    'liquidswap' : { 
      aggregateor : undefined,
      name: 'Liquidswap',
      logoUrl : 'https://liquidswap.com/assets/logo-e5e3071b.svg',
    },
    'pontem' : { 
      aggregator : undefined,
      name: 'LiquidSwap',
      logoUrl : 'https://liquidswap.com/assets/logo-e5e3071b.svg',
    },
    'aptoswap' : {
      aggregator : undefined,
      name: 'AptosSwap',
      logoUrl : 'https://aptos-labs.github.io/aptos-docs/assets/img/logo.png',
    },
    'aux' : {
      aggregator : undefined,
      name: 'Aux',
      logoUrl : 'https://aux.exchange/assets/Logo.svg',
    },
    'basiq': {
      aggregator : undefined,
      name: 'Basiq',
      logoUrl : 'https://pbs.twimg.com/profile_images/1567087307924324355/pxLY4M2e_400x400.jpg'
    },
    'ditto': {
      aggregator : undefined,
      name: 'Ditto',
      logoUrl : 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3777222640-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FIHoym5dOuPb9MtI4rBqH%252Ficon%252FAkLY300EBjvvl6nOmth0%252FDitto_Icon_Colour.png%3Falt%3Dmedia%26token%3D232112b5-c30f-4d1d-8c62-ab24a98e9278'
    },
    'econia': {
      aggregator : undefined,
      name: 'Econia',
      logoUrl : 'https://avatars.githubusercontent.com/u/103609465?s=200&v=4'
    },
    'hippo': {
      aggregator : undefined,
      name: 'HippoSwap',
      logoUrl : 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F2745867896-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2Asg1Yb0LZl27c0EzcpZ%252Ficon%252FWtaiZbBWrFjB7DscokDo%252Fhippo_logo.ecded6bf411652de9b7f.png%3Falt%3Dmedia%26token%3Dcb005ff4-25c7-4233-9e0c-63ae7613f8ef'
    },
    'obric': {
      aggregator : undefined,
      name: 'Obric',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/obric?w=48&h=48'
    },
    'pancake': {
      aggregator : undefined,
      name: 'PancakeSwap',
      logoUrl: 'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1397868517-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MHREX7DHcljbY5IkjgJ%252Favatar-1602750187173.png%3Fgeneration%3D1602750187468978%26alt%3Dmedia',
    },
    'tortuga': {
      aggregator : undefined,
      name: 'Tortuga',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/22412.png'
    },
  },

  FAUCET_URL_DEVNET : "https://faucet.devnet.aptoslabs.com",

  NETWORKS_MAPPING : {
    TESTNET: 'testnet',
    DEVNET: 'devnet',
    MAINNET: 'mainnet'
  },
  TokensMapping_Devnet : {
    APTOS: '0x1::aptos_coin::AptosCoin', // APTOS
    USDT: '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::coins::USDT', //devnet USDT
  },

  fees :0,
  swapFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::SwapGPTAggregator::swap_to_address_with_fees",
  getQuoteUncoorelatedFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::AnimeLiquid::get_amount_out_Uncorrelated_fee",
  getQuoteStableFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::AnimeLiquid::get_amount_out_Stable_fee",
  getQuoteCetusFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::AnimeLiquid::get_amount_in_cetus_with_fee",
  getQuoteAuxFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::AnimeLiquid::get_amount_in_Aux_with_fee",
  getQuotePancakeFunction : "0x3aae94743a079b28e17ca4e9be6b6b62515221596ee3d6ae0bd88f90706ee2cf::AnimeLiquid::get_amount_in_pancake_with_fee",
  
  ANIME_SWAP : 9,
  CETUS_SWAP : 10,
  AUX_SWAP : 8,
  PANCAKE_SWAP : 11,

  UNCORRELATED_LIQUIDSWAP : 23,
  STABLE_LIQUIDSWAP : 13

}

exports.liquidswap = {
  MODULES_ACCOUNT : "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12",
  MODULES_ACCOUNT_V05 : "0x163df34fccbf003ce219d3f1d9e70d140b60622cb9dd47599c25fb2f797ba6e",
  
  RESOURCE_ACCOUNT : "0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948",
  RESOURCE_ACCOUNT_V05 : "0x61d2c22a6cb7831bee0f48363b0eec92369357aece0d1142062f7d5d85c7bef8",

  RESOURCE_ACCOUNT_DEVNET : "0xf5f11a0fa0ef6e2cd215d73cc3bd3c4cc2ad5b1c24625a690aadc9b13a57eaff",
  MODULES_ACCOUNT_DEVNET : "0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9",

  VERSION_0_5 : 0.5,
  VERSION_0 : 0,
}
