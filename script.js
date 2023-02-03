const cursos = [

  {nome: "HTML e CSS", descricao: "Aprenda a fazer marcações web e personalizá-las", duracao: "1 mês", valor: 500},
  {nome: "JavaScript", descricao: "Aprenda a língua mais fácil do frontend!", duracao: "2 meses", valor: 900},
  {nome: "APIsRest", descricao: "Aprenda várias linguagens! Nenhuma delas te faz falar com gente!", duracao: "6 mese", valor: 2000}
]

const turmas = [

  {nome: "Hipátia", curso: "JavaScript", inicio: "30/11/2022", termino: "30/01/2023", quantAlunos: 150, periodo: "noturno", conclusao: false},
  {nome: "Sibyla", curso: "JavaScript", inicio: "30/10/2022", termino: "30/12/2022", quantAlunos: 200, periodo: "integral", conclusao: false},
  {nome: "Curie", curso: "HTML e CSS", inicio: "15/09/2022", termino: "15/10/2022", quantAlunos: 180, periodo: "noturno", conclusão: true},
  {nome: "Zhenyi", curso: "HTML e CSS", inicio: "01/11/2022", termino: "01/01/2023", quantAlunos: 80, periodo: "noturno", conclusao: false},
  {nome: "Clarke", curso: "HTML e CSS", inicio: "04/07/2022", termino: "04/09/2022", quantAlunos: 200, periodo: "noturno", conclusao: true},
  {nome: "Blackwell", curso: "APIsRest", inicio: "20/03/2022", termino: "20/06/2022", quantAlunos: 100, periodo: "integral", conclusao: true},
  {nome: "Elion", curso: "APIsRest", inicio: "12/01/2022", termino: "12/06/2022", quantAlunos: 200, periodo: "noturno", conclusao: true},
  {nome: "Burnell", curso: "APIsRest", inicio: "18/10/2022", termino: "18/04/2023", quantAlunos: 90, periodo: "intregral", conclusao: false}
]

let estudantes = [
  
  {nome: "Chris Evans", curso: "JavaScript", turma: "Hipátia", parcelas: 4, valorParcela: "R$100,00", desconto: false, valorTotal: "R$900,00"},
  {nome: "Halle Berry", curso: "APIsRest", turma: "Burnell", parcelas: 4, valorParcela: "R$500,00", desconto: false, valorTotal: "R$2000,00"},
  {nome: "Lashana Lynch", curso: "HTML e CSS", turma: "Zhenyi", parcelas: 1, valorParcela: "R$400,00", desconto: true, valorTotal: "R$500,00"}
]
  
//Turmas
 
const input = document.getElementById("busca")
const botaoBuscar = document.getElementById("search-button")

if (botaoBuscar) {
  botaoBuscar.addEventListener("click", () => {
    buscarTurma(input.value);
    input.value = ""
  })
}

const gerarCard = (turmaBuscadas) => {
  const cards = turmaBuscadas.map((turma) => {
    return `
      <div>
          <ul>
              <h3>${turma.nome}</h3>
              <li><b>Curso: </b>${turma.curso}</li>
              <li><b>Início: </b>${turma.inicio}</li>
              <li><b>Termino: </b>${turma.termino}</li>
              <li><b>Número de alunos: </b>${turma.quantAlunos}</li>
              <li><b>Período: </b>${turma.periodo}</li>
              <li><b>Concluido: </b>${turma.conclusao ? "Sim" : "Não"}</li>
          </ul>
      </div>`
  })
  return cards.sort()
}

const buscarTurma = (nomeTurma) => {
  const inputTurmas = document.getElementById("turmas-cards")
  const filtrarTurma = turmas.filter((turmaProcurada) => turmaProcurada.nome.toLowerCase().includes(nomeTurma.toLowerCase()))

  if(filtrarTurma == "" && nomeTurma.length > 0) {
    inputTurmas.innerHTML = ""
    return Swal.fire(
      'Turma não encontrada.',
      'Digite outra turma.',
      'error'
    )
  }else {
    inputTurmas.innerHTML = ""
    const cards = gerarCard(filtrarTurma);
    cards.forEach((element) => {inputTurmas.innerHTML += element;})
  }
}


  
//Matricula
  
const botaoMatricula = document.getElementById("matricula-button")

if (botaoMatricula) {
  botaoMatricula.addEventListener("click", (event) => {
    event.preventDefault()
     matricular()
  })
}

