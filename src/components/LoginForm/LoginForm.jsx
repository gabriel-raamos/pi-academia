import { useState } from "react";
import Textbox from "../Textbox/Textbox";
import Button from "../Button/Button";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSave = async (e) => {
        e.preventDefault();
    
        const userData = {
            email,
            password
        };
    
        try {
            const response = await axios.post("https://academia-esporte-e-acao.vercel.app/api/cliente/logarcliente", userData);
    
            localStorage.setItem('authorization', response.data.accessToken)
            localStorage.setItem('json-data', JSON.stringify(response.data.clienteData))
            // alert(response.data.clienteData.id)
    
            // alert("ID do usuário: " + response.data.clienteData.id)
            // alert("Header -> authorization: " + localStorage.getItem('authorization'))
            // alert(response.data.cliente.name)
    
            // const testName = JSON.parse(localStorage.getItem('json-header'))
            // alert(testName.name)
    
            // alert('Login efetuado com sucesso.');
            // alert(response.data.message)
            window.location.href = '/'
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <form
            className="pb-3 rounded-xl my-5 bg-gray-800"
            onSubmit={onSave}
        >
            <h1 className="text-center pt-5 pb-2 text-white text-lg font-bold bg-gray-700 rounded-xl">
                Faça seu login aqui!
            </h1>

            <Textbox
                obrigatorio={true}
                placeholder="Email"
                valor={email}
                tipo={"email"}
                whenChanged={(valor) => setEmail(valor)}
            />

            <Textbox
                obrigatorio={true}
                placeholder="Senha"
                valor={password}
                tipo={"password"}
                whenChanged={(valor) => setPassword(valor)}
            />

            {/* <div className="flex justify-center items-center my-5">
                <input type="checkbox" className="mr-3" />
                <h3>Manter-se conectado</h3>
            </div> */}

            <div className="flex justify-center items-center my-2 font-bold text-white">
                <button type="button">Esqueci minha senha</button>
            </div>

            <div className="flex justify-center items-center">
                <Button text="Entrar" type="submit"/>
            </div>
        </form>
    );
}
