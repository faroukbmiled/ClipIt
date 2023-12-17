import axios from 'axios';

export async function getCountryInfo(ip: any) {
  try {
    const response = await axios.get(`https://antibot.pw/api/ip?ip=${ip}`);
    if (response.status === 200) {
      const data = response.data;
      return data.country;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}
