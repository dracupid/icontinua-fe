let { Spin } = ANTD;

function Loading(props) {
    return (
        <div className="loading">
            <Spin size="large" />
            <p style={{fontSize: 14, marginTop: 10}}> {props.text || '数据加载中...'} </p>
        </div>
    )
}

export default Loading;
