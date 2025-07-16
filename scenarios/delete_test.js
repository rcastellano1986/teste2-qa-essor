import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const res = http.del('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'DELETE Status is 200': (r) => r.status === 200,
    'DELETE Body is empty object': (r) => Object.keys(r.json()).length === 0,
  });

  sleep(1);
}