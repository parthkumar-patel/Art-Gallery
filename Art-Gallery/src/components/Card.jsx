// import img from "../assets/art1.jpeg"

export default function Card(prop) {
    return (
        <div className="card">
            <img src="https://firebasestorage.googleapis.com/v0/b/art-gallery-ab57c.appspot.com/o/images%2Fart2.jpeg?alt=media&token=d3845669-70d4-4a80-b2b1-fe8ac9167c28" alt={prop.item.title} width="150px" />
            <div className="card--stats">
                <h2>{prop.item.title}</h2>
                <p>Artist: {prop.item.artist}</p>
                <p>Year: {prop.item.year}</p>
            </div>
        </div>
    )
}