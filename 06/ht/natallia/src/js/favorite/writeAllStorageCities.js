import {getAllStorage} from './storage';
import writeFavoriteCityFromStorage from './writeFavoriteCityFromStorage';

export default function writeAllStorageCities() {
	getAllStorage()
		.then(data => {
			writeFavoriteCityFromStorage(data);
		});
}