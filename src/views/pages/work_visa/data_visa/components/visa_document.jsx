import { api } from "../../../../../api";
const VisaDocuments = ({ selectedDocument }) => (
    <div className="col-span-2">
        <label className="block font-medium">Дополнительные файлы:</label>
        <div className="col-span-2">
            {selectedDocument.map((item, index) => (
                <a
                    href={`${api.defaults.baseURL}/uploads/${encodeURIComponent(item.file)}`}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block"
                >
                    Ссылка {index + 1}
                </a>
            ))}
        </div>
    </div>
);

export default VisaDocuments;