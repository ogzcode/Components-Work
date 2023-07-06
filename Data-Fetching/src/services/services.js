import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const getCharacters = (url) => {
    return axios.get(url ? url: BASE_URL);
}

export const getSingleCharacter = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
}