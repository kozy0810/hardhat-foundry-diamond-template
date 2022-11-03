import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { verifyContract } from './9999_verify_all_facets'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const diamondCutFacet = await ethers.getContract('DiamondCutFacet')

  const diamond = await deploy('Diamond', {
    from: deployer,
    args: [deployer, diamondCutFacet.address],
    log: true,
    deterministicDeployment: true,
  })

  await verifyContract(hre, 'LiFiDiamond', {
    address: diamond.address,
    args: [deployer, diamondCutFacet.address],
  })
}

export default func
func.id = 'deploy_diamond'
func.tags = ['Diamond']