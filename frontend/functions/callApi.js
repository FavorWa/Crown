import BACKEND_BASE_URL from '../secrets';

const backend_base_url = Platform.OS === 'android' ? 'http://10.0.2.2:8000' : BACKEND_BASE_URL;

const callApi = async (endpoint, obj={}) => {
    const url = backend_base_url + endpoint;
    const response = await fetch(url, obj);
    console.log(response);
    const data = await response.json();
    return data;
}

export default callApi;