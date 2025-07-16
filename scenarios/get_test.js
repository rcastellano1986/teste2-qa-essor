import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; 

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data), // Gera o relatório HTML
  };
}

export const options = {
  vus: 5,         // Usuários virtuais
  duration: '10s', // Duração do teste
  thresholds: {
    http_req_duration: ['p(95) < 2000'], //95% das requisicoes devem responder em até 2seg
    http_req_failed: ['rate<0.01'] //1% das requisicoes podem ocorrer erro
  }
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'GET Status is 200': (r) => r.status === 200,
    'GET Body contains title': (r) => r.json().hasOwnProperty('title'),
    'GET Response time is < 5000ms': (r) => r.timings.duration < 5000,
  });

  sleep(1); // Pausa de 1 segundo entre as iterações
}