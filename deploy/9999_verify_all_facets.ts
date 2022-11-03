import { DeployFunction } from 'hardhat-deploy/types'
import { ethers, getNamedAccounts } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

export const verifyContract = async (
  hre: HardhatRuntimeEnvironment,
  name: string,
  options?: { address?: string, args?: any[] }
) => {
  if (hre.network.name === 'hardhat' || !process.env.VERIFY) {
    console.log('Verifying contracts is nothig')
    return
  }

  try {
    await hre.run('verify:verify', {
      address: options?.address || (await ethers.getContract(name)).address,
      constructorArguments: options?.args || []
    })
  } catch(e) {
    console.log(`Failed to verify contract: ${e}`)
  }
}

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { network } = hre
  if (network.name === 'hardhat') return

  const { deployer } = await getNamedAccounts()

  await verifyContract(hre, 'DaoDiamond', {
    args: [deployer, (await ethers.getContract('DiamondCutFacet')).address]
  })
}

export default func
func.id = 'verify_all_facets'
func.tags = ['VerifyAllFacets']