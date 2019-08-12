import axios from 'axios';
import { ROOT_CONFIG_URL } from '../root';

export function customFieldsForModel(modelName) {
  return axios.get(`${ROOT_CONFIG_URL}/fields/${modelName}`);
}
