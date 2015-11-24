function Tips(props) {
    return (
        <div className={"report-tip-block" + (props.fix ? ' fix' : '')}>
            <h2>建议</h2>

            <div className="tip-text">
                {props.text}
            </div>
        </div>
    )
}

export default Tips
