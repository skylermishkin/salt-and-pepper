// local imports
import product from 'math/product'


describe('product', function () {
    it('multiplies two integers correctly', function () {
        expect(product([3, 4])).to.equal(12)
    })


    it('multiplies three integers correctly', function () {
        expect(product([1, 4, -7])).to.equal(-28)
    })


    it('multiplies three floats reasonably well', function () {
        expect(product([-10.08, 4.1, 3])).to.be.closeTo(-123.984, 0.001)
    })
})
