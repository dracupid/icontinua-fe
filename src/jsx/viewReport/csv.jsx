import CSV from 'comma-separated-values'
import {saveAs} from 'file-saver'
import Button from 'antd/lib/button/index.js'

export default function DownloadCSV (props) {

  return <Button type="primary" style={{marginLeft: '10px'}} onClick={() => {
    let csv = new CSV(props.data, {header: props.header}).encode()
    console.log(props.data)

    saveAs(new Blob([csv], {type: "text/plain;charset=utf-8"}), props.name + ".csv");
  }}>下载数据</Button>
}
