import React from 'react'
import { CProgress, CProgressBar } from '@coreui/react'

export const ProgressBackgrounds2Example = ({ countryStats }) => {
    return (
        <div>
            Бангладеш
            <CProgress color="success" className='mb-3' value={countryStats[0]}>
                <CProgressBar>{countryStats[0]}</CProgressBar>
            </CProgress>
            Канада
            <CProgress color="success" className='mb-3' value={countryStats[1]}>
                <CProgressBar>{countryStats[1]}</CProgressBar>
            </CProgress>
            Россия
            <CProgress color="success" className='mb-3' value={countryStats[2]}>
                <CProgressBar>{countryStats[2]}</CProgressBar>
            </CProgress>
            Хорватия
            <CProgress color="info" value={countryStats[3]} className='mb-3'>
                <CProgressBar>{countryStats[3]}</CProgressBar>
            </CProgress>
            Сербия
            <CProgress color="warning" value={countryStats[4]} className='mb-3'>
                <CProgressBar >{countryStats[4]}</CProgressBar>
            </CProgress>
            Кыргызстан
            <CProgress color="danger" className='mb-3' value={countryStats[5]}>
                <CProgressBar>{countryStats[5]}</CProgressBar>
            </CProgress>
        </div>
    )
}
