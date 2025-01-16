import { PiUserCircleLight } from "react-icons/pi";
import { api } from 'src/api';

const VisaPhotoSection = ({ visa, selectedVisa }) => {

    const renderVisaPhoto = () => {
        if (selectedVisa.photo) {
            return (
                <img
                    src={`${api.defaults.baseURL}/uploads/${selectedVisa.photo}`}
                    alt="Фото визы"
                    className="w-28 h-36 object-cover mb-2 border rounded-md"
                />
            );
        }

        const visaWithFile = visa?.find(visa => visa.files[0]?.file);
        if (visaWithFile) {
            return (
                <img
                    src={`${api.defaults.baseURL}/uploads/${visaWithFile.files[0].file}`}
                    alt="Фото визы"
                    className="w-28 h-36 object-cover mb-2 border rounded-md"
                />
            );
        }

        return <PiUserCircleLight className="w-28 h-36 mb-2" color="gray" />;
    };

    return (
        <div className="flex flex-col items-center col-span-1">
            {renderVisaPhoto()}
        </div>
    );
};

export default VisaPhotoSection;