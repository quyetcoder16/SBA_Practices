import Footer from '@/shared/components/Footer'
import Header from '@/shared/components/Header'
import Navbar from '@/shared/components/Navbar'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Header />
            <Container fluid>
                <Row style={{
                    height: "100vh"
                }}>
                    <Col md={2} style={{
                        borderRight: "1px solid #ccc",
                    }}>
                        <Navbar />
                    </Col>
                    <Col md={10} className='p-0'>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}
