import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CreateVisa = React.lazy(() => import('./views/pages/work_visa/create_visa/create_visa'))
const DataVisa = React.lazy(() => import('./views/pages/work_visa/data_visa/data_visa'))

const routes = [
  { path: '/', exact: true, name: 'Главная' },
  { path: '/dashboard', name: 'Статистика', element: Dashboard },
  { path: '/visa/create', name: 'Создать рабочую визу', element: CreateVisa },
  { path: '/visa/database', name: 'Рабочие визы', element: DataVisa },
]

export default routes
