import {BACKEND_BASE_ANDROID, BACKEND_BASE_IOS} from '../secrets';

const backend_base_url = Platform.OS === 'android' ? BACKEND_BASE_ANDROID : BACKEND_BASE_IOS;

const callApi = async (endpoint, obj={}) => {
    const url = backend_base_url + endpoint;
    const response = await fetch(url, obj);
    const data = await response.json();
    console.log(data);
    return data;
}

export default callApi;