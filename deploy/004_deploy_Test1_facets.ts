import { ethers } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { addOrReplaceFacets } from '../utils/diamond'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy('Test1Facet', {
    from: deployer,
    log: true,
    deterministicDeployment: true,
  })

  const test1Facet = await ethers.getContract('Test1Facet')

  const diamond = await ethers.getContract('Diamond')

  await addOrReplaceFacets([test1Facet], diamond.address)
}
export default func
func.id = 'deploy_test1_facet'
func.tags = ['DeployTest1Facet']
func.dependencies = ['Diamond']