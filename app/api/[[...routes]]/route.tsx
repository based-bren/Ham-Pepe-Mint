/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from 'frog'
import { devtools } from 'frog/dev'
//import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

import { abi
} from './abi.js'
//import { Asap } from 'next/font/google/index.js'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {

  return c.res({
    //action: '/finish',
    image: `https://azure-ready-parakeet-471.mypinata.cloud/ipfs/QmW5n96dcHTrQkEBbsAA2qyRpRfFcsM6GVseZ8wy7v5t9Q`,
    imageAspectRatio: '1:1',
    intents: [
      <TextInput placeholder="type 1 to 4 public mints" />,
      <Button.Transaction target="/freeMint">Free Mint</Button.Transaction>,
      <Button.Transaction target="/publicMint">Public Mint</Button.Transaction>,
      <Button.Transaction target="/devMint">Dev Mint</Button.Transaction>,
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
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'freeMint',
    args: [1],
    chainId: 'eip155:84532',
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
  })
})

app.transaction('/publicMint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'publicMint',
    args: [inputText],
    chainId: 'eip155:84532',
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
  })
})

app.transaction('/devMint', (c) => {
  const { inputText } = c
  // Contract transaction response.
  return c.contract({
    abi,
    functionName: 'devMint',
    args: [inputText],
    chainId: 'eip155:84532',
    to: '0x18bbB7aF32317ea69CA7850A4602956534EBd10A',
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
