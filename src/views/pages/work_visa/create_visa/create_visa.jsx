import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CCard } from '@coreui/react';
import { FormInput } from './form_input_component';
import { api } from 'src/api';

const CreateVisa = () => {
    const [formData, setFormData] = useState({
        selectedImage: null,
        additionalFiles: [],
        permit_country: '',
        permit_type: '',
        permit_srok: '',
        permit_doc_nom: '',
        permit_docstart: '',
        permit_docend: '',
        permit_doctype: '',
        permit_lname: '',
        permit_fname: '',
        permit_bdate: '',
        permit_gender: '',
        permit_pin: '',
        permit_education: '',
        permit_famstatus: '',
        permit_planned_entry: '',
        permit_planned_exit: '',
        selectedVisa: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'additionalFiles') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: Array.from(files),
            }));
        } else if (name === 'selectedImage') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { selectedImage, additionalFiles, permit_country, permit_type,
            permit_srok, permit_doc_nom, permit_docstart, permit_docend, permit_doctype,
            permit_lname, permit_fname, permit_bdate, permit_gender,
            permit_pin, permit_education, permit_famstatus,
            permit_planned_entry, permit_planned_exit } = formData;
        const formDataToSubmit = new FormData();

        if (selectedImage) formDataToSubmit.append('photo', selectedImage);
        formDataToSubmit.append('permit_country', permit_country);
        formDataToSubmit.append('permit_type', permit_type);
        formDataToSubmit.append('permit_srok', permit_srok);
        formDataToSubmit.append('permit_doc_nom', permit_doc_nom);
        formDataToSubmit.append('permit_docstart', permit_docstart);
        formDataToSubmit.append('permit_docend', permit_docend);
        formDataToSubmit.append('permit_doctype', permit_doctype);
        formDataToSubmit.append('permit_lname', permit_lname);
        formDataToSubmit.append('permit_fname', permit_fname);
        formDataToSubmit.append('permit_bdate', permit_bdate);
        formDataToSubmit.append('permit_gender', permit_gender);
        formDataToSubmit.append('permit_pin', permit_pin);
        formDataToSubmit.append('permit_education', permit_education);
        formDataToSubmit.append('permit_famstatus', permit_famstatus);
        formDataToSubmit.append('permit_planned_entry', permit_planned_entry);
        formDataToSubmit.append('permit_planned_exit', permit_planned_exit);

        additionalFiles.forEach((file) => {
            formDataToSubmit.append('additionalFiles', file);
        });

        try {
            await api.post('/api/localsaveFormData', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Виза успешно добавлена!');
            setFormData({
                selectedImage: null,
                additionalFiles: [],
                permit_country: '',
                permit_type: '',
                permit_srok: '',
                permit_doc_nom: '',
                permit_docstart: '',
                permit_docend: '',
                permit_doctype: '',
                permit_bezdrajd: '',
                permit_lname: '',
                permit_fname: '',
                permit_bdate: '',
                permit_gender: '',
                permit_pin: '',
                permit_education: '',
                permit_famstatus: '',
                permit_planned_entry: '',
                permit_planned_exit: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('Не удалось сохранить визу');
        } finally {
            setIsSubmitting(false);
        }
    };

    const { selectedImage, additionalFiles, permit_country, permit_type
        , permit_srok, permit_doc_nom, permit_docstart, permit_docend, permit_doctype,
        permit_lname, permit_fname, permit_bdate, permit_gender,
        permit_pin, permit_education, permit_famstatus,
        permit_planned_entry, permit_planned_exit,
    } = formData;

    return (
        <CCard className="w-full rounded-xl p-4 mb-4">
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-[150px,3fr] gap-3">
                    <div className="flex justify-center">
                        <div
                            className="w-40 h-56 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById('photoInput').click()}
                            style={{ aspectRatio: '3 / 4', overflow: 'hidden', position: 'relative' }}
                        >
                            {selectedImage ? (
                                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-500 text-sm">
                                    <span className="text-xl">+</span>
                                    <span>Выберите фото</span>
                                </div>
                            )}
                            <input
                                type="file"
                                id="photoInput"
                                className="hidden"
                                name="selectedImage"
                                onChange={handleChange}
                                accept="image/*"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className='grid gap-3'>
                                <FormInput label="Имя" value={permit_fname} onChange={handleChange} name="permit_fname" required />
                                <FormInput label="Фамилия" value={permit_lname} onChange={handleChange} name="permit_lname" required />
                                <FormInput label="Год рождения" type="date" value={permit_bdate} onChange={handleChange} name="permit_bdate" required />
                                <FormInput
                                    label="Пол"
                                    type="select"
                                    value={permit_gender}
                                    onChange={handleChange}
                                    name="permit_gender"
                                    options={[
                                        { value: "1", label: "Мужской" },
                                        { value: "2", label: "Женский" }
                                    ]}
                                    required
                                />
                                <FormInput
                                    label="Образование"
                                    type="select"
                                    value={permit_education}
                                    onChange={handleChange}
                                    name="permit_education"
                                    options={[
                                        { value: "1", label: "Образование детей младшего возраста" },
                                        { value: "2", label: "Начальное образование" },
                                        { value: "3", label: "Первый этап среднего образования" },
                                        { value: "4", label: "Второй этап среднего образования" },
                                        { value: "5", label: "Послесреднее нетретичное образование" },
                                        { value: "6", label: "Третичное образование" },
                                        { value: "7", label: "Короткий цикл третичного образования" },
                                        { value: "8", label: "Бакалавриат или его эквивалент" },
                                        { value: "9", label: "Магистратура или её эквивалент" },
                                        { value: "10", label: "Докторантура или её эквивалент" },
                                        { value: "11", label: "Другое" },
                                    ]}
                                    required
                                />
                                <FormInput
                                    label="Семейное положение"
                                    type="select"
                                    value={permit_famstatus}
                                    onChange={handleChange}
                                    name="permit_famstatus"
                                    options={[
                                        { value: "1", label: "женат/замужем" },
                                        { value: "2", label: "холост/не замужем" }
                                    ]}
                                    required
                                />
                                <FormInput
                                    label="Страна"
                                    type="select"
                                    value={permit_country}
                                    onChange={handleChange}
                                    name="permit_country"
                                    options={[
                                        { value: "103", label: "Индия" },
                                        { value: "19", label: "Бангладеш" },
                                        { value: "58", label: "Хорватия" },
                                        { value: "183", label: "Россия" },
                                        { value: "197", label: "Сербия" },
                                        { value: "", label: "Другое" },
                                    ]}
                                    required
                                />
                                <FormInput label="ПИН" value={permit_pin} onChange={handleChange} name="permit_pin" required />
                            </div>
                            <div className='grid gap-3'>
                                <FormInput
                                    label="Тип документа"
                                    type="select"
                                    value={permit_doctype}
                                    onChange={handleChange}
                                    name="permit_doctype"
                                    options={[
                                        { value: "1", label: "Обычный" },
                                        { value: "2", label: "Дипломатический" },
                                        { value: "3", label: "Служебный/Официальный" },
                                        { value: "9", label: "Другой проездной документ" },
                                        { value: "114", label: "Проездной документ лица без гражданства" },
                                    ]}
                                    required
                                />
                                <FormInput label="Номер документа" value={permit_doc_nom} onChange={handleChange} name="permit_doc_nom" required />
                                <FormInput label="Документ действителен от" type="date" value={permit_docstart} onChange={handleChange} name="permit_docstart" required />
                                <FormInput label="Документ действителен до" type="date" value={permit_docend} onChange={handleChange} name="permit_docend" required />
                                <FormInput
                                    label="Тип единого разрешения"
                                    type="select"
                                    value={permit_type}
                                    onChange={handleChange}
                                    name="permit_type"
                                    options={[
                                        { value: "1", label: "Обычное единое разрешение" },
                                        { value: "4", label: "Единое разрешение для находящихся по категории визы" }
                                    ]}
                                    required
                                />
                                <FormInput
                                    label="Срок единого разрешения"
                                    type="select"
                                    value={permit_srok}
                                    onChange={handleChange}
                                    name="permit_srok"
                                    options={[
                                        { value: "60 дней", label: "60 дней" },
                                        { value: "360 дней", label: "360 дней" }
                                    ]}
                                    required
                                />
                                <FormInput label="Плановая дата въезда" type="date" value={permit_planned_entry} onChange={handleChange} name="permit_planned_entry" required />
                                <FormInput label="Плановая дата выезда" type="date" value={permit_planned_exit} onChange={handleChange} name="permit_planned_exit" required />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mt-5">
                    <div className='flex items-center justify-between'>
                        <label className="block w-40 text-gray-700 text-xs font-medium mb-2">Дополнительные файлы</label>
                        <div
                            className="lg:w-80 border border-gray-300 px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            onClick={() => document.getElementById('additionalFilesInput').click()}
                        >
                            {additionalFiles.length > 0 ? (
                                <span>{additionalFiles.length} файл(ов) выбран(о)</span>
                            ) : (
                                <div className="flex flex-col text-gray-500 text-sx">
                                    <span>Прикрепите файлы</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="additionalFilesInput"
                            name="additionalFiles"
                            onChange={handleChange}
                            multiple
                            className="hidden"
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className={`w-80 h-8 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 text-xs ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Загрузка...' : 'Сохранить'}
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </CCard>
    );
};

export default CreateVisa;