export default function Card(prop) {
    return (
        <div className="card">
            <img src={prop.item.imageURL} alt={prop.item.title} width="150px" />
            <div className="card--stats">
                <h2>{prop.item.title}</h2>
                <p>Artist: {prop.item.artist}</p>
                <p>Year: {prop.item.year}</p>
            </div>
        </div>
    )
}