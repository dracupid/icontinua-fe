let {Table, Popconfirm} = ANTD;

class UserPanel extends React.Component {
    state = {
        dataSource: new Table.DataSource({
            url: '/admin/data/user',
            resolve: function (result) {
                _.forEach(result, (obj) => {
                    obj.location = `${obj.country} ${obj.province} ${obj.city}`
                });
                return result;
            },
            getPagination: function (result) {
            },
            getParams: function (pagination, filters, sorter) {
            }
        })
    };

    getColumns() {
        let self = this;
        return [{
            title: '头像',
            dataIndex: 'avatarUrl',
            render(text) {
                return <img src={text} style={{width: '45px'}}></img>
            }
        }, {
            title: '昵称',
            dataIndex: 'nickname'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(text) {
                switch (text) {
                    case '1':
                        return '男';
                    case '2':
                        return '女';
                    default:
                        return '-'
                }
            }
        }, {
            title: '年龄',
            dataIndex: 'age',
            render(text) {
                return text || '-'
            }
        }, {
            title: '地点',
            dataIndex: 'location'
        }, {
            title: '关注时间',
            dataIndex: 'subscribeTime',
            render(text) {
                let date = new Date(text * 1000);
                return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
                    `${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
            }
        }, {
            title: '操作',
            dataIndex: '',
            render: function (text, record) {
                return <span>
                        <a href={"/admin/report.html?openId=" + record.openId}>体检记录</a>
                        <span className="ant-divider"></span>
                        <Popconfirm placement="left" title="确定要删除这个用户吗？"
                                    onConfirm={self.deleteRaw.bind(self, record.openId)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                </span>;
            }
        }];
    }

    rowSelection = {
        onSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
        },
        onSelectAll(selected, selectedRows) {
            console.log(selected, selectedRows);
        }
    };

    static expandedRowRender(record) {
        return <pre><code>{JSON.stringify(record, null, '  ')}</code></pre>;
    }

    deleteRaw(openId) {
        let {table} = this.refs;
        table.setState({
            data: _.filter(table.state.data, (k) => {
                return k.openId !== openId
            })
        });
    }

    render() {
        return <Table rowSelection={UserPanel.rowSelection}
                      rowKey={(record) => {return record.openId}}
                      dataSource={this.state.dataSource}
                      columns={this.getColumns()}
                      expandedRowRender={UserPanel.expandedRowRender} ref="table"/>
    }
}

React.render(<UserPanel />, document.body);


