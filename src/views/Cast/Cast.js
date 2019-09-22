import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import CastTable from './CastTable';


class Cast extends Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Actors & Actresses
              </CardHeader>
              <CardBody>
                <CastTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Cast;
