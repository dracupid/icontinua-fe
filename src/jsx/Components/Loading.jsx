class Loading extends React.Component {
    static defaultProps = {
        text: "数据加载中..."
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

export default Loading;
