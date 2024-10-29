import { screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from '@/pages/error/components/NotFoundPage';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = await render(<NotFoundPage />);

  const button = await screen.getByRole('button', { name: 'Home으로 이동' });

  await user.click(button);

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: true });
});

/**
 * fireEvent vs userEvent
 * click 이벤트가 발생하면 pointerdown, mousedown, focus 등의 이벤트가 연쇄적으로 발생
 * fireEvent는 DOM 이벤트만 발생시켜 연쇄적으로 발생하는 이벤트 트리거가 안됨
 * userEvent에서는 모든 이벤트 및 disabled, display 상태도 고려하기 때문에 실제 상황과 유사하게 테스트 가능
 * 
 * userEvent에서 제공하지 않는 경우 fireEvent 활용
 */
