import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const payload = JSON.stringify({
    id: 1, // O ID do recurso a ser atualizado
    title: 'k6 test put updated',
    body: 'This body was updated by a k6 PUT request.',
    userId: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.put('https://jsonplaceholder.typicode.com/posts/1', payload, params);

  check(res, {
    'PUT Status is 200': (r) => r.status === 200,
    'PUT Title is updated': (r) => r.json('title') === 'k6 test put updated',
  });

  sleep(1);
}