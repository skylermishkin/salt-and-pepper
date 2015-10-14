// local imports
import sum from 'math/sum'


describe('sum', function () {
    it('adds two integers correctly', function () {
        expect(sum([1, 4])).to.equal(5)
    })


    it('adds three integers correctly', function () {
        expect(sum([1, 4, -7])).to.equal(-2)
    })


    it('adds three floats reasonably well', function () {
        expect(sum([-10.08, 4.1, 3])).to.be.closeTo(-2.98, 0.001)
    })
})
