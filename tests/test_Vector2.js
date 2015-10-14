// local imports
import Vector2 from 'math/Vector2'


describe('Vector2', function () {
    it('throws when not given proper arguments', function () {
        expect(() => new Vector2([2])).to.throw()
        expect(() => new Vector2(2)).to.throw()
        expect(() => new Vector2('a', 2)).to.throw()
        expect(() => new Vector2('1', 4)).to.throw()
        expect(() => new Vector2(2, 2, 4)).to.throw()
    })


    it('exposes its first entry as `x`', function () {
        for (var i = 0; i < 100; i++) {
            const x = 100 * Math.random() * (1 - (2 * Math.random()))
            const v = new Vector2(x, 100 * Math.random())
            expect(v.x).to.equal(x)
            const x2 = 100 * Math.random() * (1 - (2 * Math.random()))
            v.x = x2
            expect(v.x).to.equal(x2)
        }
    })


    it('exposes its second entry as `y`', function () {
        for (var i = 0; i < 100; i++) {
            const y = 100 * Math.random() * (1 - (2 * Math.random()))
            const v = new Vector2(100 * Math.random(), y)
            expect(v.y).to.equal(y)
            const y2 = 100 * Math.random() * (1 - (2 * Math.random()))
            v.y = y2
            expect(v.y).to.equal(y2)
        }
    })
})
