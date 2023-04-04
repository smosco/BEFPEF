import axios from "axios";

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