const matricular = () => {
  const mNome = document.getElementById("nome").value
  const mCurso = document.getElementById("cursoM").value
  const mTurma = document.getElementById("turmaM").value
  const mNParcelas = Number(document.getElementById("parcela").value)
  const alunoMatriculado = document.getElementById("matricula-result")

  if (!mNome || !mCurso || !mTurma || !mNParcelas) {
    return Swal.fire('Preencha todos os campos.')
  }

  let novaMatricula = {
    nome: mNome,
    curso: mCurso,
    turma: mTurma,
    parcelas: mNParcelas
  }

  if (localStorage.hasOwnProperty("estudantes")) {
    estudantes = JSON.parse(localStorage.getItem("estudantes"))
  } 

  estudantes.push(novaMatricula)
  localStorage.setItem('estudantes', JSON.stringify(estudantes))
  document.querySelector('form').reset()
  
  alunoMatriculado.innerHTML =
  `<h2 class="titulo-confirmacao"> Aluno matriculado  <img src="/media/Vector.png" id="confirma"></h2> 
  <ul>
    <li><b>Nome:</b> ${mNome}</li>
    <li><b>Curso:</b> ${mCurso}</li>
    <li><b>Turma:</b> ${mTurma}</li>
  </ul>`
}
  
//RELATÓRIO

const relatorioButton = document.getElementById("buscar-aluno")
const nomeEstudante = document.getElementById("input-aluno")
const relatorioAluno = document.getElementById("resul-relatorio")

if (relatorioButton) {
  relatorioButton.addEventListener("click", () => {
    buscarEstudante(nomeEstudante.value)
    nomeEstudante.value = ""
  })
}

const buscarEstudante = (nomeEstudante) => {
  if (localStorage.hasOwnProperty("estudantes")) {
    estudantes = JSON.parse(localStorage.getItem("estudantes"))
  } 
  
  const result = estudantes.find(obj => obj.nome.toLowerCase().includes(nomeEstudante.toLowerCase()))
  
  if (typeof result == "undefined") {
    Swal.fire(
      'Aluno não encontrado.',
      'Digite outro nome.',
      'error'
    )
  }else if(!nomeEstudante) {

    return Swal.fire('Digite um nome.')
  }else {
    let mensagemRelatorio = 
      `<ul>
        <li><b>Aluno:</b> ${result.nome}</li>
        <li><b>Curso:</b> ${result.curso}</li>
        <li><b>Turma:</b> ${result.turma}</li>
        <li><b>N.º parcelas:</b> ${result.parcelas}</li>`
    if(result.valorTotal) {
      mensagemRelatorio += `<li><b>Valor parcela:</b> ${result.valorParcela}</li> 
      <li><b>Valor total:</b> ${result.valorTotal}</li>`
    }
   mensagemRelatorio += '</ul>'
  
   relatorioAluno.innerHTML= mensagemRelatorio
  }

}

// FINANCEIRO

const valorBotao = document.getElementById("valor-botao")
const simuladorValor = document.getElementById("simulador-valor")
const mensagem = document.getElementById("mensagem")
const incluirCurso = document.getElementById("adcCurso")
const limpar = document.getElementById("reset")


let carrinhoCursos = []
let listaCursos = []


if(limpar) {
  limpar.addEventListener("click", (event) => {
    event.preventDefault()
    relatorioAluno.innerHTML=""
    mensagem.innerHTML=""
    simuladorValor.innerHTML=""
  })
}

if(incluirCurso) {
  incluirCurso.addEventListener("click", (event) => {
    event.preventDefault()
    incrementarCarrinho()
  })
}


if (valorBotao) {
  valorBotao.addEventListener("click", (event) => {
    event.preventDefault()
    parcelarCurso(carrinhoCursos)
  })
}

function buscarCurso(nomeCurso){
  const cursoCarrinho = document.getElementById("cursoFin")
  let procurarCurso = cursos.find(procurar => procurar.nome.toLowerCase().includes(nomeCurso.toLowerCase()))

  if (typeof procurarCurso == "undefined") {
    cursoCarrinho.value = ""
    Swal.fire(
      'Curso não encontrado.',
      'Digite outro curso.',
      'error'
    )
  }else if(!nomeCurso) {
    return Swal.fire('Digite um curso')
  }else {
  return procurarCurso
  }
}

const incrementarCarrinho = () => {
  const cursoCarrinho = document.getElementById("cursoFin")
  
 if(listaCursos.includes(buscarCurso(cursoCarrinho.value).nome)){
    cursoCarrinho.value = ""
    return Swal.fire('Curso já inserido.')
  }

  carrinhoCursos.push(buscarCurso(cursoCarrinho.value).valor)
  listaCursos.push(buscarCurso(cursoCarrinho.value).nome)
  simuladorValor.innerHTML = `<p><b>>> Cursos Escolhidos:</b></p> ${listaCursos.join('<br/>')}`
  cursoCarrinho.value = ""
}

