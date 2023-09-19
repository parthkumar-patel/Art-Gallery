// import img from "../assets/art1.jpeg"

export default function Card(prop) {
    return (
        <div className="card">
            <img src="https://firebasestorage.googleapis.com/v0/b/art-gallery-ab57c.appspot.com/o/images%2Fart2.jpeg?alt=media&token=01d480c2-53bf-4346-a911-17f594f48dc4" alt={prop.item.title} width="150px" />
            <div className="card--stats">
                <h2>{prop.item.title}</h2>
                <p>Artist: {prop.item.artist}</p>
                <p>Year: {prop.item.year}</p>
            </div>
        </div>
    )
}