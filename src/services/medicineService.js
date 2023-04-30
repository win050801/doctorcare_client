import axios from '../axios'
import { getMedicines } from '../routes/APIRoutes/APIMedicine'

const getAllMedicine = (categoryId, medicineId, keySearch, status) => {
      return axios.get(getMedicines);
}

export {getAllMedicine}