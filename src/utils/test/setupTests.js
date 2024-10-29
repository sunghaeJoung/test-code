import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';

/* msw */
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

// 테스트의 안정성과 독립성을 보장하기 위해 테스트 이후 모킹 초기화하는 작업 필수
afterEach(() => {
  server.resetHandlers();
  // 모킹된 모의 객체 호출에 대한 히스토리 초기화
  // 모듈의 구현은 초기화 되지 않음 -> 모킹된 상태로 유지
  // 초기화하지 않으면 모킹 히스토리가 계속 쌓여 다른 테스트에 영향을 줄 수 있음
  vi.clearAllMocks();
});

afterAll(() => {
  // 모든 모듈에 대한 모든 구현 초기화
  vi.resetAllMocks();
  server.close();
});

vi.mock('zustand');

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
