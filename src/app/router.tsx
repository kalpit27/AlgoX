import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomeView } from '../features/home/HomeView'
import { SortingView } from '../features/sorting/SortingView'
import { SearchingView } from '../features/searching/SearchingView'
import { DataStructuresView } from '../features/ds/DataStructuresView'
import { GraphView } from '../features/graph/GraphView'
import { AlgorithmsReferenceView } from '../features/reference/AlgorithmsReferenceView'
import { AboutView } from '../features/about/AboutView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'visualizer/sorting',
        element: <SortingView />,
      },
      {
        path: 'visualizer/searching',
        element: <SearchingView />,
      },
      {
        path: 'visualizer/data-structures',
        element: <DataStructuresView />,
      },
      {
        path: 'visualizer/graph',
        element: <GraphView />,
      },
      {
        path: 'algorithms',
        element: <AlgorithmsReferenceView />,
      },
      {
        path: 'about',
        element: <AboutView />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
