import { json } from '@sveltejs/kit'
import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'

dotenv.config()

const INFURA_API_KEY = process.env['INFURA_API_KEY']

export const POST: RequestHandler<
  void,
  { network: string; address: string; fragment: string; args: [] }
> = async ({ request }) => {
  const body = await request.json()
  console.info(
    `Reading contract data for 💎 diamond at ${body.address} on ${body.network || 'localhost'}`,
  )

  const address = body.address.toLowerCase()
  const abi = []
  const fragment = JSON.parse(body.fragment)
  abi.push(fragment)
  const args = body.args

  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['localhost'].rpcUrl
  rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  try {
    const funcFragment = ethers.utils.FunctionFragment.from(fragment)
    const method = funcFragment.format(ethers.utils.FormatTypes.minimal).split(' ')[1]
    console.log(method)
    const data = await diamondContract[method](...args)
    return json(data)
  } catch (e) {
    return json({
      reason: e.reason,
      code: e.code,
      value: e.value,
    })
  }
}
