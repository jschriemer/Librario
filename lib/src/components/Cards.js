import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

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
                    <Button className = "btn" variant="secondary" type="submit" size="lg">
                </Card.Body>
        </Card>
        );
    }
}
