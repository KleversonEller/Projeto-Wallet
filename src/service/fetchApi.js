const Url = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const resolve = await fetch(Url);
  const data = await resolve.json();
  return data;
};

export default fetchApi;
