import React from 'react';
import { Card } from 'react-bootstrap';

const Image = props => {
    return (<div className="image-container container">
        {props.images.map((image =>  (
            <Card className="image" key={image.id}>
                <Card.Img variant="top" 
                    style={{height: '300px', width: '100%'}}
                    src={image.urls.full} />
                <Card.Body>
                <Card.Text>
                    {image.alt_description}
                </Card.Text>
                </Card.Body>
            </Card>
        )))}
    </div>)
}

export default Image;