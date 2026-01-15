import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import OrchidCard from './OrchidCard';

export default function Orchids() {

    const [listOrchids, setListOrchids] = React.useState([
        {
            id: 1,
            title: "Orchid 1",
            description: "This is orchid 1",
            image: "https://marketplace.canva.com/sdcNU/MAEE4osdcNU/1/tl/canva-beautiful-flowers-background-MAEE4osdcNU.jpg"
        },
        {
            id: 2,
            title: "Orchid 2",
            description: "This is orchid 2",
            image: "https://marketplace.canva.com/sdcNU/MAEE4osdcNU/1/tl/canva-beautiful-flowers-background-MAEE4osdcNU.jpg"
        },
        {
            id: 3,
            title: "Orchid 3",
            description: "This is orchid 3",
            image: "https://marketplace.canva.com/sdcNU/MAEE4osdcNU/1/tl/canva-beautiful-flowers-background-MAEE4osdcNU.jpg"
        },
        {
            id: 4,
            title: "Orchid 4",
            description: "This is orchid 4",
            image: "https://marketplace.canva.com/sdcNU/MAEE4osdcNU/1/tl/canva-beautiful-flowers-background-MAEE4osdcNU.jpg"
        },

    ]);

    return (
        <Container className='mt-5'>
            <Row xs={1} md={4} className="g-4">

                {listOrchids.map((orchid) => (
                    <Col key={orchid.id}>
                        <OrchidCard

                            title={orchid.title}
                            description={orchid.description}
                            image={orchid.image}
                        /></Col>
                ))}

            </Row></Container>
    )
}
