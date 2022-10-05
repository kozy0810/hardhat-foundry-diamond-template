import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const diamondCutFacet = await ethers.getContract('DiamondCutFacet')

  await deploy('Diamond', {
    from: deployer,
    args: [deployer, diamondCutFacet.address],
    log: true,
    deterministicDeployment: true,
  })
}

export default func
func.id = 'deploy_diamond'
func.tags = ['Diamond']