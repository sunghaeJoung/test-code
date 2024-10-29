import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result :  훅을 호출하여 얻은 결과 반환 -> result.current 값을 통해 최신 상태 추적 가능
  // rerender : 훅을 원하는 인자와 함께 새로 호출하여 상태 갱신
  const { result, rerender } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);

  // act 함수 : 테스트 환경에서 컴포넌트를 렌더링한 뒤 업데이트 한 코드의 결과를 검증하고 싶을 때 사용 -> jsdom에 반영하기 위해 반드시 호출 해야 함
  // react-testing-library에서는 내부적으로 act 함수를 호출하여 반영
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
});
