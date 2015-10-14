// local imports
import mod from 'math/mod'


describe('mod', function () {
    it('correctly mods positive integers', function () {
        expect(mod(5, 2)).to.equal(1)
    })


    it('correctly mods a positive integer by a negative integer', function () {
        expect(mod(5, -2)).to.equal(-1)
    })


    it('correctly mods a negative integer by a positive integer', function () {
        expect(mod(-5, 2)).to.equal(1)
    })


    it('always returns a value between 0 and the modulus', function () {
        for (var i = 0; i < 100; i++) {
            const modulus = 100 * Math.random()
            expect(mod(100 * Math.random(), modulus)).to.be.within(0, modulus)
        }
    })
})
