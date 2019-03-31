import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Media
} from 'reactstrap';
import { connect } from "react-redux";
import { addItem } from "../actions/mealActions";

class MealModal extends Component {

    state = {
        modal: false,
        name: '',
        image: '/food_placeholder.png'
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    processImage = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsBinaryString(file);
    
        reader.onload = () => {
            this.setState({
                image: 'data:image/jpeg;base64,'+btoa(reader.result)
            });
        };
        reader.onerror = function() {
            console.log('there are some problems');
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const split = this.state.image.split(','); // or whatever is appropriate here. this will work for the example given
        const base64string = split[1];
    
        const newItem = {
            name: this.state.name,
            image: new Buffer(base64string, 'base64')
        }

        this.props.addItem(newItem);

        this.toggle();

    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom:'2rem'}}
                    onClick={this.toggle}
                >Add Meal</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Meals List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input 
                                id="item"
                                type="text"
                                name="name"
                                placeholder="Add meal item"
                                onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="item_image">Meal Image</Label>
                                <Input 
                                id="item_image"
                                type="file"
                                name="image"
                                placeholder="Add meal image"
                                onChange={this.processImage}
                                />
                            </FormGroup>
                            {/* <Image src={'data:image/jpeg;base64,'+this.state.image} rounded /> */}
                            <Media src={this.state.image} alt="Generic placeholder image" className="img-fluid"/>
                        <Button color="dark" style={{marginTop: '2rem'}} block>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(
    mapStateToProps,
    { addItem }
)(MealModal);