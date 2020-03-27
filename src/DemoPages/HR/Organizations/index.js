import React,{ Component } from "react";
import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "reactstrap";

export default class Organizations extends Component {
    constructor(){
        super();
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
                                        <button className="active btn btn-info">All</button>
                                        <button className="btn btn-info">Active</button>
                                        <button className="btn btn-info">Inactive</button>
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
                                    <tr>
                                        <td className="text-center text-muted">1</td>
                                        <td>
                                            <div className="widget-content p-0">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left flex2">
                                                        <div className="widget-heading">Webshar Pvt ltd</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="badge badge-success">Healthy</div>
                                        </td>
                                        <td className="text-center">
                                            <div>2020-03-25 16:12:38.63</div>
                                        </td>
                                    </tr>
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