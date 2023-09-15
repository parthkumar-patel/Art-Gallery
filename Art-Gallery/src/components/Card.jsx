import img from "../assets/art1.jpeg"

export default function Card() {
    const artwork = {
        title: "Mystic Sunset",
        artist: "John Doe",
        year: 2022,
    };

    return (
        <div className="card">
            <img src={img} alt={artwork.title} width="200px" />
            <div className="card--stats">
                <h2>{artwork.title}</h2>
                <p>Artist: {artwork.artist}</p>
                <p>Year: {artwork.year}</p>
            </div>
        </div>
    )
}