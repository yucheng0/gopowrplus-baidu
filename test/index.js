// import assert from 'assert'
const assert = require('assert')
// import sum from './sum.js'
const sum = require('./sum.js')
describe('大組', () => {
    it('sum(0,0)=0', () => {
        assert.strictEqual(sum(0, 0), 0)
    })

    it('sum(1,2)=3', () => {
        assert.strictEqual(sum(1, 2), 3)
    })
})