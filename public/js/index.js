// 1. Criando instância do Socket
const socket = io();

// 2. Selecionando valores do HTML
const select = document.querySelector("#select-pizza");
const button = document.querySelector("#button");
const result = document.querySelector("#result")

// 3. Enviando dados para o servidor
button.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("pedido", select.value);
});

// 4. Criando o elemento para exibir a resposta do back-end dentro de uma div.
socket.on("resposta", (resposta) => {
    const item = document.createElement("h5");
    item.textContent = resposta;
    document.querySelector("#result").appendChild(item)
})
