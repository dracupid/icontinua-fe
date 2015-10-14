let {Table, Popconfirm, Modal} = ANTD;

class ReportPanel extends React.Component {
    state = {
        dataSource: new Table.DataSource({
            url: '/admin/data/report' + location.search,
            resolve: function (result) {
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
            title: '测量时间',
            dataIndex: 'timestamp',
            render(text) {
                let date = new Date(text * 1000);
                return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
                    `${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
            }
        }, {
            title: '身高',
            dataIndex: 'height'
        }, {
            title: '体重',
            dataIndex: 'weight'
        }, {
            title: '体脂率',
            dataIndex: 'bodyFatRate'
        }, {
            title: '血氧',
            dataIndex: 'spo2h'
        }, {
            title: '收缩压',
            dataIndex: 'systolicPressure'
        }, {
            title: '舒张压',
            dataIndex: 'diastolicPressure'
        }, {
            title: '心率',
            dataIndex: 'beatsPerMinute'
        }, {
            title: '生物电',
            dataIndex: 'cacheId',
            render(text) {
                if (text) {
                    return <a href={'/api/falthReport?id=' + text} target="_blank">查看详情</a>
                } else {
                    return ''
                }
            }
        }, {
            title: '操作',
            dataIndex: '',
            render: function (text, record) {
                return <span>
                        <Popconfirm placement="left" title="确定要删除这条测量记录吗？"
                                    onConfirm={self.deleteRaw.bind(self, record.reportId)}>
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

    deleteRaw(id) {
        let {table} = this.refs;
        table.setState({
            data: _.filter(table.state.data, (k) => {
                return k.reportId !== id
            })
        });
    }

    render() {
        return <Table rowSelection={ReportPanel.rowSelection}
                      rowKey={(record) => {return record.reportId}}
                      dataSource={this.state.dataSource}
                      columns={this.getColumns()}
                      expandedRowRender={ReportPanel.expandedRowRender} ref="table"/>
    }
}

React.render(<ReportPanel />, document.body);


