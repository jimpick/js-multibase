/* eslint-env mocha */
'use strict'

const { decodeText, encodeText } = require('../src/util')
const { expect } = require('aegir/utils/chai')
const multibase = require('../src')
const constants = require('../src/constants.js')
const input = '\x00yes mani !'
const encoded = [
  ['identity', '\x00\x00yes mani !'],
  ['base2', '00000000001111001011001010111001100100000011011010110000101101110011010010010000000100001'],
  ['base8', '7000745453462015530267151100204'],
  ['base10', '90573277761329450583662625'],
  ['base16', 'f00796573206d616e692021'],
  ['base16upper', 'F00796573206D616E692021'],
  ['base32', 'bab4wk4zanvqw42jaee'],
  ['base32upper', 'BAB4WK4ZANVQW42JAEE'],
  ['base32hex', 'v01smasp0dlgmsq9044'],
  ['base32hexupper', 'V01SMASP0DLGMSQ9044'],
  ['base32pad', 'cab4wk4zanvqw42jaee======'],
  ['base32padupper', 'CAB4WK4ZANVQW42JAEE======'],
  ['base32hexpad', 't01smasp0dlgmsq9044======'],
  ['base32hexpadupper', 'T01SMASP0DLGMSQ9044======'],
  ['base32z', 'hybhskh3ypiosh4jyrr'],
  ['base36', 'k02lcpzo5yikidynfl'],
  ['base36upper', 'K02LCPZO5YIKIDYNFL'],
  ['base58flickr', 'Z17Pznk19XTTzBtx'],
  ['base58btc', 'z17paNL19xttacUY'],
  ['base64', 'mAHllcyBtYW5pICE'],
  ['base64pad', 'MAHllcyBtYW5pICE='],
  ['base64url', 'uAHllcyBtYW5pICE'],
  ['base64urlpad', 'UAHllcyBtYW5pICE=']
]

describe('spec test4', () => {
  for (const [name, output] of encoded) {
    const base = constants.names[name]

    describe(name, () => {
      it('should encode Uint8Array by base name', () => {
        const out = multibase.encode(name, encodeText(input))
        expect(decodeText(out)).to.equal(output)
      })

      it('should encode Uint8Array by base code', () => {
        const out = multibase.encode(base.code, encodeText(input))
        expect(decodeText(out)).to.equal(output)
      })

      it('should decode string', () => {
        const out = multibase.decode(output)
        expect(decodeText(out)).to.equal(input)
      })
    })
  }
})
