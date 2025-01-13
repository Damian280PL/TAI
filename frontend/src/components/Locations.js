import React, { useState } from 'react';
import './Locations.css'; // Stylizacja dla komponentu

const Locations = () => {
    const [mapSrc, setMapSrc] = useState(

    );

    return (
        <div className="locations">
            <h3 className="locations-title">Nasze lokalizacje</h3>
            <p>Znajdź nasze biura w wybranych miastach:</p>

            {/* Przyciski do zmiany lokalizacji */}
            <div className="buttons">
                <button onClick={() => setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2053.6991076156687!2d20.89689314086526!3d52.25657669316877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecaf5a2d93e5b%3A0xc47b319545374cf0!2sGen.%20Kaliskiego%2031A%2C%2001-476%20Warszawa!5e0!3m2!1spl!2spl!4v1736782682432!5m2!1spl!2spl")}>
                    Warszawa
                </button>
                <button onClick={() => setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1196.7582174565166!2d23.161381623350298!3d53.13682559507033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ffc1bee4e62cb%3A0xfe4bf5ee3bfd3818!2sKino%20Helios!5e0!3m2!1spl!2spl!4v1736782932429!5m2!1spl!2spl")}>
                    Białystok
                </button>
                <button onClick={() => setMapSrc("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1178.8534501782399!2d20.475140756891015!3d53.77690499307557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e27ed6adf5dc0d%3A0x333a9c5a5b43fa9e!2sStare%20Miasto%204%2F6%2FLok.%2014%2C%2010-027%20Olsztyn!5e0!3m2!1spl!2spl!4v1736783017990!5m2!1spl!2spl")}>
                    Olsztyn
                </button>
            </div>

            {/* Miejsce na mapę */}
            <iframe
                src={mapSrc}
                width="600"
                height="400"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
                title="Mapa lokalizacji"
            ></iframe>
        </div>
    );
};

export default Locations;
