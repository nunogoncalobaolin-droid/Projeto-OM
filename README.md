# Projeto-OM
Projeto Multimédia 1º Período - programar com o apoio da IA

Nome da Aplicação / Dashboard Web: Rumo Socioeconómico
Disciplina: Oficina de Multimédia - 12.o Ano - CRSI
Ano Letivo: 2026/2027
Autor: Nuno Lin
Turma: 12ºB
Link da Aplicação Web: https://nunogoncalobaolin-droid.github.io/Projeto-OM/HTMLProjeto.html

1. Visão Geral do Projeto
Descrição: O Rumo Socioeconómico é uma aplicação web criada para alunos do Ensino Secundário que pensam seguir cursos de Ciências Socioeconómicas (Gestão, Economia, Finanças, Direito, Relações Internacionais, MAEG, etc.). O objetivo é ajudar o aluno em três momentos da decisão:

1.	Descobrir o curso: um questionário de 8 perguntas que, com base nas respostas, recomenda um de 12 perfis/cursos e sugere cursos relacionados.
2.	Médias & Universidades: um simulador onde o aluno introduz a média esperada e o curso pretendido e vê as universidades portuguesas onde a média é suficiente (com base nas médias de referência dos últimos 5 anos).
3.	Estudar na Europa: um explorador com 44 países, 312 universidades e 655 licenciaturas. O aluno escolhe o país e vê as universidades divididas por dificuldade de entrada (Difícil, Moderado, Fácil). Depois escolhe uma universidade e vê as licenciaturas abertas a alunos internacionais, com a língua de ensino e o link para cada curso.

   
2. Estrutura do Código e Funcionalidades Integradas
   
Cada aplicação tem o seu próprio jupyter notebook em python:
•	App1_Descobrir_Curso.ipynb: perguntas, informação dos 12 cursos, cálculo da pontuação e resultado.
•	App2_Medias_e_Universidades.ipynb: base de dados das universidades portuguesas, leitura e validação da média, comparação com as médias de referência.
•	App3_Estudar_na_Europa.ipynb: base de dados das universidades europeias com os cursos e respetivos links

As três aplicações foram ideias minhas, criados com o apoio da IA, no entanto, podemos identificar conteúdos trabalhados tanto no projeto 1 como no 2 como:
•	Input / Output e f-strings: todas as perguntas e resultados das três aplicações usam input() e print(f'...').
•	Dicionários aninhados: tal como o varDic_final da ficha, são a base do projeto. O DADOS_CURSOS guarda os 12 cursos, o BASE_DADOS_UNIVERSIDADES guarda as universidades portuguesas e a base de dados europeia organiza as universidades por país.
•	Funções de strings: .lower(), .upper(), .strip() e .replace() tratam as respostas do aluno, por exemplo para aceitar uma média escrita como "16,4".
•	if / elif / else: definem as regras de pontuação do questionário, decidem se a média é suficiente e separam as universidades pelos grupos de dificuldade.
•	Jogo Quiz: questionário.

HTML: passei as apps todas de python para HTML, cada parte com o seu próprio ficheiro:
•	Website / página inicial
•	App 1 (questionario.html)
•	App 2 (medias.html)
•	App 3 (europa.html)
•	Ficheiros de apoio: dados-europa.js (base de dados das 312 universidades) e fotos.js (fotografias das universidades).

Estilos (CSS):
•	Folha de estilos partilhada (Estilos.css): é comum a todas as páginas e define as cores principais (preto, grafite, prateado e branco), a barra de navegação, os botões, os cartões, o rodapé. Assim, todo o website tem o mesmo aspeto.
•	Cada página tem um estilo próprio: cada página tem ainda um bloco <style> com o que é só dela, por exemplo o carrossel na página inicial, as opções A–D no questionário ou os cartões das universidades na app da Europa.
•	Versão final: o conteúdo do Estilos.css foi incluído dentro de cada página HTML, para cada uma funcionar sozinha.



3. Registo de Utilização da IA
   
