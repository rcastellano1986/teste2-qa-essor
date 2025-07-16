    A configuração do limite no duration deixou clara que 95% das requisições não estão respondendo conforme configurado no 
    thresholds, podemos concluir que a performance não está boa. 
    Das 39 interações nenhuma falharam. 
    http_req_failed: ['rate<0.01'] -> Definlçies que 1% das requisições podem ocorrer erro
    
   THRESHOLDS

    http_req_duration
    ✗ 'p(95) <100' p(95)=787.42ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......................: 114     10.314827/s
    checks_succeeded...................: 100.00% 114 out of 114
    checks_failed......................: 0.00%   0 out of 114

    ✓ GET Status is 200
    ✓ GET Body contains title
    ✓ GET Response time is < 5000ms

    HTTP
    http_req_duration.......................................................: avg=293.08ms min=163.06ms med=173.98ms max=1.74s p(90)=458.1ms p(95)=787.42ms
      { expected_response:true }............................................: avg=293.08ms min=163.06ms med=173.98ms max=1.74s p(90)=458.1ms p(95)=787.42ms
    http_req_failed.........................................................: 0.00%  0 out of 38
    http_reqs...............................................................: 38     3.438276/s

    EXECUTION
    iteration_duration......................................................: avg=1.38s    min=1.16s    med=1.17s    max=2.74s p(90)=1.81s   p(95)=2.28s
    iterations..............................................................: 38     3.438276/s
    vus.....................................................................: 1      min=1       max=5
    vus_max.................................................................: 5      min=5       max=5

    NETWORK
    data_received...........................................................: 37 kB  3.4 kB/s
    data_sent...............................................................: 3.9 kB 356 B/s


    Teste de fumaça

    Carga mínima = 1
    duração = 1 Minuto
    Consideração = 2 s
    Se durante um minuto tudo de comportar adequadamente que dizer que tanto a aplicação quanto o script

    Teste de carga

    Requisito não funcional
    - Deve poder cadastrar até 100 registros simultâneos

    O K6 vai ter um stage 
    1 minutos com carga de 100 
    2 minutos com permanecendo a carga de 100 
    1 minutos com redução gradual para 0

    Teste de stress

    Carga de 100 usuários a cada 2 minutos e permanece nesse nível por 5 minutos. 
    No estágio final o sistema está diminuindo gradualmente a carga para 0.
    Vai demorar durante 38 minutos

    Geração do arquivo html - get foi um exemplo

    import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; 

    export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data), // Gera o relatório HTML
  };
}