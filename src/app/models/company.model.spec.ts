import { Company } from './company.model';

describe('Company', () => {
    it('Should create an instance', () => {
        expect(new Company("0", "GGCorp", "ggnore")).toBeTruthy();
    });
});