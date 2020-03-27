// Variáveis criadas a partir de Tags HTML

var tagsDias;
var tagProgresso = document.querySelector("#tagProgresso"); 
var tagTxtPercentualDias = document.querySelector("#tagTxtPercentualDias");
var tagListaDias = document.querySelector("#tagListaDias");
var tagDivMsg = document.querySelector("#tagDivMsg");
var tagTxtDivMsg = document.querySelector("#txtDivMsg");
var tagNumDiascontador = document.querySelector("#numDiascontador");
var tagBtNovoContador = document.querySelector("#btNovoContador");
var varTemplate1 = document.querySelector("#template1");  

// ========================================

// Variáveis Auxiliares

var totalDiasContador;
var vetorDias = [];
var audioPadrao = new Audio('_media/audioPadrao.mp3');    
var audioVitoria = new Audio('_media/audioVitoria.mp4');        
var tmpFecha;

// ========================================

// Eventos

tagNumDiascontador.addEventListener("input",MotorNumDiasContador);
tagBtNovoContador.addEventListener("click",MotorCriaNovoContador);


// Função que adiciona eventos para as tags tagsDias 

function CriaEventosTagsDias(){

for(var x = 0; x < tagsDias.length; x++){

tagsDias[x].querySelector("input[type=checkbox]").addEventListener("change",motorSwitchDias);
tagsDias[x].addEventListener("mouseover",MotorEventosMouseverOut);
tagsDias[x].addEventListener("mouseout",MotorEventosMouseverOut);

mudaEstadoElemento(tagsDias[x].querySelector("input[type=checkbox]"),true);

}

}

// ======================================================================================



// FUNÇÕES


Inicio();

// Função Padrão de Inicio de código

function Inicio(){
    

CarregaDadosLocalStorage();
MarcaColunas();
AlteraValorTagProgresso();
MotorNumDiasContador();
MudaEstadoDia();

}

// ==================================


function MudaEstadoDia(){

    if((vetorDias.indexOf(true) != -1)){

        mudaEstadoElemento(tagsDias[vetorDias.indexOf(true)].querySelector("input[type=checkbox]"),false);
    
        if(((vetorDias.indexOf(true) - 1) != -1))
        mudaEstadoElemento(tagsDias[(vetorDias.indexOf(true) - 1)].querySelector("input[type=checkbox]"),false);
    
    }else
        mudaEstadoElemento(tagsDias[tagsDias.length - 1].querySelector("input[type=checkbox]"),false);
    
 
}











function MotorEventosMouseverOut(event){

    var evento = event.type;
    
    
    
    
    if(!(this.querySelector("input").disabled)){
    
        ToggleClasse(this.querySelector("label"),"cursorPointer");
    
        if(!(this.querySelector("input").checked)){
    
        if(!(evento.localeCompare("mouseover"))){    
    
        RemoveClasse(this.querySelector("label"),"fundoCinza");      
        AddClasse(this.querySelector("label"),"fundoAzul"); 
        
        }else{
    
         RemoveClasse(this.querySelector("label"),"fundoAzul");      
         AddClasse(this.querySelector("label"),"fundoCinza"); 
    
        }
    
        }
    
    
    
    }
    
    
    
    }
    
    
    
    // ========================================










function CarregaDadosLocalStorage(){


if(localStorage.getItem("totalDiasContador") != undefined)
    totalDiasContador = parseInt(localStorage.getItem("totalDiasContador"));
else
    totalDiasContador = 7;

CriaElementosDias();   


if(JSON.parse(localStorage.getItem("estadoDias")) != undefined)
    vetorDias = JSON.parse(localStorage.getItem("estadoDias")); 
else
    preEncheVetorDias();
   


 
   

}


function CriaElementosDias(){

for (var x = totalDiasContador; x > 0; x--){

var blocoElementos = template1; 

var numDia = blocoElementos.content.querySelector("span");
numDia.textContent = "Day " + x;

var novoBlocoElementos = document.importNode(blocoElementos.content,true);

tagListaDias.appendChild(novoBlocoElementos);

}

tagsDias = document.querySelectorAll("#tagListaDias li");

CriaEventosTagsDias();



}



function motorSwitchDias(){


   

    if(this.parentElement.parentElement.previousElementSibling){
        
        if(this.checked){
            mudaEstadoElemento(this.parentElement.parentElement.previousElementSibling.querySelector("input[type=checkbox]"),false);
        }else{
            mudaEstadoElemento(this.parentElement.parentElement.previousElementSibling.querySelector("input[type=checkbox]"),true);

        }

            
    }

        if(this.parentElement.parentElement.nextElementSibling){
           
            if(this.checked){
                mudaEstadoElemento(this.parentElement.parentElement.nextElementSibling.querySelector("input[type=checkbox]"),true);
       
            }else{
                mudaEstadoElemento(this.parentElement.parentElement.nextElementSibling.querySelector("input[type=checkbox]"),false);  

            }

        }    


MotorControlaClasses(this);  
preEncheVetorDias();
salvaDadoslocalStorage();
AlteraValorTagProgresso();

if(this.checked)
    MotorEventosCaixaMarcada();


}


