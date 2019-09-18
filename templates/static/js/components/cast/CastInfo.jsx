import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.castId != this.props.castId) {
            this.handleProfile(this.props.castId);
        }
    }

    render() {
        // debugger;
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
                            
                        </Col>
                    </Row>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}
