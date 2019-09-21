import React, { Component } from 'react';
import { Card, CardTitle, CardHeader, CardBody, CardImg } from 'reactstrap';

export default class FilmCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            profile: null
        };
    }

    componentDidMount() {
        fetch("/api/tmdb/film/" + this.props.searchId)
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

    render() {
        // debugger;
        return (
            <Card>
                {!this.state.isLoading && <React.Fragment>
                    <CardHeader>
                        <CardImg top width="100%" 
                            src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+this.state.profile.poster_path} 
                            alt="Card image cap" />

                        <CardTitle>
                            {this.state.profile.original_title}
                        </CardTitle>
                        <CardBody>

                        </CardBody>
                    </CardHeader>
                </React.Fragment>}
            </Card>
        );
    }
}
