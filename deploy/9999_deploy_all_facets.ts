import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function () {
  console.log('All facets deployed!')
}
export default func
func.id = 'deploy_all_facets'
func.tags = ['DeployAllFacets']
func.dependencies = [
  'DiamondFactory',
  'OffchainVotingFacet'
]