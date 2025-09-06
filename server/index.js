// 1. Importando pacotes
import express from "express";
import http from "http";
import { Server } from "socket.io"

// 2. Criando as instâncias e servidor
const app = express();
const server = http.createServer(app)
const io = new Server(server);

// 3. Pegando arquivos estáticos (html e css)
app.use(express.static("public"));

// 4. Inserindo ações que serão executadas quando o cliente conectar-se ao servidor.
io.on("connection", (client) => {
    console.log("Cliente conectado à Pizzaria ✅");

    // 5. Recebe o pedido do front-end, e retorna promises com respostas após determinados segundos.
    client.on("pedido", (sabor) => {

        function emitirResposta (mensagem,tempo) {
            return new Promise ((resolve, reject) => {
                // 6. Verfica se o sabor foi selecionado.
                if (sabor === "default") {
                    client.emit("resposta", "Por favor, selecione um sabor válido.")
                    resolve();
                }
                
                //7. Envia a resposta para o front-end
                setTimeout(() => {
                    client.emit("resposta", mensagem);
                    resolve();
                }, tempo);
            })
        }

        // 8. Função assíncrona para complementar a promise
        async function atualizandoStatus() {
            try {
                // 8. Executa as três funções de forma assíncrona
                await emitirResposta(`Pedido recebido! Sua pizza de ${sabor} será preparada em breve.`, 2000);
                await emitirResposta("Seu pedido está em preparo...", 4000);
                await emitirResposta("Pedido finalizado! Vocé terá sua entrega em breve.", 8000);
                await emitirResposta("Seu pedido foi entregue! Agradecemos a sua confiança. Volte sempre!", 10000);
            } catch (err) {
                console.log(err);
            }
        }

        atualizandoStatus();
    })

    // 9. Quando o cliente desconecta-se, isso aparece no console.
    client.on("disconnect", () => {
        console.log("Cliente desconectado da Pizzaria ❌");
    })
})


server.listen(5000, () => {
    console.log("Server escutando na porta 5000...");
});
