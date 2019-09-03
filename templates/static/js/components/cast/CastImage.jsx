import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';


export default class CastImage extends Component {
    constructor(props) {
        super(props);
        this.handleTmdbPerson = this.hadleTmdbPerson.bind(this);
        this.state = {
            isLoading: true,
            tmdbInfo: null
        };
    }

    hadleTmdbPerson(searchId) {
        fetch("/api/tmdb/person/" + searchId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tmdbInfo: result,
                        isLoading: false
                    })
                }
            )
    }

    componentDidMount() {
        this.handleTmdbPerson(this.props.castId);
    }

    componentDidUpdate() {
        if (this.props.castId != this.state.tmdbInfo.id) {
            this.handleTmdbPerson(this.props.castId);
        }
    }

    render() {        
        return (
            <React.Fragment>
                {!this.state.isLoading && <React.Fragment>
                    <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+this.state.tmdbInfo.profile_path} 
                        className={"img-fluid"}/>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}
