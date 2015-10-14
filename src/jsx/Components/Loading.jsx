class Loading extends React.Component {
    static defaultProps = {
        text: "正在加载数据..."
    };

    render() {
        return (
            <div className="loading">
                <img src="/img/loading.gif"/>

                <p> {this.props.text} </p>
            </div>
        )
    }
}

module.exports = Loading;
