import { Company } from './company.model';

describe('Company', () => {
    it('Should create an instance', () => {
        expect(new Company('GGCorp', 'ggnore', 'https://ggcorp.org', [])).toBeTruthy();
    });
});
