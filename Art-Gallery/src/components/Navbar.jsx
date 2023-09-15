import img from "../assets/ideogram.jpeg"

export default function Navbar() {
    return (
        <nav className="navbar">
            <img src={img} className="nav--logo" />
            <h1>ArtWave</h1>
        </nav>
    )
}