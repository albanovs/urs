import { PiUserCircleLight } from "react-icons/pi";
import { api } from 'src/api';
const VisaPhotoSection = ({ selectedVisa, editMode, handleFileChange }) => (
    <div className="flex flex-col items-center col-span-1">
        {selectedVisa.photo ? (
            <img
                src={`${api.defaults.baseURL}/uploads/${selectedVisa.photo}`}
                alt="Фото визы"
                className="w-28 h-36 object-cover mb-2 border rounded-md"
            />
        ) : (
            <PiUserCircleLight className="w-28 h-36 mb-2" color="gray" />
        )}
        {editMode && (
            <label className="block">
                <input type="file" onChange={handleFileChange} className="hidden" />
                <span className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-indigo-600">
                    Изменить фото
                </span>
            </label>
        )}
    </div>
);

export default VisaPhotoSection;