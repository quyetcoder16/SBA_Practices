import React from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import OrchidCard from './OrchidCard';
import { OrchidsData } from '../shared/ListOfOrchidss';

export default function Orchids() {

    const [listOrchids, setListOrchids] = React.useState(OrchidsData);
    const [selectedOrchid, setSelectedOrchid] = React.useState(null);
    const [show, setShow] = React.useState(false);

    const handleShow = (orchid) => {
        setSelectedOrchid(orchid);
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
        setSelectedOrchid(null);
    }


    return (
        <Container className='mt-5'>
            <Row xs={1} md={4} className="g-4">

                {listOrchids.map((orchid) => (
                    <Col key={orchid.id}>
                        <OrchidCard
                            title={orchid.orchidName}
                            description={orchid.category}
                            image={orchid.image}
                            orchid={orchid}
                            handleShow={handleShow}
                        /></Col>
                ))}

            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOrchid?.orchidName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedOrchid?.image} alt={selectedOrchid?.orchidName} style={{ width: '100%' }} />
                    <p className='mt-3'>{selectedOrchid?.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
