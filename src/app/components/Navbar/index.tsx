"use client"

import Link from 'next/link';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome } from "react-icons/fa";
import { defaultLoginOrRegisterFormValues, loginOrRegisterValidationSchema } from './constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from '../InputField';
import { LoginOrRegisterForm, LoginOrRegisterResponseBody } from '@/types/app';
import { useApp } from '@/app/providers/app.provider';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AppNavbar() {
  const router = useRouter();
  const { isAuth, user, login, logout } = useApp();

  const handleLogout = () => {
    logout();
  }

  const loginOrRegisterForm = useForm<LoginOrRegisterForm>({
    resolver: yupResolver(loginOrRegisterValidationSchema),
    defaultValues: defaultLoginOrRegisterFormValues,
    mode: 'onChange',
  });

  const { control, handleSubmit } = loginOrRegisterForm;

  const onSubmit = async (values: LoginOrRegisterForm) => {
    const result: LoginOrRegisterResponseBody | null = await login(values);
    if (!result) {
      toast.error('There is something wrong with server! Please try again');
    } else {
      if (result.isAuth) {
        if (result.data) toast.success('Registered Successfully!');
        else toast.success('Login Successfully!');
      } else {
        toast.error(result.message);
      }
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} href="/"><FaHome />Funny Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          {!isAuth ? (
            <Form className="d-flex gap-2" onSubmit={handleSubmit(onSubmit)}>
              <InputField control={control} name='email' className='me-2' type='email' />
              <InputField control={control} name='password' className='me-2' type='password' />
              <div>
                <Button type='submit' variant="outline-success">Login/Register</Button>
              </div>
            </Form>
          ) : (
            <div className='d-flex gap-2 align-items-center'>
              <div>Welcome {user?.email}</div>
              <Link className='btn btn-outline-success' href={'/share'}>
                Share a movie
              </Link>
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
