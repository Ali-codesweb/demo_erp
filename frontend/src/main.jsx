import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import { Appshell } from './components/Appshell';
import { NotificationsProvider } from '@mantine/notifications';
import { router } from './routes';
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position='top-right'>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </MantineProvider>
  ,
)
