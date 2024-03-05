import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import style from "../Navbar/nav.css"
import { useRouter } from 'next/navigation';
// import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar(){

const router = useRouter()

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" id='bg'>
      <Toolbar className='w-[100%]'>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography
          variant="h4"
          className='ml-[15%] sm:ml-[15%] xs:ml-[5%] text-center md:text-left'
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <p className='font-bold text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl'>Course Registration Form</p>
        </Typography>
        <Button
          color="inherit"
          id='button1'
          onClick={()=>{router.push("/download")}}
          className='h-12 w-[14%] md:w-[20%] border border-white-900 rounded-md justify-between items-center text-center'
          sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
        >
          <p className='font-bold '>Download ID Card</p>
        </Button>
        <Button
          color="inherit"
          id='button2'
          onClick={()=>{router.push("/payment")}}
          className='h-12 w-[14%] md:w-[20%] border border-white-900 justify-between items-center rounded-md text-center'
          sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
        >
          <p className='font-bold'>Payment Verify</p>
        </Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
}