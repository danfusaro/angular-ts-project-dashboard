import { StatusStringPipe } from './status-string.pipe';

describe('StatusStringPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusStringPipe();
    expect(pipe).toBeTruthy();
  });
});
