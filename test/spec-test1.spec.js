/* eslint-env mocha */
'use strict'

const { decodeText, encodeText } = require('../src/util')
const { expect } = require('aegir/utils/chai')
const multibase = require('../src')
const constants = require('../src/constants.js')
const input = 'Decentralize everything!!'
const encoded = [
  ['identity', '\x00Decentralize everything!!'],
  ['base2', '001000100011001010110001101100101011011100111010001110010011000010110110001101001011110100110010100100000011001010111011001100101011100100111100101110100011010000110100101101110011001110010000100100001'],
  ['base8', '72106254331267164344605543227514510062566312711713506415133463441102'],
  ['base10', '9429328951066508984658627669258025763026247056774804621697313'],
  ['base16', 'f446563656e7472616c697a652065766572797468696e672121'],
  ['base16upper', 'F446563656E7472616C697A652065766572797468696E672121'],
  ['base32', 'birswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb'],
  ['base32upper', 'BIRSWGZLOORZGC3DJPJSSAZLWMVZHS5DINFXGOIJB'],
  ['base32hex', 'v8him6pbeehp62r39f9ii0pbmclp7it38d5n6e891'],
  ['base32hexupper', 'V8HIM6PBEEHP62R39F9II0PBMCLP7IT38D5N6E891'],
  ['base32pad', 'cirswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb'],
  ['base32padupper', 'CIRSWGZLOORZGC3DJPJSSAZLWMVZHS5DINFXGOIJB'],
  ['base32hexpad', 't8him6pbeehp62r39f9ii0pbmclp7it38d5n6e891'],
  ['base32hexpadupper', 'T8HIM6PBEEHP62R39F9II0PBMCLP7IT38D5N6E891'],
  ['base32z', 'het1sg3mqqt3gn5djxj11y3msci3817depfzgqejb'],
  ['base36', 'k343ixo7d49hqj1ium15pgy1wzww5fxrid21td7l'],
  ['base36upper', 'K343IXO7D49HQJ1IUM15PGY1WZWW5FXRID21TD7L'],
  ['base58flickr', 'Ztwe7gVTeK8wswS1gf8hrgAua9fcw9reboD'],
  ['base58btc', 'zUXE7GvtEk8XTXs1GF8HSGbVA9FCX9SEBPe'],
  ['base64', 'mRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ'],
  ['base64pad', 'MRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ=='],
  ['base64url', 'uRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ'],
  ['base64urlpad', 'URGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ==']
]

describe('spec test1', () => {
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

      it('should prefix encoded Uint8Array', () => {
        const base = constants.names[name]
        const data = base.encode(encodeText(input))

        expect(decodeText(multibase(name, encodeText(data)))).to.equal(output)
      })

      it('should fail decode with invalid char', function () {
        if (name === 'identity') {
          return this.skip()
        }
        const nonEncodedBuf = encodeText(base.code + '^!@$%!#$%@#y')
        expect(() => {
          multibase.decode(nonEncodedBuf)
        }).to.throw(Error, 'invalid character \'^\' in \'^!@$%!#$%@#y\'')
      })
    })
  }
})
