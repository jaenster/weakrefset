import {WeakRefSet} from "../src";

describe('test', function () {


    const a = {}, b = {}, c = {}, d = undefined;
    const weakRefSet = new WeakRefSet([a, b]);

    it('add', function () {

        expect(weakRefSet.size).toBe(2);
        weakRefSet.add(a) // already in
        expect(weakRefSet.size).toBe(2);
        weakRefSet.add(c)
        expect(weakRefSet.size).toBe(3);
        weakRefSet.add(d) // doesnt work
        expect(weakRefSet.size).toBe(3);

    })

    test('for each / delete / has', function () {
        weakRefSet.forEach((value) => {
            expect(weakRefSet.size).toBe(3);
            expect(weakRefSet.has(value)).toBe(true);

            weakRefSet.delete(value);
            expect(weakRefSet.size).toBe(2);

            expect(weakRefSet.has(value)).toBe(false);

            weakRefSet.add(value);
            expect(weakRefSet.size).toBe(3);
        })
    })
});