import Card1 from "../../components/Card1/Card1";
import Card2 from "../../components/Card2/Card2";
import Card3 from "../../components/Card3/Card3";

export default function Planos() {
    return (
        <div className="min-h-screen grid grid-row-3 md:grid-cols-3 justify-center" >
            <Card1 />
            <Card2 />
            <Card3 />
        </div>
    )
}