function MotorControlaClasses(ele){

    if(ele.checked){
        RemoveClasse(ele.parentElement,"fundoCinza");
        AddClasse(ele.parentElement,"fundoAzul");
    }else
        AddClasse(ele.parentElement,"fundoCinza");  
    

}




function preEncheVetorDias(){

vetorDias = [];

for(var x = 0; x < tagsDias.length; x++){

    vetorDias.push(tagsDias[x].querySelector("input[type=checkbox]").checked);
           
  }

}


function MarcaColunas(){




for(var x = 0; x < vetorDias.length; x++){

tagsDias[x].querySelector("input[type=checkbox]").checked = vetorDias[x];

MotorControlaClasses(tagsDias[x].querySelector("input[type=checkbox]"));  

}

}


function salvaDadoslocalStorage(){


localStorage.setItem("estadoDias",JSON.stringify(vetorDias));

}

function salvaDadoslocalStorage2(chave,val){


    localStorage.setItem(chave,val);
    
    }




// Função que adiciona um zero a valores menores que dez 

function AddZero(val){

    if(val < 10)
    val = "0" + val;
    
    return val;
    
    }
    
// ==============================================================


function AlteraValorTagProgresso(){

var i = vetorDias.length - 1;   
var cont = 0; 

while(vetorDias[i]){

i--;    
cont++;

}

var valorPercentualDias = ((cont / vetorDias.length) * 100);


tagProgresso.value = valorPercentualDias.toFixed(0);


mudaTxtElemento(tagTxtPercentualDias,valorPercentualDias.toFixed(0) + "%");


}


function MotorEventosCaixaMarcada(){
 
     
   
    ExibeDivMensagem();
  
   

   
}


function  TocaSom(s){

s.play();

}


function ExibeDivMensagem(){

ToggleClasse(tagDivMsg,"ghost");


window.setTimeout(function(){

ToggleClasse(tagDivMsg,"ghost2");
MotorDefineAudio();

},10); 




}


function MotorDefineAudio(){
     
        
    if(tagProgresso.value == 100){
        
        RemoveClasse(tagDivMsg.querySelector("img"),"ghost");
        mudaTxtElemento(tagTxtDivMsg,"Congratulations!");

       


        TocaSom(audioVitoria);
        tmpFecha = 10500;

    }else{
       
        TocaSom(audioPadrao);
        tmpFecha = 2000;
    }
   
    window.setTimeout(EscondeDivMensagem,tmpFecha);

}



function EscondeDivMensagem(){


  
  ToggleClasse(tagDivMsg,"ghost2");

  window.setTimeout(function(){
  
      ToggleClasse(tagDivMsg,"ghost");

      if(tagProgresso.value == 100){
        AddClasse(tagDivMsg.querySelector("img"),"ghost");
        mudaTxtElemento(tagTxtDivMsg,"keep at it!");
      }
     
  },410);    

}
   



// Função que muda o valor da propriedade Disabled de um elemento 

function mudaEstadoElemento(ele,valDisabled){

ele.disabled = valDisabled;

}


// ================================================================

function AddClasse(ele,cls){

ele.classList.add(cls);


}



function RemoveClasse(ele,cls){

    if(ele.classList.contains(cls))
        ele.classList.remove(cls);
    
}
    
function ToggleClasse(ele,cls){

ele.classList.toggle(cls);
     
}

function mudaTxtElemento(ele,txt){

ele.textContent = txt;

}


      
function SorteiaNumero(n1,n2){

return n1 + Math.round( Math.random() *  (n2 - n1)); 


}


function MotorNumDiasContador(){

if(tagNumDiascontador.checkValidity())
    totalDiasContador = tagNumDiascontador.value;

mudaEstadoElemento(tagBtNovoContador,!(tagNumDiascontador.checkValidity()));

}

function MotorCriaNovoContador(){

removeFilhos(tagListaDias);
salvaDadoslocalStorage2("totalDiasContador",totalDiasContador);
CriaElementosDias();
preEncheVetorDias();
salvaDadoslocalStorage();
MarcaColunas();
MudaEstadoDia();
AlteraValorTagProgresso();

}


function removeFilhos(elemento){

    var filho =  elemento.lastChild;
    
    while(filho){ 
        elemento.removeChild(filho); 
        filho = elemento.lastChild; 
    } 

}



