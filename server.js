import express from 'express';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/send-whatsapp", (req, res) => {
    const whatsappMessage = (`*Novo contato*\nNome: ${firstname} ${lastname}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`);
    console.log(whatsappMessage);
    const apiKey = process.env.API_KEY;
    const phoneNumber = process.env.PHONE_NUMBER;

    const callMeBotURL = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}&apikey=${apiKey}`;

    axios.get(callMeBotURL)
        .then(response => {
            if (response.data.includes("Message queued")) {
                res.redirect('/?success=true#contact');
            } else {
                res.status(500).send("Erro ao enviar a mensagem via WhatsApp.");
            }
        })
        .catch(error => {
            res.status(500).send("Erro ao enviar a mensagem via WhatsApp: " + error.message);
        });
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("Server working: http://localhost:3000");
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})