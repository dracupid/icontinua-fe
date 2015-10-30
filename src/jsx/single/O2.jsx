let Tips = require("../Components/Tips.jsx");

class O2 extends React.Component {
    isNormal() {
        return this.props.OO >= 96
    }

    getTips() {
        if (this.isNormal()) {
            return "您的血氧值正常，请继续保持"
        } else {
            return "您的血氧值偏低。" + window._advice["血氧低"]
        }
    }

    render() {
        let className = "spo2h-report" + (this.isNormal() ? "" : " red");
        return (
            <div>
                <div className={className}>
                    <div className="flex-box">
                        <p>SpO<span className="sub">2</span>%</p>
                        <p>{this.props.OO}%</p>
                    </div>
                    <img src="/img/wave.png"/>
                </div>
                <Tips text={this.getTips()}/>
            </div>
        )
    }
}

module.exports = O2;
