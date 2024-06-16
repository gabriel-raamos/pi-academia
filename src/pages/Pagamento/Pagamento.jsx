import { Link } from 'react-router-dom'
import PagamentoForm from '../../components/PagamentoForm/PagamentoForm'

export default function Pagamento() {

    const userData = localStorage.getItem('json-data')
    const id = userData ? JSON.parse(userData).id : null

    return (
        <section>
            {id ? (
                <section className='flex justify-center items-center' >
                    <div>
                        <PagamentoForm />
                    </div>
                </section>
            ) : (
                <div className="grid grid-rows-1 justify-center items-center text-lg">
                    <Link to="../login" >
                        <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Faça login para acessar a página</p>
                    </Link>
                </div>
            )}
        </section>
    )
}
