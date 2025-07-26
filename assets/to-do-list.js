const btnAdicionar = document.getElementById("adicionar");
const InputItens = document.getElementById("itens");
const lista = document.getElementById("lista");

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function renderizarTarefas() {
    lista.innerHTML = "";
    tarefas.forEach((tarefa, index) => {
        const divTextoAdicionado = document.createElement("div");
        divTextoAdicionado.className = "item-adicionado";

        const itemAdicionado = document.createElement("p");
        itemAdicionado.textContent = tarefa.texto;

        if (tarefa.concluida) {
            itemAdicionado.style.textDecoration = "line-through";
            itemAdicionado.style.color = "gray";
        } else {
            itemAdicionado.style.textDecoration = "none";
            itemAdicionado.style.color = "black";
        }

        divTextoAdicionado.appendChild(itemAdicionado);

        // Div botão concluir
        const btnConcluirDiv = document.createElement("div");
        btnConcluirDiv.className = "button-concluido";

        const btnConcluir = document.createElement("button");
        btnConcluir.innerHTML = tarefa.concluida
            ? '<i class="bi bi-x-lg"></i>'   // Ícone X para desmarcar
            : '<i class="bi bi-check-lg"></i>';  // Ícone check para concluir

        btnConcluir.addEventListener("click", () => {
            tarefas[index].concluida = !tarefas[index].concluida;
            atualizarLocalStorage();
            renderizarTarefas();
        });

        btnConcluirDiv.appendChild(btnConcluir);

        // Div botão apagar
        const btnApagarDiv = document.createElement("div");
        btnApagarDiv.className = "button-apagar";

        const btnApagar = document.createElement("button");
        btnApagar.innerHTML = '<i class="bi bi-trash-fill"></i>'; // Ícone lixeira Bootstrap
        btnApagar.addEventListener("click", () => {
            tarefas.splice(index, 1);
            atualizarLocalStorage();
            renderizarTarefas();
        });

        btnApagarDiv.appendChild(btnApagar);

        // Adiciona na lista
        lista.appendChild(divTextoAdicionado);
        lista.appendChild(btnConcluirDiv);
        lista.appendChild(btnApagarDiv);
    });
}

function atualizarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

btnAdicionar.addEventListener("click", function() {
    const textoDigitado = InputItens.value.trim();
    if (textoDigitado === "") return;

    tarefas.push({ texto: textoDigitado, concluida: false });
    atualizarLocalStorage();
    renderizarTarefas();

    InputItens.value = "";
});

renderizarTarefas();