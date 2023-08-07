import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "./Filmler/Film";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import { Route } from "react-router-dom";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get(`http://localhost:5001/api/filmler`) // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          console.log(response.data);
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    if (saved.includes(id)) {
      console.log("Bu film Kaydedilenler Listesi'nde mevcut.");
      return;
    }

    const guncelListe = [...saved, id];
    setSaved(guncelListe);
    console.log("Yeni Film Kaydedildi:", id);

    KaydedilenlerListesineEkle();
  };

  return (
    <div>
      <KaydedilenlerListesi
        list={
          [
            /* Burası esnek */
          ]
        }
      />

      {/* <div>Bu Div'i kendi Routelarınızla değiştirin</div> */}
      <Route path="/" exact>
        <FilmListesi movies={movieList} />
      </Route>
      <Route path="/filmler/:id">
        {" "}
        <Film />
      </Route>
    </div>
  );
}
