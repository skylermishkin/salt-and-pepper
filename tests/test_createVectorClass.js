// local imports
import createVectorClass from 'math/createVectorClass'


describe('createVectorClass', function () {
    // to be assigned in `beforeEach`
    let Vector
    let length


    beforeEach(function() {
        length = Math.ceil(100 * Math.random())
        Vector = createVectorClass(length)
    })



    it('throws when not given proper arguments', function () {
        expect(() => createVectorClass([2])).to.throw()
        expect(() => createVectorClass(-2)).to.throw()
        expect(() => createVectorClass('a')).to.throw()
        expect(() => createVectorClass({})).to.throw()
        expect(() => createVectorClass(2.4)).to.throw()
    })


    describe('the returned class', function() {
        it('exposes the length as a static property', function() {
            expect(Vector.length).to.equal(length)
        })


        it('is important that this get more tests')
    })
})
