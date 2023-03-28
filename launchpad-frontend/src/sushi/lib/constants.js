import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}
/*
export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}*/

export const contractAddresses = {
  sushi: {
    1: '0x67c597624B17b16fb77959217360B7cD18284253', //mark token contract
  },
  masterChef: {
    1: '0x6544B1cd2d28C6c53B52A1fFb8E547740e426B33', // launchpad contract
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  usdc:{
    1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 18,
    lpAddresses: {
      1: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-ETH',
    symbol: 'MARK-ETH UNI-V2 LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  {
    pid: 19,
    lpAddresses: {
      1: '0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-USDC',
    symbol: 'MARK-USDC UNI-V2 LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
   {
    pid: 0,
    lpAddresses: {
      1: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    },
    tokenAddresses: {
      1: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    name: 'LINK-ETH',
    symbol: 'LINK-ETH UNI-V2 LP',
    tokenSymbol: 'LINK',
    icon: 'LINK',
    lpAddress: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    tokenAddress:'0x514910771af9ca656af840dff83e8264ecf986ca'
  },
   {
    pid: 1,
    lpAddresses: {
      1: '0xc2adda861f89bbb333c90c492cb837741916a225',
    },
    tokenAddresses: {
      1: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    },
    name: 'MKR-ETH',
    symbol: 'MKR-ETH UNI-V2 LP',
    tokenSymbol: 'MKR',
    icon: 'MKR',
    lpAddress: '0xc2adda861f89bbb333c90c492cb837741916a225',
    tokenAddress:'0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
  },
  {
    pid: 2,
    lpAddresses: {
      1: '0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f',
    },
    tokenAddresses: {
      1: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    },
    name: 'AAVE-ETH',
    symbol: 'AAVE-ETH UNI-V2 LP',
    tokenSymbol: 'AAVE',
    icon: 'AAVE',
    lpAddress: '0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f',
    tokenAddress:'0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0x43ae24960e5534731fc831386c07755a2dc33d47',
    },
    tokenAddresses: {
      1: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    },
    name: 'SNX-ETH',
    symbol: 'SNX-ETH UNI-V2 LP',
    tokenSymbol: 'SNX',
    icon: 'SNX',
    lpAddress: '0x43ae24960e5534731fc831386c07755a2dc33d47',
    tokenAddress:'0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f'
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0xdd71f5e002143d34ea24696600bc4d82b904fafa',
    },
    tokenAddresses: {
      1: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
    },
    name: 'renBTC-USDC',
    symbol: 'renBTC-USDC UNI-V2 LP',
    tokenSymbol: 'REN',
    icon: 'REN',
    lpAddress: '0xdd71f5e002143d34ea24696600bc4d82b904fafa',
    tokenAddress:'0xeb4c2781e4eba804ce9a9803c67d0893436bb27d'
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x2fdbadf3c4d5a8666bc06645b8358ab803996e28',
    },
    tokenAddresses: {
      1: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    },
    name: 'YFI-ETH',
    symbol: 'YFI-ETH UNI-V2 LP',
    tokenSymbol: 'YFI',
    icon: 'YFI',
    lpAddress: '0x2fdbadf3c4d5a8666bc06645b8358ab803996e28',
    tokenAddress:'0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e'
  },
  {
    pid: 6,
    lpAddresses: {
      1: '0x88d97d199b9ed37c29d846d00d443de980832a22',
    },
    tokenAddresses: {
      1: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
    },
    name: 'UMA-ETH',
    symbol: 'UMA-ETH UNI-V2 LP',
    tokenSymbol: 'UMA',
    icon: 'UMA',
    lpAddress: '0x88d97d199b9ed37c29d846d00d443de980832a22',
    tokenAddress:'0x04fa0d235c4abf4bcf4787af4cf447de572ef828'
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0xcffdded873554f362ac02f8fb1f02e5ada10516f',
    },
    tokenAddresses: {
      1: '0xc00e94cb662c3520282e6f5717214004a7f26888',
    },
    name: 'COMP-ETH',
    symbol: 'COMP-ETH UNI-V2 LP',
    tokenSymbol: 'COMP',
    icon: 'COMP',
    lpAddress: '0xcffdded873554f362ac02f8fb1f02e5ada10516f',
    tokenAddress:'0xc00e94cb662c3520282e6f5717214004a7f26888'
  },
  {
    pid: 8,
    lpAddresses: {
      1: '0xb9b752f7f4a4680eeb327ffe728f46666763a796',
    },
    tokenAddresses: {
      1: '0x56d811088235f11c8920698a204a5010a788f4b3',
    },
    name: 'BZRX-ETH',
    symbol: 'BZRX-ETH UNI-V2 LP',
    tokenSymbol: 'BZRX',
    icon: 'BZRX',
    lpAddress: '0xb9b752f7f4a4680eeb327ffe728f46666763a796',
    tokenAddress:'0x56d811088235f11c8920698a204a5010a788f4b3'
  },
  {
    pid: 9,
    lpAddresses: {
      1: '0xf49c43ae0faf37217bdcb00df478cf793edd6687',
    },
    tokenAddresses: {
      1: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    },
    name: 'KNC-ETH',
    symbol: 'KNC-ETH UNI-V2 LP',
    tokenSymbol: 'KNC',
    icon: 'KNC',
    lpAddress: '0xf49c43ae0faf37217bdcb00df478cf793edd6687',
    tokenAddress:'0xdd974d5c2e2928dea5f71b9825b8b646686bd200'
  },
  {
    pid: 17,
    lpAddresses: {
      1: '0x795065dcc9f64b5614c407a6efdc400da6221fb0',
    },
    tokenAddresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'SUSHI-ETH',
    symbol: 'SUSHI-ETH SLP',
    tokenSymbol: 'SUSHI',
    icon: 'SUSHI',
    lpAddress: '0x795065dcc9f64b5614c407a6efdc400da6221fb0',
    tokenAddress:'0x6b3595068778dd592e39a122f4f5a5cf09c90fe2'
  },
  {
    pid: 10,
    lpAddresses: {
      1: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
    },
    tokenAddresses: {
      1: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
    },
    name: 'AMPL-ETH',
    symbol: 'AMPL-ETH UNI-V2 LP',
    tokenSymbol: 'AMPL',
    icon: 'AMPL',
    lpAddress: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
    tokenAddress:'0xd46ba6d942050d489dbd938a2c909a5d5039a161'
  },{
    pid: 11,
    lpAddresses: {
      1: '0xf421c3f2e695c2d4c0765379ccace8ade4a480d9',
    },
    tokenAddresses: {
      1: '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
    },
    name: 'BAND-ETH',
    symbol: 'BAND-ETH UNI-V2 LP',
    tokenSymbol: 'BAND',
    icon: 'BAND',
    lpAddress: '0xf421c3f2e695c2d4c0765379ccace8ade4a480d9',
    tokenAddress:'0xba11d00c5f74255f56a5e366f4f77f5a186d7f55'
  },
  {
    pid: 12,
    lpAddresses: {
      1: '0x8878df9e1a7c87dcbf6d3999d997f262c05d8c70',
    },
    tokenAddresses: {
      1: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
    },
    name: 'LRC-ETH',
    symbol: 'LRC-ETH UNI-V2 LP',
    tokenSymbol: 'LRC',
    icon: 'LRC',
    lpAddress: '0x8878df9e1a7c87dcbf6d3999d997f262c05d8c70',
    tokenAddress:'0xbbbbca6a901c926f240b89eacb641d8aec7aeafd'
  },
  {
    pid: 13,
    lpAddresses: {
      1: '0x48e313460dd00100e22230e56e0a87b394066844',
    },
    tokenAddresses: {
      1: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    },
    name: 'OMG-ETH',
    symbol: 'OMG-ETH UNI-V2 LP',
    tokenSymbol: 'OMG',
    icon: 'OMG',
    lpAddress: '0x48e313460dd00100e22230e56e0a87b394066844',
    tokenAddress:'0xd26114cd6ee289accf82350c8d8487fedb8a0c07'
  },
  {
    pid: 14,
    lpAddresses: {
      1: '0xc6f348dd3b91a56d117ec0071c1e9b83c0996de4',
    },
    tokenAddresses: {
      1: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    },
    name: 'ZRX-ETH',
    symbol: 'ZRX-ETH UNI-V2 LP',
    tokenSymbol: 'ZRX',
    icon: 'ZRX',
    lpAddress: '0xc6f348dd3b91a56d117ec0071c1e9b83c0996de4',
    tokenAddress:'0xe41d2489571d322189246dafa5ebde1f4699f498'
  },
  {
    pid: 15,
    lpAddresses: {
      1: '0xe56c60b5f9f7b5fc70de0eb79c6ee7d00efa2625',
    },
    tokenAddresses: {
      1: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    },
    name: 'ENJ-ETH',
    symbol: 'ENJ-ETH UNI-V2 LP',
    tokenSymbol: 'ENJ',
    icon: 'ENJ',
    lpAddress: '0xe56c60b5f9f7b5fc70de0eb79c6ee7d00efa2625',
    tokenAddress:'0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c'
  },
  {
    pid: 16,
    lpAddresses: {
      1: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
    },
    tokenAddresses: {
      1: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
    name: 'UNI-ETH',
    symbol: 'UNI-ETH UNI-V2 LP',
    tokenSymbol: 'UNI',
    icon: 'UNI',
    lpAddress: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
    tokenAddress:'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
  },
]
