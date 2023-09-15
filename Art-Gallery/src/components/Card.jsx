import img from "../assets/art1.jpeg"

export default function Card(prop) {
    return (
        <div className="card">
            <img src={img} alt={prop.item.title} width="200px" />
            <div className="card--stats">
                <h2>{prop.item.title}</h2>
                <p>Artist: {prop.item.artist}</p>
                <p>Year: {prop.item.year}</p>
            </div>
        </div>
    )
}