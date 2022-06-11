import { SSRStatus } from './status';

describe('SSRStatus constant', () => {
  describe('Queued', () => {
    it('should return expected string', () => {
      expect(SSRStatus.QUEUED).toBe('Queued');
    });
  });

  describe('In Progress', () => {
    it('should return expected string', () => {
      expect(SSRStatus.IN_PROGRESS).toBe('In Progress');
    });
  });

  describe('Success', () => {
    it('should return expected string', () => {
      expect(SSRStatus.SUCCESS).toBe('Success');
    });
  });

  describe('Failure', () => {
    it('should return expected string', () => {
      expect(SSRStatus.FAILURE).toBe('Failure');
    });
  });
});
