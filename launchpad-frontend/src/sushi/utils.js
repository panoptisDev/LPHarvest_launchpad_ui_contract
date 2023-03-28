import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { supportedPools } from './lib/constants'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}
export const getUsdcContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.usdc
}
export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (sushi) => {
  //console.log("SUPPORT POOLS", supportedPools)
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : supportedPools.map(({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          icon,
        }),
      )
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  //console.log("masterchef", masterChefContract, masterChefContract.methods.pendingMark )
  return masterChefContract.methods.pendingMark(pid, account).call();
  //console.log("MARK EARNED", markEarned)
  //return markEarned;
}

export const getEthPriceFromUniswap = async (wethContract, usdcContract) => {


  const lpContractWeth = await wethContract.methods
    .balanceOf("0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc")
    .call()

      const lpContractUsdc = await usdcContract.methods
      .balanceOf("0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc")
      .call()

      const wethAmount = new BigNumber(lpContractWeth).div(new BigNumber(10).pow(18)).toNumber()

      const usdcAmount = new BigNumber(lpContractUsdc).div(new BigNumber(10).pow(6)).toNumber()

      const ethPrice = parseFloat((usdcAmount/wethAmount).toFixed(2))

      //console.log("ETH PRICE?", (usdcAmount/wethAmount), wethAmount, usdcAmount )

      return ethPrice;
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  usdcContract,
  ethPrice,
  lpContract,
  tokenContract,
  pid,
) => {


//console.log("TOKEN/LP contracts", tokenContract, lpContract)
  //console.log("GET TOTAL LP VALUE", pid)
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

    //console.log("TOKEN AMOUNT WHOEL LP", pid, tokenAmountWholeLP)
  const tokenDecimals = await tokenContract.methods.decimals().call()

  //console.log("TOKEN DECIMALS", pid, tokenDecimals)
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()

    //console.log("token balance", pid, balance)
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  //console.log("Total supply", pid, totalSupply)
  //console.log("total supply", totalSupply)
  // Get total weth value for the lpContract = w1
  if (!ethPrice || isNaN(ethPrice)){
    ethPrice= await getEthPriceFromUniswap(wethContract, usdcContract)
    console.log("LOADED ETH PRICE FROM UNISWAP")
  }

  if (pid == 19 || pid==4){ // usdc pairs

    ///console.log("USDC PAIR")
    const lpContractUsdc = await usdcContract.methods
      .balanceOf(lpContract.options.address)
      .call()


      //console.log("LP contract USDC", pid, lpContractUsdc)
      
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpUsdcWorth = new BigNumber(lpContractUsdc)
    const totalLpUsdcValue = portionLp.times(lpUsdcWorth).times(new BigNumber(2))

    //console.log("TOTAL USDC POOL VALUE", totalLpUsdcValue.div(new BigNumber(10).pow(6)).toString())
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
      //console.log("Token amount", tokenAmount)
    const usdcAmount = new BigNumber(lpContractUsdc)
      .times(portionLp)
      .div(new BigNumber(10).pow(6))

      //console.log("usdc LP VALUE RET", tokenAmount.toString(), usdcAmount.toString(), pid)

     // console.log("USDC TOTAL VALUE", (totalLpUsdcValue).div(new BigNumber(10).pow(6)).toString())
      //console.log("USDC TOKEN PRICE", (usdcAmount).div(tokenAmount).div(ethPrice).toString(), ethPrice)
      //console.log("USDC AMOUNT", usdcAmount.toNumber())

    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: usdcAmount.div(ethPrice),
      totalWethValue: (totalLpUsdcValue).div(new BigNumber(10).pow(6)).div(ethPrice),
      tokenPriceInWeth: (usdcAmount).div(tokenAmount).div(ethPrice),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  } else {

    const lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()

      //console.log("LP contract weth", pid, lpContractWeth)

      //console.log("lp weth", lpContractWeth)

    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWethWorth = new BigNumber(lpContractWeth)
    const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

      //console.log("Token amount", tokenAmount)

    const wethAmount = new BigNumber(lpContractWeth)
      .times(portionLp)
      .div(new BigNumber(10).pow(18))

      //console.log("LP VALUE RET", tokenAmount.toString(), wethAmount.toString(), wethAmount.div(tokenAmount).toString(), pid)
    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount,
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
      tokenPriceInWeth: wethAmount.div(tokenAmount),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  //console.log("SUSHI CONTARCT", sushi.contracts.sushi)
  let totalSupply = await sushi.contracts.sushi.methods.totalSupply().call();
  console.log("TOTAL SUPPLY ", totalSupply, (new BigNumber(totalSupply)))
  return new BigNumber(totalSupply)
}





export const stake = async (masterChefContract, pid, amount, account) => {

    
  /*console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefContract.methods.poolInfo(0).call();
  console.log("GET POOL INFO", PoolInfo);*/

  console.log("STAKE", pid, amount)
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  //console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefContract.methods.poolInfo(0).call();
  //console.log("GET POOL INFO", PoolInfo);
  //console.log("CALLING GET STAKED")
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
