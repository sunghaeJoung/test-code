import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

/**
 * AAA 패턴으로 테스트 작성하기
 * Arrange : 테스트를 위한 환경 만들기 (컴포넌트 렌더링)
 * Act: 테스트할 동작 발생 (클릭, 타이핑, 메서드 호출 등)
 * Assert : 올바른 동작이 실행되었는지 확인
 */

/**
 * setup : 테스트를 실행하기 전 수행해야 하는 작업
 * ex) beforeEach : 각 테스트 실행 전 실행, beforeAll : 모든 테스트 실행 전 1번 실행
 * teardown : 테스트를 실행한 후 수애해야 하는 작업
 * ex) afterEach : 각 테스트 실행 후 실행, afterAll : 모든 테스트 실행 후 1번 실행
 * 전역으로 설정하고 싶을 때 setupTests.js 파일에 작성
 */

// 매 테스트 전 test-class가 포함된 컴포넌트 렌더링
// beforeEach(async () => {
//   await render(<TextField className="test-class" />);
// });

// it : 테스트를 위한 기대결과 작성. 기대결과 === 실제결과 테스트 성공
// it, test : 동일한 함수. 테스트 케이스의 디스크립션을 어떻게 작성하는지의 차이여서 가독성 좋은걸로 사용
it('className prop으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className="test-class" />);

  // screen.debug(); // jsdom 구조 확인

  // 테스트 하고자 하는 요소 찾기
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  expect(textInput).toHaveClass('test-class');
});

// describe : 테스트 그룹화. 여러개의 테스트를 그룹화 할때 사용
describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // expect로 단언 실행 가능
    // 단언(assertion) : 테스트가 통과하기 위한 조건 => 검증 실행
    // 매처(matcher) : 단언을 실행하기 위한 함수 === 기대결과를 확인하기 위해 사용하는 api 집합. 기본 매처를 확장하여 단언 실행 가능
    expect(textInput).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 변경해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 변경해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  // 스파이 함수 : 테스트 코드에서 함수가 호출되었는지, 어떤 인자가 넘어왔는지, 호출된 인자가 무엇인지 등을 확인할 수 있는 함수
  const spy = vi.fn();
  const { user } = await render(<TextField onChange={spy} />);

  // 요소를 찾는 api에는 여러가지가 있음. 공식문서에서 api별 우선 순위 확인
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('Enter 키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // Shift, Space, Alt 도 동일하게 '{}'로 감싸서 작성
  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  // 포커스 활성화
  // 1. 탭 키로 인풋 요소로 포커스 이동
  // 2. 인풋 요소를 클릭했을 때
  // 3. textInput.focus()로 직접 발생

  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // 두번째 케이스로 포커스 이벤트 발생
  await user.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: 2,
    borderColor: 'rgb(25, 118, 210)',
  });
});
