import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal/Modal";
import axios from "axios";

export default function Usuarios() {

    // const id = JSON.parse(localStorage.getItem('json-data')).id

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [modalAberto, setModalAberto] = useState(false)
    const [clienteSelecionado, setClienteSelecionado] = useState(null)

    const [isAdmin, setIsAdmin] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get('https://academia-esporte-e-acao.vercel.app/api/cliente/clientealfabetico', { withCredentials: true })
            if (response.data && response.data.clientes) {
                setData(response.data.clientes)
            } else {
                throw new Error('Dados de clientes não encontrados')
            }
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    const fetchRole = async () => {
        try {
            const response = await axios.get(`https://academia-esporte-e-acao.vercel.app/api/cliente/findbyid/`)

            if (!response || !response.data) {
                throw new Error('Cliente não foi encontrado.')
            }

            if (response.data.role === '') {
                setIsAdmin('cliente')
            } else {
                setIsAdmin(response.data.role)
            }
            setLoading(false)
        } catch (error) {
            alert('Ocorreu um erro: ' + error)
            setLoading(false)
            setError(error)
        }
    }

    useEffect(() => {
        fetchRole().then(() => fetchData())
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
            const response = await axios.put('https://academia-esporte-e-acao.vercel.app/api/cliente/atualizarcliente', clienteAtualizado)

            setData(data.map(cliente => (cliente._id === response.data._id ? response.data : cliente)))

            handleFecharModal()
        } catch (error) {
            alert('erro ao atualizar cliente: ', error)
        }
    }

    async function deletarUser(cliente) {
        try {
            await axios.delete(`https://academia-esporte-e-acao.vercel.app/api/cliente/deletarcliente/${cliente._id}`)

            window.location.reload()
        } catch (error) {
            alert('erro ao deletar cliente: ' + error)
        }
    }

    const filteredData = data.filter(cliente =>
        cliente.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="grid grid-rows-1 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Carregando...</p>
            </div>
        )
    } else if (error) {
        return (
            <div className="grid grid-rows-1 justify-center items-center text-lg">
                <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Ocorreu um erro ao tentar puxar os dados: {error.message}</p>
            </div>
        )
    }

    return (
        <section>
            {isAdmin === 'admin' ? (
                <div className="flex flex-col justify-center items-center mt-5">
                    <input
                        type="text"
                        placeholder="Buscar usuários pelo nome"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="mb-4 border-4 border-blue-700 rounded-xl p-2 text-lg w-72"
                    />
                    <div>
                        <div className="md:grid md:grid-cols-3 gap-4">
                            {filteredData.map((cliente) => (
                                <div key={cliente._id} className="mb-4 grid grid-cols-2 justify-center items-center border-blue-700 border-4 font-bold rounded-xl">
                                    <p className="text-blue-700 text-lg mx-2 text-center">{cliente.name.length > 10 ? `${cliente.name.substring(0, 10)}...` : cliente.name}</p>

                                    <button
                                        className="bg-blue-700 text-white rounded-full p-3 my-5 mx-2 text-lg transition hover:bg-blue-500 hover:-translate-y-1 duration-500"
                                        onClick={() => handleAbrirModal(cliente)}
                                    >
                                        Editar dados
                                    </button>
                                </div>
                            ))}

                            <Modal
                                isOpen={modalAberto}
                                onClose={handleFecharModal}
                                cliente={clienteSelecionado}
                                onSave={salvarCliente}
                                deleteUser={deletarUser}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="justify-center items-center">
                    <div className="flex justify-center items-center">
                        <p className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl">Essa página só deve ser acessada por pessoas com permissão</p>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link to='../'>
                            <button className="bg-blue-700 text-white rounded-full font-bold p-5 my-5 text-xl transition hover:bg-blue-500 hover:-translate-y-1 duration-500">
                                Clique aqui para voltar para a home page.
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    )
}
