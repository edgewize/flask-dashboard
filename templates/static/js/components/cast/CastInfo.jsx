import React, { Component } from 'react';
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';
import { Row, Col } from 'reactstrap';
Cytoscape.use(COSEBilkent);

export default class CastInfo extends Component {
    constructor(props) {
        super(props);
        // this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            profile: null
        };
    }

    handleProfile(searchId) {
        fetch("/api/cast/" + searchId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        profile: result,
                        isLoading: false
                    })
                }
            )
    }

    componentDidMount() {
        this.handleProfile(this.props.castId);
    }

    componentDidUpdate() {
        if (this.props.castId != this.state.profile.cast.castId) {
            this.handleProfile(this.props.castId);
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.isLoading && <React.Fragment>
                    <h1>
                        {this.state.profile.cast.name}
                    </h1>
                    <Row>
                        <Col md={"3"}>
                            {this.state.profile.film.map((f) => (<div key={f.filmId}>{f.name}</div>))}
                        </Col>
                        <Col md={"6"}>
                            <CytoscapeComponent
                                elements={this.state.profile.elements}
                                layout={{ name: 'cose-bilkent' }}
                                style={{ width: '100%', height: '600px' }} />
                        </Col>
                    </Row>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}
