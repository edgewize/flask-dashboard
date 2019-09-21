import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FilmCard from '../film/FilmCard';

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
                        {this.state.profile.film.map((f) => (<Col md={"2"} key={f.filmId}>
                            {<FilmCard searchId={f.filmId}/>}
                        </Col>))}
                    </Row>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}
