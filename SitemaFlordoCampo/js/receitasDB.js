function getBD(){

    let db = firebase.firestore();
    let receitas = db.collection('receitas');
    let receita_id = 0;
    
    receitas.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            if (doc.exists) {
                nome = doc.data().nome;
                categoria = doc.data().categoria; 
                ingredientes = doc.data().ingredientes;
                preparo = doc.data().preparo;
                img = doc.data().imagem;
                adicionarReceita(nome, categoria, ingredientes, preparo, img, receita_id);
                receita_id ++;
            } else {
                // doc.data() will be undefined in this case
                console.log("cade os documentos?");
            }
        })
        .catch(function(error) {
            console.log("Error ao pegar o documento:", error);
        });
    });
}

function adicionarReceita(titulo, categoria, ingredientes, preparo, img, id){
    let h2_titulo = document.createElement("h2");
    let p_categoria = document.createElement("h5");
    let p_ingredientes = document.createElement("p");
    let p_preparo = document.createElement("p");
    let imagem = document.createElement("img");
    
    p_ingredientes.classList.add("ingredienteCSS");
    p_preparo.classList.add("ingredienteCSS");
    imagem.src = img;
    imagem.style.width = "100%";
    imagem.style.maxHeight = "140px";
    

    let barra = document.createElement("hr");
    let text_titulo_receita = document.createTextNode(titulo);
    let text_categoria_receita = document.createTextNode(categoria);
    
    let text_preparo = document.createTextNode("");
    let text_ingredientes_receita = document.createTextNode("");
    let container = document.createElement("div");
    
    container.classList.add("container");
    h2_titulo.appendChild(text_titulo_receita);
    p_categoria.appendChild(text_categoria_receita);
    p_ingredientes.appendChild(text_ingredientes_receita);
    p_preparo.appendChild(text_preparo);


    p_ingredientes.innerHTML = ingredientes.join(" <br/> ")
    p_preparo.innerHTML = preparo.join(" <br/> ")

    container.appendChild(imagem);
    container.appendChild(h2_titulo);
    container.appendChild(p_categoria);
    container.appendChild(barra);
    container.appendChild(p_ingredientes);
    container.appendChild(barra);
    container.appendChild(p_preparo);

    
    let card_receita = document.createElement("div");
    card_receita.classList.add("cardReceita");

    card_receita.appendChild(imagem);
    card_receita.appendChild(container);

    let column_receita = document.createElement("div");
    column_receita.classList.add("columnReceita");

    column_receita.appendChild(card_receita);

    let container_receita = document.createElement("div");
    container_receita.classList.add("containerReceita");

    container_receita.appendChild(column_receita);
    
    document.body.appendChild(container_receita); 
    card_receita.setAttribute("id", id);
    card_receita.getElementsByTagName('p')[0].style.display = "none";
    card_receita.setAttribute("onclick", "abrirIngredientes(this.id)");
}


function abrirIngredientes(id = ""){
    let card_receita = document.getElementById(id);
    let ingrediente = card_receita.getElementsByTagName('p')[0];
    let preparo = card_receita.getElementsByTagName('p')[1];
    for(let i=0; i<ingrediente.length; i++){
        console.log();
        ingrediente[i].style.display = "none";
        preparo[i].style.display = "none";
    } 
    if( ingrediente.style.display == "none"){
        ingrediente.style.display = "block";
        preparo.style.display = "block";
     }else{
        ingrediente.style.display = "none";
        preparo.style.display = "none";
     }
}

function buscar(){
    let entrada, pesquisaValor, container, nomeReceita;
    container = document.getElementsByClassName("containerReceita");
    entrada = document.getElementById("entradaPesquisa");
    pesquisaValor = entrada.value.toUpperCase();

    for(i=0; i < container.length; i++){
        nomeReceita = container[i].getElementsByTagName("h2");
        console.log(nomeReceita[0].innerText);
        if(nomeReceita[0].innerText.toUpperCase().indexOf(pesquisaValor) > -1){
            container[i].style.display = "";
        }else{
            container[i].style.display = "none";
        }
    }
}