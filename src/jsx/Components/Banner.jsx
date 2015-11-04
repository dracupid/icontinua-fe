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
                        return <a href={this.props.backUrl} style={{color: 'inherit'}}>
                            <i className="anticon anticon-left left-icon"/>
                        </a>
                        }
                    })()}
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}
export default Banner
