/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { baseSepolia } from 'viem/chains'
import { pinata } from 'frog/hubs'

import { abi
} from './abi.js'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: pinata(),
  title: 'Ham Pepe Test Mints',
})


app.frame('/', (c) => {

  return c.res({
    //action: '/finish',
    image: `https://azure-ready-parakeet-471.mypinata.cloud/ipfs/QmW5n96dcHTrQkEBbsAA2qyRpRfFcsM6GVseZ8wy7v5t9Q`,
    imageAspectRatio: '1:1',
    intents: [
      <Button.Transaction target="/freeMint">Free Mint</Button.Transaction>,
      <Button.Transaction target="/publicMint1">Mint 1</Button.Transaction>,
      <Button.Transaction target="/publicMint2">Mint 2</Button.Transaction>,
      <Button.Transaction target="/publicMint4">Mint 4</Button.Transaction>,
      //status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/finish', (c) => {
  const { transactionId } = c
  return c.res({
    image: (
      <div
 style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
      </div>
    )
  })
})


app.transaction('/freeMint', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'freeMint',
    args: [1],
    chainId: `eip155:${baseSepolia.id}`,
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
  })
})

app.transaction('/publicMint1', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'publicMint',
    args: [1],
    chainId: `eip155:${baseSepolia.id}`,
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
    value: parseEther('0.003')
  })
})

app.transaction('/publicMint2', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'publicMint',
    args: [2],
    chainId: `eip155:${baseSepolia.id}`,
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
    value: parseEther('0.006')
  })
})

app.transaction('/publicMint4', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'publicMint',
    args: [4],
    chainId: `eip155:${baseSepolia.id}`,
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
    value: parseEther('0.012')
  })
})



devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

