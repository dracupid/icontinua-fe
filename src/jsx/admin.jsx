let {Menu, SubMenu} = ANTD;

class Admin extends React.Component {
    state = {
        current: 'mail'
    };

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    render() {
        return <User />
    }
}

