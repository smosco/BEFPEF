import axios from "axios";
import { agoDate } from "../util/DateFormatFn";

export const BASE_URL =
  "https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=029f99a01fbb42dba52abb947db9975e&Type=json";

const options = {
  params: {
    pSize: 50,
  },
};

export const getPets = async (query) => {
  try {
    const data = await axios
      .get(
        `${BASE_URL}&SIGUN_NM=${query.SIGUN_NM}&PBLANC_BEGIN_DE=${query.PBLANC_BEGIN_DE}&PBLANC_END_DE=${query.PBLANC_END_DE}&SPECIES_NM=${query.SPECIES_NM}`,
        options
      )
      .then((res) =>
        res.data.AbdmAnimalProtect ? res.data.AbdmAnimalProtect : []
      );
    return data; //꼭 리턴 해주기
  } catch (err) {
    console.log(err.message);
  }
};

export const getFakePets = async (url) => {
  const data = await axios //
    .get(url) //
    .then((res) => (res.AbdmAnimalProtect ? res.AbdmAnimalProtect : []));
  return data; //꼭 리턴 해주기
};

export const getCurrent = async () => {
  try {
    const data = await axios
      .get(`${BASE_URL}&PBLANC_BEGIN_DE=${agoDate(new Date(), 10)}&pSize=10`)
      .then((res) =>
        res.data.AbdmAnimalProtect ? res.data.AbdmAnimalProtect : []
      );
    return data; //꼭 리턴 해주기
  } catch (err) {
    console.log(err.message);
  }
};

export const getShelterPets = async (shelter) => {
  try {
    const data = await axios
      .get(`${BASE_URL}&SHTER_NM=${shelter}&STATE_NM=보호중`, options)
      .then((res) =>
        res.data.AbdmAnimalProtect ? res.data.AbdmAnimalProtect : []
      );
    return data; //꼭 리턴 해주기
  } catch (err) {
    console.log(err.message);
  }
};