function parcelarCurso(carrinhoCursos){
  const nullParcelas = document.getElementById("nParcelasFin")
  const nParcelasFin = Number(nullParcelas.value)
  
  let desconto = 0
  let valorBruto = 0
  
  switch(carrinhoCursos.length) {
    case 3:
      desconto = 0.15;
      break;
    case 2:
      desconto = 0.1;
      break;
    case 1:    
      desconto = 0;
      break;
    default:
      Swal.fire(
        'Quantidade de parcelas inválida.',
        'Digite um número válido.',
        'error'
      )
      return
  }

  for(i=0; i<carrinhoCursos.length; i++) {
    valorBruto += carrinhoCursos[i]
  }
  
  if (nParcelasFin < 3 && nParcelasFin > 0) {
    desconto += 0.2
    if(desconto > 0.2) {
      mensagem.innerHTML = `O valor total do pagamento é R$${(valorBruto*(1-desconto)).toFixed(2)} reais, parcelado em ${nParcelasFin}x de R$${(valorBruto*(1-desconto)/nParcelasFin).toFixed(2)} reais. Foi concedido desconto de ${(((desconto-0.2)*100)+20).toFixed(0)}% `
    }else if(desconto == 0.2) {
      mensagem.innerHTML = `O valor total do pagamento é R$${(valorBruto*(1-desconto)).toFixed(2)} reais, parcelado em ${nParcelasFin}x de R$${(valorBruto*(1-desconto)/nParcelasFin).toFixed(2)} reais. Foi concedido desconto de 20%.`
    }
  }else if(nParcelasFin >= 3){
    if(carrinhoCursos.length > 1) {
      mensagem.innerHTML =  `O valor total do pagamento é R$${(valorBruto*(1-desconto)).toFixed(2)} reais, em ${nParcelasFin}x de R$${(valorBruto*(1-desconto)/nParcelasFin).toFixed(2)} reais. Foi concedido desconto de ${(desconto*100).toFixed(0)}%.`
    }else if(carrinhoCursos.length == 1) {
      mensagem.innerHTML =  `O valor total do pagamento é R$${(valorBruto*(1-desconto)).toFixed(2)} reais, em ${nParcelasFin}x de R$${(valorBruto*(1-desconto)/nParcelasFin).toFixed(2)} reais.`
    }    
  }else if(nParcelasFin <= 0) {
    Swal.fire(
      'Número de parcelas inválido.',
      'Digite um número válido.',
      'error'
    )
  } 

 nullParcelas.value=""
}

//FORM CONTATO

const enviarForm = document.getElementById('enviarForm')
if (enviarForm) {
  enviarForm.addEventListener("click", (event) => {
    event.preventDefault()
    
    preencherForm()
    nomeForm.value=""
    emailForm.value=""
    textForm.value=""
  })
}

function preencherForm(){
  const nomeForm = document.getElementById('nomeForm').value
  const emailForm = document.getElementById('emailForm').value
  const textForm = document.getElementById('textForm').value

  if(!nomeForm || !emailForm || !textForm){
    Swal.fire('Preencha todos os campos.')
  }else {
   checarEmail()
   if(!checarEmail()){
    Swal.fire(
      'Mensagem enviada com sucesso!',
      'Em breve entraremos em contato.',
      'success'
    )
   }
  }
}

function checarEmail(){
if( document.forms[0].email.value=="" || document.forms[0].email.value.indexOf('@')==-1 || document.forms[0].email.value.indexOf('.')==-1 ) {
	  Swal.fire( "Informe um email válido!" );
	  return true;
	}
}

//DROPDOWN MENUS

const menuData = [
  ["HTML e CSS", "Clarke"],
  ["HTML e CSS", "Curie"],
  ["HTML e CSS", "Zhenyi"],
  ["JavaScript", "Hipátia"],
  ["JavaScript", "Sibyla"],
  ["APIsRest", "Blackwell"],
  ["APIsRest", "Burnell"],
  ["APIsRest", "Elion"],
]

function dropDownList(data, filter){
  const filteredArray = data.filter(r => r[0] === filter)
  const uniqueOptions = new Set()
  filteredArray.forEach(r => uniqueOptions.add(r[1]))
  const uniqueList = [...uniqueOptions]
  const selectTurmas = document.getElementById("turmaM")

  selectTurmas.innerHTML=""

  uniqueList.forEach(item => {
    const option = document.createElement('option')
    option.textContent = item
    selectTurmas.appendChild(option)
  })
}

function applyDropDown(){
  const selectCursos = document.getElementById('cursoM').value
  dropDownList(menuData, selectCursos)
}

document.getElementById('cursoM').addEventListener("change", applyDropDown)
document.addEventListener('DOMContentLoaded', applyDropDown)