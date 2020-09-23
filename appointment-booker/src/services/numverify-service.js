import axios from 'axios'

const APIUri = 'http://apilayer.net/api'
const accessKey = '445dbd11584484a662a7b746ac327f29'

export async function checkValidation (number, country_code) {
    const options = {
        url: `${APIUri}/validate?access_key=${accessKey}&number=${number}&country_code=${country_code}&format=1`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    };

    return (await axios(options));
}
