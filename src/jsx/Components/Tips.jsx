class Tips extends React.Component {
    render() {
        return (
            <div className={"report-tip-block" + (this.props.fix ? ' fix' : '')}>
                <h2>建议</h2>

                <div className="tip-text">
                    {this.props.text}
                </div>
            </div>
        )
    }
}

export default Tips;
