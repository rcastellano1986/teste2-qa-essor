import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages:[
    {duration: '1m', target: 100}, //O k6 vai ser um minuto para carregar 100 requisições simultâneas
    {duration: '2m', target: 100},
    {duration: '1m', target: 0}
  ],  
  
  thresholds: {
      http_req_duration: ['p(95) < 2000'], //95% das requisicoes devem responder em até 2sg
      http_req_failed: ['rate<0.01'] //1% das requisicoes podem ocorrer erro
  }
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