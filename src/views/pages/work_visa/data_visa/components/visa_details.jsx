import VisaInput from "./visa_input";

const VisaDetails = ({ selectedVisa, handleInputChange, countries }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {[
            ['Имя', 'fname'],
            ['Фамилия', 'lname'],
            ['Дата рождения', 'bdate'],
            ['Страна', 'country'],
            ['Пол', 'gender'],
            ['Семейное положение', 'famstatus'],
            ['Тип документа', 'doctype'],
            ['Номер документа', 'doc_nom'],
            ['Документ действителен от', 'docstart'],
            ['Документ действителен до', 'docend'],
            ['Тип единого разрешения', 'type'],
            ['Срок единого разрешения', 'srok'],
            ['Плановая дата въезда', 'planned_entry'],
            ['Плановая дата выезда', 'planned_exit'],
            ['Образование', 'education'],
            ['ПИН', 'pin'],
            ['email', 'email'],
            ['Адрес проживания', 'address'],
        ].map(([label, field], idx) => {
            const isDate = ['planned_entry', 'planned_exit', 'docstart', 'docend', 'bdate'].includes(field);
            const isSelect = ['gender'].includes(field);
            const genderOptions = [
                { label: 'Мужской', value: '1' },
                { label: 'Женский', value: '2' },
            ];
            const selectOptions = field === 'country'
                ? countries.map((country) => ({ label: country, value: country }))
                : [];

            return (
                <VisaInput
                    key={field}
                    label={label}
                    type={isDate ? 'date' : 'text'}
                    name={`permit_${field}`}
                    value={isSelect ? selectedVisa[`permit_${field}`] === '1' ? 'Мужской' : 'Женский' : selectedVisa[`permit_${field}`]}
                    onChange={handleInputChange}
                    options={isSelect ? (field === 'gender' ? genderOptions : selectOptions) : []}
                />
            );
        })}
    </div>
);

export default VisaDetails;
