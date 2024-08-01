"use client"

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
    // className="" id= "abc"
    <Box sx={{ flexGrow: 1 }} >
    <AppBar position="static" id='bg'>
      <Toolbar className='w-[100%]'>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography
          variant="h4"
          className='text-center md:text-left'
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <p className='font-bold text-[#1f596b] text-2xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-4xl'>Course Registration Form</p>
        </Typography>
        <button
          // color="inherit"
          id='button1'
          onClick={()=>{router.push("/download")}}
          className='btn h-12 hidden md:inline \ bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] rounded-md text-lg'
          // sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
        >
          <p className='font-bold '>Download ID Card</p>
        </button>
        <button
          // color="inherit"
          id='button2'
          onClick={()=>{router.push("/payment")}}
          className='btn hidden md:inline h-12  bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e]  rounded-md text-lg'
          // sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
        >
          <p className='font-bold'>Payment Verify</p>
        </button>

{/* <button className="btn h-12 w-[14%] md:w-[20%] bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] mt-4 text-white text-lg h-12 rounded-lg mx-auto block px-12 tracking-wider"
          onClick={()=>{router.push("/payment")}}
                    // onClick={handleRegister}
                // disabled={!isFormValid()}
> Register
      </button> */}



      </Toolbar>
    </AppBar>
  </Box>
  );
}