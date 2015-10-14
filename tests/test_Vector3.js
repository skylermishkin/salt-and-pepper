// local imports
import Vector3 from 'math/Vector3'


describe('Vector3', function () {
    it('throws when not given proper arguments', function () {
        expect(() => new Vector3([2])).to.throw()
        expect(() => new Vector3(2)).to.throw()
        expect(() => new Vector3('a', 2)).to.throw()
        expect(() => new Vector3('1', 4)).to.throw()
        expect(() => new Vector3(2, '2', 4)).to.throw()
        expect(() => new Vector3(2, 1, 4, 0)).to.throw()
    })


    it('exposes its first entry as `x`', function () {
        for (var i = 0; i < 100; i++) {
            const x = 100 * Math.random() * (1 - (2 * Math.random()))
            const v = new Vector3(x, 100 * Math.random(), 100 * Math.random())
            expect(v.x).to.equal(x)
            const x2 = 100 * Math.random() * (1 - (2 * Math.random()))
            v.x = x2
            expect(v.x).to.equal(x2)
        }
    })


    it('exposes its second entry as `y`', function () {
        for (var i = 0; i < 100; i++) {
            const y = 100 * Math.random() * (1 - (2 * Math.random()))
            const v = new Vector3(100 * Math.random(), y, 100 * Math.random())
            expect(v.y).to.equal(y)
            const y2 = 100 * Math.random() * (1 - (2 * Math.random()))
            v.y = y2
            expect(v.y).to.equal(y2)
        }
    })


    it('exposes its third entry as `z`', function () {
        for (var i = 0; i < 100; i++) {
            const z = 100 * Math.random() * (1 - (2 * Math.random()))
            const v = new Vector3(100 * Math.random(), 100 * Math.random(), z)
            expect(v.z).to.equal(z)
            const z2 = 100 * Math.random() * (1 - (2 * Math.random()))
            v.z = z2
            expect(v.z).to.equal(z2)
        }
    })
})
