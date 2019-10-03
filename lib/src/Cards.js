import React from 'react';
import Card from 'react-bootstrap/Card';

export default class Cards extends React.Component{
    render(){
        return(
        <Card style={{flex: 1}}>
            <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.description}
                    </Card.Text>
                </Card.Body>
        </Card>
        );
    }
}