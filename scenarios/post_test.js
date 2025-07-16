import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const payload = JSON.stringify({
    title: 'k6 test post',
    body: 'This is a body from a k6 POST request.',
    userId: 101,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);

  check(res, {
    'POST Status is 201': (r) => r.status === 201,
    'POST Body contains id': (r) => r.json().hasOwnProperty('id'),
    'POST Title matches': (r) => r.json('title') === 'k6 test post',
  });

  sleep(1);
}