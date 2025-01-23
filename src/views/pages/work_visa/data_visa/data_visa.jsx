import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CCard, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CTable, CTableHead, CTableBody } from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from 'src/api';
import VisaPhotoSection from './components/visa_photo';
import VisaDocuments from './components/visa_document';
import VisaDetails from './components/visa_details';
import ReactLoading from 'react-loading';
import { PiUserCircleLight } from 'react-icons/pi';

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
    const [isLoading, setIsLoading] = useState(false);
    const countries = ['Все страны', 'Сербия', 'Хорватия', 'Россия', 'Бангладеш', 'Канада', 'Кыргызстан'];


    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/getworkvisa');
            setVisas(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
        } finally {
            setIsLoading(false);
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
        const visaStartDate = visa.formData?.permit_planned_entry ? new Date(visa.formData.permit_planned_entry) : null;
        const visaEndDate = visa.formData?.permit_planned_exit ? new Date(visa.formData.permit_planned_exit) : null;

        const matchesStartDate = !startDate || (visaStartDate && visaStartDate >= startDate);
        const matchesEndDate = !endDate || (visaEndDate && visaEndDate <= endDate);

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
                            className="p-2 border bg-inherit border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="p-2 border bg-inherit border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
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
                            className="p-2 border bg-inherit border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="Конечная дата"
                            className="p-2 border bg-inherit border-gray-300 rounded-lg text-xs sm:text-sm shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                        />
                    </div>
                </div>

                <CCard className="overflow-x-auto min-h-96 border mt-4">
                    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                        <CTable className="w-full text-left table-auto">
                            <CTableHead className="text-xs sm:text-sm">
                                <tr>
                                    <th className="px-4 py-2 font-semibold">Фото</th>
                                    <th className="px-4 py-2 font-semibold">Имя</th>
                                    <th className="px-4 py-2 font-semibold">Фамилия</th>
                                    <th className="px-4 py-2 font-semibold">Данные документа</th>
                                    <th className="px-4 py-2 font-semibold">Начало действия визы</th>
                                    <th className="px-4 py-2 font-semibold">Окончание действия визы</th>
                                    <th className="px-4 py-2 font-semibold">Страна</th>
                                    <th className="px-4 py-2 font-semibold">Действия</th>
                                </tr>
                            </CTableHead>
                            <CTableBody className="text-xs sm:text-sm">
                                {
                                    isLoading ?
                                        <tr>
                                            <ReactLoading effect="spin" type="bubbles" className="border-none" color="#0394fc" height={60} width={60} />
                                        </tr>
                                        : filteredVisas.length > 0 ? filteredVisas.map((visa) => (
                                            <tr key={visa._id} className="border-b transition duration-200">
                                                <td className="px-4 py-2">
                                                    {visa.formData.photo ?
                                                        <img
                                                            src={`${visa.formData.photo}`}
                                                            alt="Фото"
                                                            className="w-6 h-6 object-cover rounded-full"
                                                        />
                                                        : (
                                                            <div className='w-6 h-6'>
                                                                <PiUserCircleLight className="w-6 h-6" color="gray" />
                                                            </div>
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
                                                    <button onClick={() => handleEdit(visa._id)} className="text-green-500 hover:text-green-700">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDelete(visa._id)} className="text-red-500 hover:text-red-700">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="8" className="px-4 py-2 text-center">
                                                    Нет данных
                                                </td>
                                            </tr>
                                        )
                                }
                            </CTableBody>
                        </CTable>
                    </div>
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
                                <div className="flex lg:flex-row flex-col gap-5">
                                    <div className="flex flex-col gap-4">
                                        <VisaPhotoSection visa={filteredVisas} selectedVisa={selectedVisa} />
                                        {editMode && <VisaDocuments selectedDocument={selectedDocument} />}
                                    </div>
                                    <VisaDetails countries={countries} selectedVisa={selectedVisa} handleInputChange={handleInputChange} />
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
