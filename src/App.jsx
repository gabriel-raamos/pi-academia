import Card from './components/Card/Card'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'

export default function App() {
  return (
    <section>

      <NavBar />

      <section className="h-full grid grid-row-2 md:grid-cols-2 bg-white " >

        <section className="text-white flex justify-center items-center" >

          <div className="text-center" >

            <Card />

          </div>

        </section>



        <section className='flex justify-center items-center static'>

          <Form titulo="Cadastre-se aqui" />

        </section>

      </section>

    </section>
  )
}

// bg-gym no-repeat bg-cover bg-center bg-fixed