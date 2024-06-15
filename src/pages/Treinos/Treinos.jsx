import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Treinos() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [role, setRole] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pi-academia.vercel.app/api/cliente/clienteemail/${JSON.parse(localStorage.getItem('json-data')).email}`)
            const fetchedData = response.data;

            // alert(JSON.parse(localStorage.getItem('json-data')).email)

            // Substituir ';' por '\n' nos workouts
            if (fetchedData.workouts) {
                fetchedData.workouts = fetchedData.workouts
                .filter(workout => workout.visibility)
                .map(workout => {
                    const processedWorkout = {};
                    for (let key in workout) {
                        if (typeof workout[key] === 'string') {
                            processedWorkout[key] = workout[key].replace(/;/g, '\n');
                        } else {
                            processedWorkout[key] = workout[key];
                        }
                    }
                    return processedWorkout;
                });
            }

            setData(fetchedData);
            setLoading(false);
            setRole(fetchedData.role)
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    // const isAdmin = () => {
    //     const token = localStorage.getItem('authorization');

    //     if (!token) return false;

    //     try {
    //         const decodedToken = jwt_decode(token);
    //         alert(decodedToken.role)
    //         return decodedToken.role === 'admin';
    //     }

    //     catch (error) {
    //         return false;
    //     }
    // };

    useEffect(() => {
        fetchData();
    }, [])

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
        <section className="flex justify-center items-center">
            <div>

                {/* <div className="flex justify-center items-center">
                    {data.role ? (
                        <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Role do usuário: {data.role}</h2>
                    ) : (
                        <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Não há cargo definido.</h2>
                    )}
                </div> */}

                {role == 'admin' && (
                    <div className="flex justify-center items-center">
                        <Link to="../usuarios" >
                            <button
                                // onClick={() => window.location.href = '/usuarios'}
                                className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl"
                            >
                                Ir para Usuários.
                            </button>
                        </Link>
                    </div>
                )}

                {data.workouts && data.workouts.length > 0 ? (
                    <div className="" >
                        <div className="flex justify-center items-center">

                            <h2 className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Informação sobre os treinos:</h2>

                        </div>
                        <ul className="md:flex justify-center gap-4">
                            {data.workouts.map((workout, index) => (
                                <li key={index} className="text-lg rounded-xl p-5 my-5 border-4 text-red-700 border-red-700 font-bold md:m-5 whitespace-pre-line overflow-y-auto">
                                    <div className="flex items-center border-red-700 border-4 m-2 p-2 rounded-lg" >
                                        <p className="mr-2" >Treino 1:</p>
                                        <p> {workout.treino1}</p>
                                    </div>
                                    <div className="flex items-center border-red-700 border-4 m-2 p-2 rounded-lg" >
                                        <p className="mr-2" >Treino 2:</p>
                                        <p> {workout.treino2}</p>
                                    </div>
                                    <div className="flex items-center border-red-700 border-4 m-2 p-2 rounded-lg" >
                                        <p className="mr-2" >Treino 3:</p>
                                        <p> {workout.treino3}</p>
                                    </div>
                                    <div className="flex items-center border-red-700 border-4 m-2 p-2 rounded-lg" >
                                        <p className="mr-2" >Treino 4:</p>
                                        <p> {workout.treino4}</p>
                                    </div>
                                    <div className="flex items-center border-red-700 border-4 m-2 p-2 rounded-lg" >
                                        <p className="mr-2" >Treino 5:</p>
                                        <p> {workout.treino5}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="bg-red-700 text-white rounded-full font-bold p-5 my-5 text-xl">Não há treinos no banco de dados.</p>
                )}
            </div>
        </section>
    )
}
