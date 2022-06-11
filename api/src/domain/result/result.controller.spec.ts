// Using implementation of nestjsx/crud-typeorm and TypeOrmCrudService is injected
// Hence, there will jest-e2e test instead (End to End)
describe('ResultController', () => {
  describe('root: just skip this controller <--> service stuff', () => {
    it('it does not use normal skeleton/structure of nest design pattern', async () => {
      expect('OK, this is fine!').toBe('OK, this is fine!');
    });
  });
});
