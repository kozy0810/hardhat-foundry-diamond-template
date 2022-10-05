import { Test1Facet } from '../../typechain/facets/Test1Facet';
import { deployments, network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';

describe('Test1Facet', async () => {
  let test1Facet: Test1Facet;
  let alice: SignerWithAddress

  const setupTest = deployments.createFixture(
    async ({ deployments, ethers }) => {
      await deployments.fixture(['InitialFacets', 'DeployDiamond', 'InitFacets', 'DeployTest1Facet'])
      const diamond = await ethers.getContract('Diamond');
      test1Facet = <Test1Facet>(
        await ethers.getContractAt('Test1Facet', diamond.address)
      );

      alice = (await ethers.getSigners())[0];
    }
  );

  beforeEach(async () => {
    await setupTest()
  });

  it('test example', async () => {
    expect((await test1Facet.test1Func1()).toString()).to.be.equal("1");
    expect((await test1Facet.test1Func2()).toString()).to.be.equal("2");
    expect((await test1Facet.test1Func3()).toString()).to.be.equal("3");
    expect((await test1Facet.test1Func4()).toString()).to.be.equal("4");
    expect((await test1Facet.test1Func5()).toString()).to.be.equal("5");
    expect((await test1Facet.test1Func6()).toString()).to.be.equal("6");
    expect((await test1Facet.test1Func7()).toString()).to.be.equal("7");
    expect((await test1Facet.test1Func8()).toString()).to.be.equal("8");
    expect((await test1Facet.test1Func9()).toString()).to.be.equal("9");
    expect((await test1Facet.test1Func10()).toString()).to.be.equal("10");
  })
})