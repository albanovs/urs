import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBarChart, cilList, cilNoteAdd, cilPuzzle } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Главная',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  // },
  {
    component: CNavTitle,
    name: 'Визы',
  },
  {
    component: CNavGroup,
    name: 'Рабочие визы',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Создать',
        to: '/visa/create',
      },
      {
        component: CNavItem,
        name: 'Рабочие визы',
        to: '/dashboard',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Сапар визы',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Создать',
        to: '/visa/create-tour',
      },
      {
        component: CNavItem,
        name: 'Сапар визы',
        to: '/visa/database-tour',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Exit визы',
    to: '/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Создать',
        to: '/visa/create-exit',
      },
      {
        component: CNavItem,
        name: 'Exit визы',
        to: '/visa/database-exit',
      },
    ],
  },
]

export default _nav
