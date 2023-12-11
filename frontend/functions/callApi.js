import {BACKEND_DEV_IOS, BACKEND_DEV_AND, BACKEND_PROD, isProd} from '../secrets';

const backend_base_url = isProd ? BACKEND_PROD : (Platform.OS === 'android' ? BACKEND_DEV_AND : BACKEND_DEV_IOS);

const callApi = async (endpoint, obj={}) => {
    const url = backend_base_url + endpoint;
    const response = await fetch(url, obj);
    const data = await response.json();
    return data;
}

export default callApi;