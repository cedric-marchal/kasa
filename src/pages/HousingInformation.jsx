import React from "react";
import { useParams } from "react-router-dom";

import data from "../data.json";

import { NotFound } from "./NotFound";
import { Gallery } from "../components/HousingInformation/Gallery";
import { Dropdown } from "../components/Dropdown";
import "./HousingInformation.scss";
import { Rating } from "../components/HousingInformation/Rating";

export const HousingInformation = () => {
  const { id } = useParams();
  const housing = data.find((d) => d.id === id);

  if (!housing) {
    return <NotFound />;
  }

  const [firstName, lastName] = housing.host.name.split(" ");

  return (
    <main className="housing">
      <section className="housing__gallery">
        <Gallery images={housing.pictures} />
      </section>
      <section className="housing__information">
        <div className="housing__informationTop">
          <div className="housing__informationH1">
            <h1>{housing.title}</h1>
            <p>{housing.location}</p>

            <div className="housing__informationTags">
              {housing.tags.map((tag) => (
                <span key={tag} className="housing__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="housing__pictureAndStar">
            <div className="housing__picture">
              <p>
                {firstName}
                <br />
                {lastName}
              </p>
              <img src={housing.host.picture} alt={housing.host.name} />
            </div>
            <div className="housing__star">
              <div>
                <Rating housing={housing} />
              </div>
            </div>
          </div>
        </div>

        <div className="housing__dropdown">
          <Dropdown
            title="Description"
            content={housing.description}
            isList={false}
          />
          <Dropdown
            title="Équipements"
            content={housing.equipments}
            isList={true}
          />
        </div>
      </section>
    </main>
  );
};
