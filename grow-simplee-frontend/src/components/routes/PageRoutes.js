import React from 'react'
import { useRoutes } from 'react-router-dom';
import NotFound from '../../pages/notFound';
import MainPackageTable from '../MainPackageTable';
import PackageDataLayout from '../PackageDataLayout';
import PackageDataLocation from '../PackageDataLocation';
import RiderData from '../RiderData';
import RoutesData from '../RoutesData';

const PageRoutes = () => {
    const routes = useRoutes([{
        path: "/package/*",
        element: < PackageDataLayout ></PackageDataLayout>,
    }, {
        path: "/",
        children: [
            {
                path: "/packages",
                element: <MainPackageTable />
            },
            {
                path: "/riders",
                element: <RiderData />
            },
            {
                path: "/routes",
                element: <RoutesData />
            },

            {
                path: "/*",
                element: <NotFound />
            }
        ]
    }

    ])
    return routes;
}

export default PageRoutes;