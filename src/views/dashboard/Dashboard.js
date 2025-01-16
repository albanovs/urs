import React, { useEffect, useState } from 'react'
import { WidgetStatsAExample } from './widget'
import { ChartBarExample, ProgressBackgrounds2Example } from './chart'
import { CCard, CCardBody, CCardGroup, CCardHeader, CTable, CTableBody, CTableHead } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVisas } from 'src/store/slices/get_work_visa'

const Dashboard = () => {
  const { visas, isLoading, error, isDataFetched } = useSelector(state => state.visa)
  const dispatch = useDispatch()
  const [countryStats, setCountryStats] = useState([]);

  useEffect(() => {
    if (!isDataFetched) {
      dispatch(fetchVisas())
    }
  }, [dispatch, isDataFetched])

  useEffect(() => {
    if (visas.length > 0) {
      const countries = ['Бангладеш','Россия', 'Хорватия', 'Сербия', 'Кыргызстан'];
      const countryCount = new Array(countries.length).fill(0);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();

      visas.forEach(visa => {
        const visaDate = new Date(visa.data);
        const visaYear = visaDate.getFullYear();
        const visaMonth = visaDate.getMonth();

        if (visaYear === currentYear && visaMonth === currentMonth) {
          const country = visa.formData?.permit_country;
          if (country) {
            const countryIndex = countries.indexOf(country);
            if (countryIndex !== -1) {
              countryCount[countryIndex] += 1;
            }
          }
        }
      });
      setCountryStats(countryCount);
    }
  }, [visas]);

  const monthCountVisa = countryStats?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const latestVisas = visas
    .filter(visa => {
      const visaDate = new Date(visa.data);
      return visaDate.getFullYear() === currentYear && visaDate.getMonth() === currentMonth;
    })
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  return (
    <>
      <WidgetStatsAExample monthCountVisa={monthCountVisa} />
      <CCard className="mb-4">
        <CCardHeader>Количество виз по странам за текущий месяц</CCardHeader>
        <CCardBody><ProgressBackgrounds2Example countryStats={countryStats} /></CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Последние зарегистрированные визы</CCardHeader>
        <CCardBody>
          <CTable className="w-full border-collapse bg-white lg:text-sm text-xs">
            <CTableHead>
              <tr className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-left">
                <th className="px-6 py-4 font-medium text-center">ФИО</th>
                <th className="px-6 py-4 font-medium text-center">Дата выдачи</th>
                <th className="px-6 py-4 font-medium text-center">Страна</th>
                <th className="px-6 py-4 font-medium text-center">Время регистрации визы</th>
              </tr>
            </CTableHead>
            <CTableBody>
              {latestVisas.map((visa, index) => {
                const visaDate = new Date(visa.data);
                const formattedDate = visaDate.toLocaleString('ru-RU', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });

                return (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      } hover:bg-gray-200 transition duration-200`}
                  >
                    <td className="px-6 py-4 text-center">{visa.formData?.permit_fname} {visa.formData?.permit_lname}</td>
                    <td className="px-6 py-4 text-center">{visa.formData?.permit_docstart}</td>
                    <td className="px-6 py-4 text-center">{visa.formData?.permit_country}</td>
                    <td className="px-6 py-4 text-center">{formattedDate}</td>
                  </tr>
                );
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard;
