import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import moment from "moment";

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            addTicket: {
                id: this.props.nextID,
                ticketNumber: '',
                tag: '',
                operationType: '',
                timeStamp: moment().format()
            },
            errorMessage: false
        }
    }

    handleClose = () => {
        this.props.handleClose('showAdd');
        this.setState({
            addTicket: {
                id: '',
                ticketNumber: '',
                tag: '',
                operationType: '',
                timeStamp: ''
            },
            errorMessage: false
        })
    };

    submitHandler = (e) => {
        e.preventDefault();

        this.state.addTicket.id = this.props.nextID;
        this.state.addTicket.timeStamp = moment().format();
        console.log(this.state.addTicket)
        this.props.trips.tripsData.push(this.state.addTicket);

        console.log(this.props)

        this.showTripData();
        this.handleClose();

    };

    changeHandler = e => {
        var trg = e.target.name;//.split('-');
        var mrgd = this.state.addTicket;
        mrgd[trg]= e.target.value;
        this.setState({addTicket: mrgd });
    };

    showTripData = async (fData = false) => {
        fData = fData ? fData : this.props.trips.tripsData;

        document.getElementById('tripsTableData').innerHTML = fData.map((item) => {
            return '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.ticketNumber + '</td>' +
                '<td>' + item.tag + '</td>' +
                '<td>' + ['Wygenerowanie biletu', 'Przywołanie biletu', 'Zakończenie biletu', 'Anulowanie biletu'][item.operationType] + '</td>' +
                '<td>' + moment(item.timeStamp).format('YYYY-MM-DD HH:mm') + '</td>' +
                '</tr>';
        }).join(' ')

    }

    componentDidMount() {
        this.state.addTicket.timeStamp = moment().format();
    };



    render() {
        return (
            <Modal show={this.props.showAdd} onHide={this.handleClose} centered size="lg">
                <Form onSubmit={this.submitHandler}>
                    <Alert variant="info" className="text-center font-weight-bold">Add Ticket</Alert>{this.state.errorMessage
                    ? <Alert variant="danger" className="text-center font-weight-bold">{this.state.errorMessage}</Alert>
                    : ''
                }
                    <Modal.Body>
                        <hr/>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="small text-uppercase">*Ticket ID</Form.Label>
                                <Form.Control type="text" readOnly
                                              name="id" value={this.props.nextID}
                                              onChange={this.changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="small text-uppercase">*Timestamp</Form.Label>
                                <Form.Control type="text" readOnly
                                              name="timestamp" value={moment().format()}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label className="small text-uppercase">*Ticket Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter ticket number" required
                                              name="ticketNumber" value={this.state.addTicket.ticketNumber}
                                              onChange={this.changeHandler}/>
                                <Form.Text><i>*required field</i></Form.Text>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label className="small text-uppercase">*Tag</Form.Label>

                                <br/>
                                <Form.Check
                                    inline
                                    name="tag"
                                    label="A"
                                    type="radio"
                                    value="A"
                                    onChange={this.changeHandler}
                                    required
                                />
                                <Form.Check
                                    inline
                                    name="tag"
                                    label="B"
                                    type="radio"
                                    value="B"
                                    onChange={this.changeHandler}
                                    required
                                />
                                <Form.Check
                                    inline
                                    name="tag"
                                    label="C"
                                    type="radio"
                                    value="C"
                                    onChange={this.changeHandler}
                                    required
                                />
                                <Form.Check
                                    inline
                                    name="tag"
                                    label="D"
                                    type="radio"
                                    value="D"
                                    onChange={this.changeHandler}
                                    required
                                />
                                <Form.Text><i>*required field</i></Form.Text>


                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label className="small text-uppercase">Operation type</Form.Label>
                                <Form.Control as="select"
                                              name="operationType" value={this.state.addTicket.operationType}
                                              onChange={this.changeHandler}
                                              required
                                >
                                    <option value=''>
                                        Choose...
                                    </option>

                                    <option value='0' key='0'>
                                        Wygenerowanie biletu
                                    </option>

                                    <option value='1' key='1'>
                                        Przywołanie biletu
                                    </option>

                                    <option value='2' key='2'>
                                        Zakończenie biletu
                                    </option>

                                    <option value='3' key='3'>
                                        Anulowanie biletu
                                    </option>

                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="info" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default ModalAdd;