- Prompt para conversão Web/HTML
•	"Cria em Python, num Jupyter Notebook, um questionário para ajudar alunos do secundário a escolherem um curso da área socioeconómica. Deve ter 8 perguntas com 4 opções (A, B, C, D), mostradas uma de cada vez, e permite voltar à pergunta anterior. Cada resposta dá 2 pontos a um curso (Gestão, Economia, Finanças, Direito, Gestão de Empresas, Marketing, Contabilidade e Finanças, Recursos Humanos, Relações Internacionais, Gestão Industrial, MAEG ou Outra Área). No fim mostra o curso com mais pontos, uma descrição e cursos relacionados.
•	“Cria em Python, num Jupyter Notebook, um simulador de candidatura ao ensino superior. O aluno introduz a sua média esperada e escolhe um curso. O programa mostra as universidades portuguesas desse curso com base em médias dos últimos 5 anos, e diz se a média do aluno é suficiente”
•	"Cria em Python, num Jupyter Notebook, um explorador de universidades europeias na área socioeconómica para estudantes portugueses. O aluno escolhe um país da Europa e vê as universidades divididas em três grupos de dificuldade de entrada (difícil, moderado e fácil). Ao escolher uma universidade, vê os cursos disponíveis e as respetivas informações”
•	"agora preciso do código HTML de cada app"
•	"Cria um código em HTML para a página inicial do meu site, o nome é Rumo Socioeconómico e é para alunos do secundário escolherem cursos da área socioeconómica. Quero uma barra de navegação com o logótipo e separadores para as três aplicações: 1) Descobrir Curso, 2) Médias, 3) Universidades, Estudar na Europa, um título grande, um carrossel que mostre as três aplicações e widgets em baixo para cada aplicação. Usa o ficheiro CSS anexado para o estilo de todo o website."

- Prompt para ampliação e construção de funcionalidades
•	   "resolve os seguintes problemas na minha app das universidades de europa: não tenho os países todos a funcionar, nem as imagens das universidades, preciso que me resolvas esses problemas todos, através da tua pesquisa"
•	"em vez de escolher o curso primeiro, troca para o seguinte processo: após clicar no país, faz aparecer as universidades todas primeiro, e depois quando o aluno seleciona a universidade, faz aparecer o curso e o respetivo link, nota que quero apenas os cursos disponíveis para alunos internacionais"
•	"não faças o ranking pelo QS, divide só as universidades por dificuldade de entrada: difícil, moderado, fácil"
•	"adiciona à página inicial detalhes e informações como destinos mais populares, ranking de universidades europa top 10 na área de economia, etc"

- Dificuldades e erros corrigidos com a IA
•	Países sem dados: inicialmente só o Reino Unido e os Países Baixos tinham universidades. A base de dados foi completada para os 44 países e passou para um ficheiro próprio (dados-europa.js).
•	Ranking mundial: escolas especializadas como a Bocconi ou a HEC não aparecem no ranking QS geral. Decidi trocar o ranking por grupos de dificuldade de entrada, mais úteis para um aluno do secundário.
•	Imagens das universidades: muitas fotos não apareciam porque a imagem principal da Wikipédia era o logótipo ou o brasão. Foi criado o fotos.js, que procura em três fontes diferentes e escolhe fotografias de edifícios.
•	Erro na base de dados: alguns países tinham universidades sem dados, que foi corrigido com a IA.

- Otimização de Layout: O que sugeriste à IA para alterar no design - cores,
margens, fontes, botões?
•	Cores: fundo branco, detalhes a preto e widgets prateados, mantidos em todas as melhorias ("melhora a interface de todo o website, mantendo as cores principais").
•	Navegação: barra com botões para cada página, incluindo a Home.
•	Logótipo: pedi para tirar o ícone à esquerda.
•	Imagens: pedi um banner com fotografia na página inicial e fotografias reais das instituições, como a da LSE.
   
4. Estrutura de Ficheiros do Repositório - Listagem simples dos ficheiros presentes na pasta:
•	App1_Descobrir_Curso.ipynb: App 1 em Python
•	App2_Medias_e_Universidades.ipynb: App 2 em Python
•	App3_Estudar_na_Europa.ipynb: App 3 em Python 
•	questionario.html: App 1, Descobrir Curso
•	medias.html: App 2, Médias & Universidades
•	europa.html: App 3, Estudar na Europa
•	dados-europa.js: base de dados das 312 universidades europeias
•	fotos.js: procura automática das fotografias das universidades e cidades
•	README.md: este relatório do projeto


5. Reflexão Crítica e Aprendizagem
O que correu melhor foi o facto de as minhas ideias serem relativamente simples de concretizar, uma vez que, no fundo, as aplicações consistem sobretudo em conjuntos de dados organizados. Com a ajuda da IA, a pesquisa e organização dessa informação tornaram-se bastante mais simples.
A maior dificuldade foi gerir a utilização de tokens, pois precisei de realizar muita pesquisa, sobretudo na aplicação dedicada às universidades europeias. Além disso, as imagens nem sempre apareciam corretamente, o que me obrigou a fazer várias correções.
Quanto à forma como a IA mudou a minha maneira de programar, considero que, apesar de nem sempre apresentar a solução certa à primeira tentativa, tornou a resolução de problemas muito mais prática e eficiente. Posso apresentar vários erros de uma só vez e corrigi-los em conjunto, enquanto, sem a IA, teria de os identificar e resolver individualmente.

