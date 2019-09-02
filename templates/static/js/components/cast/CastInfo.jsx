import React, { Component } from 'react';
import {Card, CardHeader, CardTitle, CardBody} from 'reactstrap';

export default class CastInfo extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
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
                },
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
            <Card>
                {!this.state.isLoading && <React.Fragment>
                    <CardHeader>
                    <CardTitle>
                        {this.state.profile.cast.name}
                    </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {this.state.profile.film.map((f)=>(<div key={f.filmId}>{f.name}</div>))}
                    </CardBody>
                </React.Fragment>}
            </Card>
        );
    }
}
