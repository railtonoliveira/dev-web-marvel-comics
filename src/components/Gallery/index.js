import React from "react";
import "./styles.css";

const Gallery = ({ items }) => {
    return (
        <div className="container-gallery">
            {items.map(({ comic, callback }, index) => (
                <div className="comic-card" key={index} onClick={() => callback(comic)}>
                    <img
                        src={`${comic?.thumbnail?.path}/standard_fantastic.jpg`}
                        alt={comic?.title}
                    />
                    <h4>{comic?.title}</h4>
                </div>
            ))}
        </div>
      );
}

export default Gallery;