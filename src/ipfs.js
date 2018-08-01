//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

//run with local daemon
const ipfsApi = require('ipfs-api');
const ipfs = new ipfsApi('localhost', '5001', {protocol: 'http'});

//export default ipfs;



const ipfs = new Ipfs({
  init: true,
  start: true,
  repo: 'ipfs-testing',
  config: {
  "Addresses": {
    "Swarm": [
      "/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss"
    ],
    "API": "",
    "Gateway": ""
  },
  "Discovery": {
    "MDNS": {
      "Enabled": false,
      "Interval": 10
    },
    "webRTCStar": {
      "Enabled": true
    }
  },
  "Bootstrap": [
    //"/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
    //"/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6"

    "/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd",
          "/dns4/sfo-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx",
          "/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3",
          "/dns4/sfo-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z",
          "/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
          "/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
          "/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm",
          "/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64"

  ]
}
})

const o = document.getElementById('out')
const s = document.getElementById('status')

ipfs.on('ready', () => {
  // API docs: https://github.com/ipfs/interface-ipfs-core/blob/master/README.md#api
  s.innerHTML = `Node status: ${ipfs.isOnline() ? 'online' : 'offline'}`
  o.innerHTML = `API: ${Object.keys(ipfs).filter(a => a[0] != '_').join(' | ')}\n\n`

  ipfs.id().then(i => o.innerHTML += JSON.stringify(i, null, 2) + '\n\n')

  ipfs.swarm.peers()
    .then(a => console.log(a))

  ipfs.files.add(new ipfs.types.Buffer(`Hello world! - ${Math.random().toString(36).slice(-8)}`))
    .then(i => i.pop().hash)
    .then(hash => {
      o.innerHTML += `You can find my randomly generated file <a target="_new" href="https://gateway.ipfs.io/ipfs/${hash}">here</a>!\n\n`
      return ipfs.files.cat(hash)
    })
    .then(s => {
      s.on('data', c => {
        console.log(c.toString())
        const i = c.toString()
        o.innerHTML += `It has these contents:\n${i}`
      })
    })
})
