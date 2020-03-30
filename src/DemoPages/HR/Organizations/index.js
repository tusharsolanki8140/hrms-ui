import React,{ Component } from "react";
import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "reactstrap";

export default class Organizations extends Component {
    constructor(){
        super();
        this.state = {
            organizations: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:1337/localhost:8020/hrms/api/organizations")
        .then(results=> {
            return results.json();
        }).then(data => {
            console.log(data);
            let orgs = data.map((org,index) => {
                return(
                    <tr key={index}>
                        <td className="text-center text-muted">{index + 1}</td>
                        <td>
                            <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left flex2">
                                        <div className="widget-heading">{org.name}</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">
                            <div className={org.isActive ? 'badge  badge-success' : 'badge badge-warning'}>{org.isActive ? 'Active' : 'Inactive'}</div>
                        </td>
                        <td className="text-center">
                            <div>{org.createdAt}</div>
                        </td>
                    </tr>
                )
            })
            this.setState({organizations : orgs});
            console.log("state = "+ this.state.organizations);
        })
    }
    render() {

        return (
            <Fragment>
                <Row>
                    <Col md={12}>
                        <Card className="main-card mb-3">
                            <div className="card-header">Active Organizations
                                <div className="btn-actions-pane-right">
                                    <div role="group" className="btn-group-sm btn-group">
                                        <button className="active btn btn-info">Add Organization</button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Organization Name</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Active Since</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.organizations}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}