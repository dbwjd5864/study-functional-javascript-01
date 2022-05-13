const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
// f에서 사용할 인자를 (a, ..._)받고
// 두개이상 인자가 있을 때 : _.length를 의미
//  f(a, ..._) :  받아 둔 함수 즉시 실행
// 아니라면 다시 한번 함수를 리턴

// 인자를 하나만 받으면 이후 인자를 받기로 기다리는 함수를 리턴
const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
