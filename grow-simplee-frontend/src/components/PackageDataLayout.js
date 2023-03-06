import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Switch  from 'react-router-dom'
import PackageRoutes from './routes/PackageRoutes';



const PackageDataLayout = () => {
  // const []
  
  return (
    <>
      <ButtonGroup size='large'>
        <Button> <Link to={`/dimensions`}>Dimensions</Link></Button>
        <Button><Link to={`/location`}>Location</Link></Button>
        <Button><Link to={`/status`}>Status</Link></Button>
      </ButtonGroup>
      <PackageRoutes />
      {/* <Switch></Switch> */}
    </>
  )
}

export default PackageDataLayout