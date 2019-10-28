import React from 'react'
import axios from "axios"
import moment from 'moment'
import {connect} from 'react-redux'
import {setTrips} from '../redux'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ModalAdd from "./ModalAdd";
import Button from "react-bootstrap/Button";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addTicket: [],
            showAdd: false,
            setShow: false,
            nextID: ''
        }
    }

    handleClose = el => {
        this.setState({[el]: false});
    };

    addTicket = () => {
        console.log('Add User#');
        const maxValueOfY = Math.max(...this.props.trips.tripsData.map(o => o.id), 0);
        this.setState({nextID: maxValueOfY + 1})
        this.setState({showAdd: true})
    };

    changeHandlerAdd = e => {

        console.log('changeHandlerAdd:')
        this.setState({addTicket: {[e.target.name]: e.target.value}})
    };


    handleSearch = event => {

        const dData = this.props.trips.tripsData.filter(function (item) {
            return item[event.target.name].toString().toUpperCase().includes(event.target.value.toUpperCase());
        });

        if (dData.length === 0) {
            document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, no departure found :c </td></tr>'
        } else {
            this.showTripData(dData)
        }
    };


    getTripData = () => {
        axios.get('./ticketLogs.json')
            .then(response => {
                this.props.setTrips({tripsData: response.data});
                this.showTripData();
            })
            .catch(error => {
                document.getElementById('tripsTableData').innerHTML = '<tr><td colspan="4" class="message">Oops, something wrong on a serverside </td></tr>'
            })
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
        this.getTripData();
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <h5 className="float-left">Travel board</h5>
                    <Button variant="info" onClick={() => this.addTicket()} className="float-right">
                        Add new
                    </Button>
                </Card.Header>

                <Card.Body>
                    <Table striped bordered hover responsive id="tripsTable">
                        <thead>
                        <tr>
                            <th width="5%"
                                style={{verticalAlign: "middle"}}>Id
                                <Form.Control
                                    type="text"
                                    onChange={this.handleSearch}
                                    ref={ref => (this.refS = ref)}
                                    name="id"
                                /></th>
                            <th width="5%"
                                style={{verticalAlign: "middle"}}
                            >Ticket Number
                                <Form.Control
                                    type="text"
                                    onChange={this.handleSearch}
                                    ref={ref => (this.refS = ref)}
                                    name="ticketNumber"
                                /></th>
                            <th width="20%"
                                style={{verticalAlign: "middle"}}
                            >Tag
                                <Form.Control
                                    type='text'
                                    onChange={this.handleSearch}
                                    ref={ref => (this.refS = ref)}
                                    name="tag"
                                /></th>
                            <th width="20%"
                                style={{verticalAlign: "middle"}}
                            >Operation type
                                <Form.Control as="select"
                                              onChange={this.handleSearch}
                                              ref={ref => (this.refS = ref)}
                                              name="operationType"
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

                            </th>
                            <th width="200"
                                style={{verticalAlign: "middle"}}
                            >Time stamp
                                <Form.Control
                                    type="text"
                                    onChange={this.handleSearch}
                                    ref={ref => (this.refS = ref)}
                                    name="timeStamp"
                                    placeholder='Date (YYYY-MM-DD)'
                                    style={{minWidth: 200 + 'px'}}
                                    size="sm"
                                />

                                <Form.Control
                                    type="text"
                                    onChange={this.handleSearch}
                                    ref={ref => (this.refS = ref)}
                                    name="timeStamp"
                                    placeholder='Time (HH:MM)'
                                    size="sm"
                                />
                            </th>
                        </tr>
                        </thead>
                        <tbody id="tripsTableData"></tbody>
                    </Table>
                </Card.Body>

                <ModalAdd {...this.state} {...this.props} handleClose={this.handleClose}
                          changeHandler={this.changeHandlerAdd}/>
            </Card>


        );
    }

}


// Redux container
const mapStateToProps = state => ({
    trips: state.trips,
});

const mapDispatchToProps = {
    setTrips
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default AppContainer;
