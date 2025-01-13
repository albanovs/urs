import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiUserCircleLight } from "react-icons/pi";
import { api } from 'src/api';

const DataVisa = () => {
    const [visas, setVisas] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('Все страны');
    const [startDate, setStartDate] = useState(null);
    const [updateID, setUpdateID] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null)
    const [editMode, setEditMode] = useState(false);
    const countries = ['Все страны', 'USA', 'Canada', 'Germany', 'France'];


    const fetchData = async () => {
        try {
            const response = await api.get('/api/getworkvisa');
            setVisas(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const filteredVisas = visas.filter(visa => {
        const searchTerm = search.toLowerCase();
        const matchesSearch =
            visa.formData?.permit_fname?.toLowerCase().includes(searchTerm) ||
            visa.formData?.permit_lname?.toLowerCase().includes(searchTerm) ||
            visa.formData?.permit_doc_nom?.toLowerCase().includes(searchTerm);

        const matchesCountry = selectedCountry === 'Все страны' || visa.formData?.permit_country === selectedCountry;

        const matchesStartDate = !startDate || new Date(visa.formData?.permit_planned_entry) >= startDate;
        const matchesEndDate = !endDate || new Date(visa.formData?.permit_planned_exit) <= endDate;

        return matchesSearch && matchesCountry && matchesStartDate && matchesEndDate;
    });

    const handleEdit = (id) => {
        setEditMode(true);
        const visa = visas.find(visa => visa._id === id);
        setSelectedVisa(visa?.formData || {});
        setSelectedDocument(visa?.files || [])
        setModalVisible(true);
        setUpdateID(id)
    };

    const handleDelete = (id) => {
        const visa = visas.find(visa => visa._id === id);
        setSelectedVisa(visa?.formData || {});
        setDeleteModalVisible(true);
        setUpdateID(id)
    }

    const handleSave = async () => {
        try {
            if (editMode) {
                const formData = { formData: { ...selectedVisa } };
                await api.patch(`/visa/update/${updateID}`, formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                fetchData();
                setVisas(visas.map(visa =>
                    visa._id === selectedVisa._id ? { ...visa, formData: selectedVisa } : visa
                ));
                toast.success('Данные обновлены');
                setModalVisible(false);
                setEditMode(false);
            }
        } catch (error) {
            console.error('Ошибка при сохранении визы:', error);
            toast.error('Ошибка при сохранении данных');
        }
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/visa/${updateID}`);
            setVisas(visas.filter(visa => visa._id !== selectedVisa._id));
            fetchData()
            setDeleteModalVisible(false);
            toast.success('Виза удалена');
        } catch (error) {
            console.error('Ошибка при удалении данных:', error);
            toast.error('Ошибка при удалении данных');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedVisa(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedVisa(prevState => ({ ...prevState, photo: file }));
        }
    };

    return (
        <CCard>
            <div className="lg:p-5">
                <div className="lg:mb-5 flex lg:items-center lg:flex-row flex-col lg:justify-between justify-center items-center gap-2 m-2 lg:space-x-4">
                    <div className="flex space-x-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Поиск по имени, фамилии или номер паспорта"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="p-2 border border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        >
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex space-x-4 w-full sm:w-auto">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Начальная дата"
                            className="p-2 border border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="Конечная дата"
                            className="p-2 border border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                    </div>
                </div>

                <CCard className="overflow-x-auto min-h-96 border mt-4 border-gray-200">
                    <table className="w-full text-left table-auto">
                        <thead className=" text-xs sm:text-sm">
                            <tr>
                                <th className="px-4 py-2 font-semibold border-b">Фото</th>
                                <th className="px-4 py-2 font-semibold border-b">Имя</th>
                                <th className="px-4 py-2 font-semibold border-b">Фамилия</th>
                                <th className="px-4 py-2 font-semibold border-b">Номер паспорта</th>
                                <th className="px-4 py-2 font-semibold border-b">Начало</th>
                                <th className="px-4 py-2 font-semibold border-b">Окончание</th>
                                <th className="px-4 py-2 font-semibold border-b">Страна</th>
                                <th className="px-4 py-2 font-semibold border-b">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs sm:text-sm">
                            {filteredVisas.map((visa) => (
                                <tr key={visa._id} className="border-b transition duration-200">
                                    <td className="px-4 py-2">
                                        {visa.photo ? (
                                            <img
                                                src={`http://localhost:5000/uploads/${visa.photo}`}
                                                alt="Фото"
                                                className="w-9 h-9 object-cover rounded-full"
                                            />
                                        ) : (
                                            <PiUserCircleLight size={40} color="gray" />
                                        )}
                                    </td>
                                    <td className="px-4">{visa.formData?.permit_fname || 'N/A'}</td>
                                    <td className="px-4">{visa.formData?.permit_lname || 'N/A'}</td>
                                    <td className="px-4">{visa.formData?.permit_doc_nom || 'N/A'}</td>
                                    <td className="px-4">
                                        {visa.formData?.permit_planned_entry
                                            ? new Date(visa.formData.permit_planned_entry).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-4">
                                        {visa.formData?.permit_planned_exit
                                            ? new Date(visa.formData.permit_planned_exit).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td className="px-4">{visa.formData?.permit_country || 'N/A'}</td>
                                    <td className="px-4 flex gap-4 pt-3">
                                        <button onClick={() => handleEdit(visa._id,)} className="text-green-500 hover:text-green-700">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(visa._id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CCard>
            </div>
            {
                modalVisible && (
                    <CModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        alignment="center"
                        size="lg"
                    >
                        <CModalHeader>
                            <CModalTitle className="text-sm font-semibold">
                                {editMode && `Данные ${selectedVisa.permit_fname} ${selectedVisa.permit_lname}`}
                            </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            {selectedVisa && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                                    <div className="flex flex-col items-center col-span-1">
                                        {selectedVisa.photo ? (
                                            <img
                                                src={`http://localhost:5000/uploads/${selectedVisa.photo}`}
                                                alt="Фото визы"
                                                className="w-28 h-36 object-cover mb-2 border rounded-md"
                                            />
                                        ) : <PiUserCircleLight className='w-28 h-36 mb-2' color='gray' />
                                        }
                                        {editMode && (
                                            <label className="block">
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <span className="bg-indigo-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-indigo-600">
                                                    Изменить фото
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                    {editMode && (
                                        <div className="col-span-2">
                                            <label className="block font-medium">Дополнительные файлы:</label>
                                            <div className="col-span-2">
                                                {selectedDocument.map((item, index) => (
                                                    <a
                                                        href={`http://localhost:5000/uploads/${encodeURIComponent(item.file)}`}
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
                                    )}
                                    {['Имя', 'Фамилия', 'Дата рождения'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            <input
                                                type={`${idx === 2 ? 'date' : 'text'}`}
                                                name={`permit_${['fname', 'lname', 'bdate'][idx]}`}
                                                value={selectedVisa[`permit_${['fname', 'lname', 'bdate'][idx]}`]}
                                                onChange={handleInputChange}
                                                className="form-control text-xs"
                                            />
                                        </div>
                                    ))}
                                    {['Страна', 'Пол', 'Семейное положение'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            {idx === 0 ? (
                                                <select
                                                    name="permit_country"
                                                    value={selectedVisa.permit_country}
                                                    onChange={handleInputChange}
                                                    className="form-control text-xs"
                                                >
                                                    {countries.map((country) => (
                                                        <option key={country} value={country}>
                                                            {country}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : idx === 1 ? (
                                                <select
                                                    name="permit_gender"
                                                    value={selectedVisa.permit_gender === "1" ? "Мужской" : "Женский"}
                                                    onChange={handleInputChange}
                                                    className="form-control text-xs"
                                                >
                                                    <option value="1">Мужской</option>
                                                    <option value="2">Женский</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={`permit_${['gender', 'famstatus'][idx - 1]}`}
                                                    value={selectedVisa[`permit_${['gender', 'famstatus'][idx - 1]}`]}
                                                    onChange={handleInputChange}
                                                    className="form-control text-xs"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {['Тип документа', 'Номер документа', 'Документ действителен от'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            <input
                                                type={`${idx === 2 ? 'date' : 'text'}`}
                                                name={`permit_${['doctype', 'doc_nom', 'docstart'][idx]}`}
                                                value={selectedVisa[`permit_${['doctype', 'doc_nom', 'docstart'][idx]}`]}
                                                onChange={handleInputChange}
                                                className="form-control text-xs"
                                            />
                                        </div>
                                    ))}
                                    {['Документ действителен до', 'Тип единого разрешения', 'Срок единого разрешения'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            <input
                                                type={`${idx === 0 ? 'date' : 'text'}`}
                                                name={`permit_${['docend', 'type', 'srok'][idx]}`}
                                                value={selectedVisa[`permit_${['docend', 'type', 'srok'][idx]}`]}
                                                onChange={handleInputChange}
                                                className="form-control text-xs"
                                            />
                                        </div>
                                    ))}
                                    {['Плановая дата въезда', 'Плановая дата выезда', 'Образование'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            <input
                                                type={`${idx === 0 ? 'date' : idx === 1 ? 'date' : 'text'}`}
                                                name={`permit_${['planned_entry', 'planned_exit', 'education'][idx]}`}
                                                value={selectedVisa[`permit_${['planned_entry', 'planned_exit', 'education'][idx]}`]}
                                                onChange={handleInputChange}
                                                className="form-control text-xs"
                                            />
                                        </div>
                                    ))}
                                    {['ПИН', 'Должность', 'Адрес проживания'].map((label, idx) => (
                                        <div key={idx} className="w-full">
                                            <label className="block font-medium">{label}:</label>
                                            <input
                                                type="text"
                                                name={`permit_${['pin', 'position', 'address'][idx]}`}
                                                value={selectedVisa[`permit_${['pin', 'position', 'address'][idx]}`]}
                                                onChange={handleInputChange}
                                                className="form-control text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CModalBody>
                        <CModalFooter>
                            {editMode && (
                                <CButton color="success" style={{ color: 'white' }} onClick={handleSave} className="text-xs">
                                    Сохранить
                                </CButton>
                            )}
                            <CButton color="secondary" onClick={() => setModalVisible(false)} className="text-xs">
                                Закрыть
                            </CButton>
                        </CModalFooter>
                    </CModal>
                )
            }
            <ToastContainer />
            <CModal alignment="center" visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Удалить данные</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Вы уверены, что хотите удалить {selectedVisa?.permit_fname} {selectedVisa?.permit_lname}?</p>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setDeleteModalVisible(false)}>Отменить</CButton>
                    <CButton color="danger" onClick={confirmDelete}>Удалить</CButton>
                </CModalFooter>
            </CModal>
        </CCard >
    );
};

export default DataVisa;
