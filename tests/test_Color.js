// local imports
import Color from 'game/Color'


describe('Color', function () {
    it('throws when not given proper arguments', function () {
        expect(() => Color([2])).to.throw()
        expect(() => Color(-2)).to.throw()
        expect(() => Color('a')).to.throw()
        expect(() => Color({})).to.throw()
        expect(() => Color(2.4)).to.throw()
        expect(() => Color([1, 2, 3])).to.throw()
        expect(() => Color(-1, 2, 3)).to.throw()
        expect(() => Color(1.1, 2, 3)).to.throw()
        expect(() => Color(1, 280, 3)).to.throw()
    })


    it('needs more tests')
})
