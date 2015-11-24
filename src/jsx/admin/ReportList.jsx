let {Table, Popconfirm} = ANTD;

class ReportList extends React.Component {
    state = {
        dataSource: new Table.DataSource({
            url: '/admin/report?openId=' + this.props.params.openId,
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
                let date = new Date(text);
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
            dataIndex: 'bodyFat'
        }, {
            title: '血氧',
            dataIndex: 'spo2h'
        }, {
            title: '收缩压',
            dataIndex: 'sbp'
        }, {
            title: '舒张压',
            dataIndex: 'dbp'
        }, {
            title: '心率',
            dataIndex: 'heartBeat'
        }, {
            title: '生物电',
            dataIndex: 'cacheId',
            render(text, r) {
                if (text) {
                    return <span>
                        {r.cacheScore + "分"}
                        <a style={{paddingLeft: '10px'}} href={'/api/falthReport?id=' + text} target="_blank">查看详情</a>
                    </span>
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
                                    onConfirm={self.deleteRaw.bind(self, record.id)}>
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
                return k.id !== id
            })
        });
    }

    render() {
        return <Table rowSelection={ReportList.rowSelection}
                      rowKey={(record) => {return record.reportId}}
                      dataSource={this.state.dataSource}
                      columns={this.getColumns()}
                      expandedRowRender={ReportList.expandedRowRender} ref="table"/>
    }
}

module.exports = ReportList;

