import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function OrchidCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <Button variant="primary">Detail</Button>
            </Card.Body>
        </Card>
    )
}
