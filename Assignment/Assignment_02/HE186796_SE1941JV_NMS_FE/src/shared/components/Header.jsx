import { AuthActionsContext, AuthStatesContext } from '@/app/provider/AuthProvider';
import React, { useContext } from 'react'
import { People } from 'react-bootstrap-icons'
import { BiUserCircle } from 'react-icons/bi'
import { GoSignOut } from 'react-icons/go'

export default function Header() {

    const { userContext } = useContext(AuthStatesContext);
    const { logout } = useContext(AuthActionsContext);

    return (

        <div className='d-flex align-items-center justify-content-between header px-4 border-bottom py-2'>
            <div className='left_header d-flex align-items-center'>
                <img style={{
                    width: '80px',
                    height: '80px',
                }} src="/icon.png" alt="" />
                <span className='fw-bold fs-5'>FUNews Management System</span>
            </div>
            <div className='profile d-flex align-items-center' >
                <div className='d-flex align-items-center me-4'>
                    <BiUserCircle className='fs-4 text-primary' />
                    <span className='mx-2 fw-medium'>
                        {userContext ? userContext.name : 'Guest'}
                    </span>
                </div>
                <div
                    className='d-flex align-items-center'
                    onClick={logout}
                    style={{ cursor: 'pointer' }}
                >
                    <GoSignOut className='me-1 text-danger' />
                    <span className='text-danger fw-medium'>Logout</span>
                </div>
            </div>
        </div>
    )
}
