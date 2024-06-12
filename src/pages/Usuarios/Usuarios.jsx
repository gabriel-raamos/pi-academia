import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal/Modal";
import axios from "axios";

export default function Usuarios() {

    const role = JSON.parse(localStorage.getItem('json-data')).role

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [modalAberto, setModalAberto] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get('https://pi-academia.vercel.app/api/cliente/mostrarclientes')
            setData(response.data)
            setLoading(false)
        }

        catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAbrirModal = (cliente) => {
        setClienteSelecionado(cliente)
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setClienteSelecionado(null)
    };

    const salvarCliente = async (clienteAtualizado) => {
        try {
            // const response = await axios.put(`https://pi-academia.vercel.app/api/cliente/${clienteAtualizado.email}`, clienteAtualizado)
            const response = await axios.put('https://pi-academia.vercel.app/api/cliente/atualizarcliente', clienteAtualizado)

            setData(data.map(cliente => (cliente._id === response.data._id ? response.data : cliente)))

            handleFecharModal()
        }

        catch (error) {
            alert('erro ao atualizar cliente: ', error)
        }
    }

    if (loading) {
        return (
            <div className="grid grid-rows-2 justify-center items-center text-lg">
                <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <p>Ocorreu um erro ao usar os dados: {error.message}</p>
        )
    }

    return (
        <section>
            {role == 'admin' ? (
                <div className="flex justify-center items-center" >
                    <div>
                        <div className="md:grid md:grid-cols-2 gap-4" >
                            {data.map((cliente) => (
                                <div key={cliente._id} className="mb-4 flex justify-center items-center border-red-700 border-4 font-bold rounded-xl" >
                                    <p className="text-red-700 text-lg mx-2" >{cliente.name}</p>

                                    <button
                                        className="bg-red-700 text-white rounded-full p-3 my-5 text-lg"
                                        onClick={() => handleAbrirModal(cliente)}
                                    >
                                        Editar dados
                                    </button>
                                </div>
                            ))}

                            {/* <Modal isOpen={modalAberto} onClose={handleFecharModal}>
                                {clienteSelecionado && (
                                    <div className="text-xl" >
                                        <h2 className="text-2xl font-bold my-4">Detalhes do Cliente</h2>
                                        <p className="mr-4" ><strong>Nome:</strong> {clienteSelecionado.name}</p>
                                        <p className="mr-4" ><strong>Email:</strong> {clienteSelecionado.email}</p>
                                        <p className="mr-4" ><strong>Telefone:</strong> {clienteSelecionado.phone}</p>
                                        <p className="mr-4" ><strong>CPF:</strong> {clienteSelecionado.cpf}</p>
                                        <p className="mr-4" ><strong>CEP:</strong> {clienteSelecionado.cep}</p>
                                        <p className="mr-4" ><strong>Altura:</strong> {clienteSelecionado.height}</p>
                                        <p className="mr-4" ><strong>Peso:</strong> {clienteSelecionado.weight}</p>
                                        <p className="mr-4" ><strong>Ativo:</strong> {clienteSelecionado.active ? "Sim" : "Não"}</p>
                                        <p className="mr-4" ><strong>Role:</strong> {clienteSelecionado.role}</p>
                                    </div>
                                )}
                            </Modal> */}

                            <Modal
                                isOpen={modalAberto}
                                onClose={handleFecharModal}
                                cliente={clienteSelecionado}
                                onSave={salvarCliente}
                            />
                        </div>
                    </div>
                </div>

            ) : (
                <div className="justify-center items-center" >
                    <div className="flex justify-center items-center" >
                        <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >Você não deveria estar aqui.</p>
                    </div>

                    <div className="flex justify-center items-center" >
                        <Link to='../' >
                            <button className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl" >
                                Clique aqui para voltar para a home page.
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}
