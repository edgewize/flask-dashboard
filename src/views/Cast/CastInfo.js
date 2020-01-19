import React, { Component } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardImg,
    CardImgOverlay,
    Row,
    Col
} from 'reactstrap';
import Widget03 from '../Widgets/Widget03';
import { Line } from 'react-chartjs-2';
import Widget04 from '../Widgets/Widget04';
import FilmCover from '../Film/FilmCover';

const makeSocialBoxData = (dataSetNo) => {
    const socialBoxData = [
        { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
        { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
        { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
        { data: [35, 23, 56, 22, 97, 23, 64], label: 'film' },
    ];

    const dataset = socialBoxData[dataSetNo];
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: dataset.data,
                label: dataset.label,
            },
        ],
    };
    return () => data;
};

const socialChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    scales: {
        xAxes: [
            {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
    },
    elements: {
        point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
        },
    },
};


export default class CastInfo extends Component {
    constructor(props) {
        super(props);
        this.updateSearch = this.props.updateSearch;
        this.state = {
            isLoading: true,
            tmdbInfo: null,
            profile: null
        };
    }

    getInfo(castId) {
        fetch("/api/tmdb/person/" + castId)
            .then(res_1 => res_1.json())
            .then(
                (result_1) => {
                    fetch("/api/cast/" + castId)
                        .then(res_2 => res_2.json())
                        .then(
                            (result_2) => {
                                this.setState({
                                    tmdbInfo: result_1,
                                    profile: result_2,
                                    isLoading: false
                                })
                            })
                });
    }

    componentDidMount() {
        this.getInfo(this.props.castId);

    }

    componentDidUpdate(prevProps) {
        if (prevProps.castId != this.props.castId) {
            this.getInfo(this.props.castId);
        }
    }


    render() {
        return (
            <Row>
                {!this.state.isLoading && <React.Fragment>
                    <Col md="2">
                        <Card>
                            <CardImg src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + this.state.tmdbInfo.profile_path} />
                            <CardImgOverlay>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <h3>
                                        {this.state.tmdbInfo.name}
                                    </h3>
                                </CardTitle>
                                {this.state.tmdbInfo.biography.length > 300 ? this.state.tmdbInfo.biography.substring(0, 300) + '...' : this.state.tmdbInfo.biography}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col md="4">
                                <Widget04
                                    icon="icon-film"
                                    color="info"
                                    header={this.state.profile.film.length}
                                    value={this.state.profile.film.length}>
                                    Films
                                </Widget04>
                            </Col>
                            <Col md="4">
                                <Widget04
                                    icon="icon-film"
                                    color="info"
                                    header={this.state.profile.film.length}
                                    value={this.state.profile.film.length}>
                                    Films
                                </Widget04>
                            </Col>
                            <Col md="4">
                                <Widget04
                                    icon="icon-film"
                                    color="info"
                                    header={this.state.profile.film.length}
                                    value={this.state.profile.film.length}>
                                    Films
                                </Widget04>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Widget03 dataBox={() => ({ variant: 'film', Revenue: this.state.profile.stats.revenue, Budget: this.state.profile.stats.budget })} >
                                    <div className="chart-wrapper">
                                        <Line data={makeSocialBoxData(0)} options={socialChartOpts} height={90} />
                                    </div>
                                </Widget03>
                            </Col>
                        </Row>
                    </Col>

                    <Col md="12">
                        <Row>
                            {this.state.profile.film.map((film) => (<Col sm="2" key={film.id}>
                                <FilmCover filmId={film.id} />
                            </Col>))}
                        </Row>
                    </Col>
                </React.Fragment>}
            </Row>
        );
    }
}
