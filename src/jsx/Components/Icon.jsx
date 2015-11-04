class Icon extends React.Component {
    render() {
        return (
            <img className="anticon tab-icon" src={this.props.src} {...this.props} />
        )
    }
}

export default Icon