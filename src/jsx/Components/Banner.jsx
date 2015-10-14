class Banner extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        backUrl: React.PropTypes.string
    };

    render() {
        return (
            <div className="banner">
                {(() => {
                    if (this.props.backUrl) {
                        return (<i className="anticon anticon-left left-icon"
                                   onClick={() => { location.href = this.props.backUrl}}></i>)
                    }
                })()}
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}
module.exports = Banner;
