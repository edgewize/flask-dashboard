import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardImgOverlay
} from 'reactstrap';


export default class FilmCover extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            filmInfo: null
        };
    }

    getInfo(filmId) {
        fetch("/api/film/" + filmId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        filmInfo: result.film,
                        isLoading: false,
                    })
                });
    }

    componentDidMount() {
        this.getInfo(this.props.filmId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filmId != this.props.filmId) {
            this.getInfo(this.props.filmId);
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.isLoading && <React.Fragment>
                    <Card>
                        <CardImg src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + this.state.filmInfo[0].poster_path} />
                        <CardImgOverlay>
                        </CardImgOverlay>
                    </Card>
                </React.Fragment>}
            </React.Fragment>
        );
    }
}
