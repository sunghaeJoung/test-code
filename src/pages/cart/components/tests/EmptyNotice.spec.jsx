import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는지 확인 -> 스파이 함수 사용
const navigateFn = vi.fn();

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 진행 ex) useNavigate
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  // 확인하고자 하는 함수를 스파이 함수로 전달
  return { ...original, useNavigate: () => navigateFn };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
