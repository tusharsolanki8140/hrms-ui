import React,{ Component } from "react";
import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
import InfiniteScroll from 'react-infinite-scroller';
import Avatar from 'react-avatar';

const baseApiUrl = "http://localhost:1337/localhost:8020/hrms/api";

export default class Employees extends Component {

    constructor(props){
        super(props);
        this.state = {
            employees: [],
            pageCount: 20,
            hasMoreItems: true,
            nextHref: null,
            queryText: "",
            sortBy: "EMPLOYEE_ID",
            order: "ASC"
        };
    }

    sortByList = [
        {
            label: "Emp ID : ASC",
            value: "EMPLOYEE_ID:ASC"
        },
        {
            label: "Emp ID : DESC",
            value: "EMPLOYEE_ID:DESC"
        },
        {
            label: "First Name : ASC",
            value: "EMPLOYEE_FIRST_NAME:ASC"
        },
        {
            label: "First Name : DESC",
            value: "EMPLOYEE_FIRST_NAME:DESC"
        },
        {
            label: "Join. Date : ASC",
            value: "JOINING_DATE:ASC"
        },
        {
            label: "Join. Date : DESC",
            value: "JOINING_DATE:DESC"
        }
    ]

    updateQueryText = (event) => {
        this.setState({queryText: event.target.value, employees: [], hasMoreItems:true});
        this.scroller.pageLoaded = 0;
    }

    loadItems = (page) => {

        let employees = this.state.employees;
        let hasMoreItems = this.state.hasMoreItems;
        if(hasMoreItems){
            let requestBody = {
                "active": null,
                "order": this.state.order,
                "page": page,
                "perPage": 10,
                "queryString": this.state.queryText,
                "sortBy": this.state.sortBy,
                "validSortBy": true
            };

            fetch(`${baseApiUrl}/employees/search`,
            {
                method:"post",
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(res => res.json())
            .then((data) => {
                employees = [...employees, ...data];
                if(data.length < 10){
                    hasMoreItems = false;
                }
                this.setState({employees : employees, hasMoreItems: hasMoreItems});
            })
            .catch(console.error);
        }
    
    }

    changeSortBy = (event) => {
        let sortByText = event.target.value;
        let sortAndOrder = sortByText.split(":");
        this.setState({sortByText: sortByText, sortBy : sortAndOrder[0], order : sortAndOrder[1], employees: [], hasMoreItems:true});
        this.scroller.pageLoaded = 0;
    }

    render() {

        const loader = (<div className="loader" key={1} >Loading ...</div>);
        let sortArray = [];

        this.sortByList.map((sortBy, i) => {
            sortArray.push(<option value={sortBy.value} key={i}>{sortBy.label}</option>)
        });

        var items = [];
        this.state.employees.map((employee, i) => {
            items.push(
                <Col md={4} className="p-3" key={i}>
                    <Card className="main-card widget-content">
                        <CardHeader>
                            <div className="widget-content-left">
                                <div className="widget-content-left mr-3">
                                    {/* We will do changes to load actual profile pictures once our API support this. */}
                                    {/* <img width={40} className="rounded-circle" src="/static/media/avatar.7244d950.jpg" alt="Avatar" /> */}
                                    <Avatar name={employee.firstName + " " + employee.lastName} size={40} round={true}/>
                                </div>
                            </div>
                            <div className="widget-content-left flex2">
                                <div className="widget-heading">{employee.firstName + " " + employee.lastName}</div>
                                <div className="widget-subheading opacity-7">{employee.designation}</div>
                            </div>
                        </CardHeader>
                        <CardBody>                    
                            <div>
                                <i className="pe-7s-user"></i> {employee.employeeId}
                            </div>
                            <div>
                                <i className="pe-7s-mail"></i> {employee.email}
                            </div>
                            <div>
                                <i className="pe-7s-call"></i> {employee.contact}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            );
        });

        return (
            <Fragment>
                <Row>
                    <Col md={12}>
                        <Card className="main-card mb-3">
                            <CardHeader>Employees
                                
                                <Row className="btn-actions-pane-right mr-5">
                                    <Col sm={5}>
                                        <input type="text" className="form-control" placeholder="Search here..." 
                                        value={this.state.queryText} onChange={this.updateQueryText}/>
                                    </Col>
                                    <Col sm={5} className="input-group">
                                        <div className="input-group-prepend">
                                            <span class="input-group-text">Sort By : </span>
                                        </div>
                                        <select className="form-control select" value={this.state.sortBy + ":" + this.state.order} onChange={this.changeSortBy}>
                                            {sortArray}
                                        </select>
                                    </Col>
                                    <Col sm={2} role="group" className="btn-group-sm btn-group">
                                        <button className="active btn btn-info">Add New Employee</button>
                                    </Col>
                                </Row>
                            </CardHeader>

                            <CardBody className="employees-body">
                                <InfiniteScroll
                                    ref={scroller => this.scroller = scroller}
                                    pageStart={0}
                                    loadMore={this.loadItems.bind(this)}
                                    hasMore={this.state.hasMoreItems}
                                    useWindow={false}
                                    loader={loader}>
                                        <Row className="px-2">
                                            {items}
                                        </Row>
                                </InfiniteScroll>
                            </CardBody>
                            
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}