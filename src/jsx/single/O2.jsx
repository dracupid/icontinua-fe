let Tips = require("../Components/Tips.jsx");

class O2 extends React.Component {
    render() {
        let {advice, result} = this.props.result;
        let className = "spo2h-report" + (result === 'NORMAL' ? "" : " alert");
        return (
            <div>
                <div className={className}>
                    <div className="flex-box">
                        <p>SpO<span className="sub">2</span>%</p>
                        <p>{this.props.value}%</p>
                    </div>
                    <img src="/img/wave.png"/>
                </div>
                <Tips text={advice}/>
            </div>
        )
    }
}

module.exports = O2;
