import React, { Component } from 'react';


export default class DataChecker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesExist: null,
            message: null,
            refeshExecuting: false
        };
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        fetch("/api/check")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        filesExist: result.message
                    });
                },
            )
    }

    refreshData() {
        this.setState({ refeshExecuting: true })
        fetch("/api/refresh")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result) {
                        this.setState({
                            filesExist: result.message,
                            message: "Success",
                            refeshExecuting: false
                        });
                    }
                },
            )
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.filesExist &&
                    <div>
                        {this.state.message && <a>{this.state.message}</a>}
                        {this.state.refeshExecuting ? <a color={'secondary'}>Loading...</Alert> : <Button color={"primary"} onClick={this.refreshData}>Refresh Data Files</a>}
                    </div>
                }
            </React.Fragment>
        )
    }
}
