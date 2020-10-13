import React, { useState, Key } from 'react'
import ReactDOM from 'react-dom'
import EditableTree from './EditableTree'
import { message } from 'antd'

import './styles/index.css'

const App = () => {
  const [dataList, setDataList] = useState([
    {
      id: 1,
      name: 'a',
      parentId: 0
    },
    {
      id: 2,
      name: 'a-1',
      parentId: 1
    },
    {
      id: 3,
      name: 'b',
      parentId: 0
    }
  ])

  const handleEdit = (value: string, id: Key) => {
    const list = dataList.map((item) => ({
      ...item,
      name: id === item.id ? value : item.name
    }))
    setDataList(list)
  }

  const handleCreate = (value: string, parentId: Key) => {
    const list = [
      ...dataList,
      {
        id: Math.floor(Math.random() * 6000000) + 1,
        name: value,
        parentId: Number(parentId)
      }
    ]
    setDataList(list)
  }

  const handleDelete = (id: Key) => {
    const list = deletedList(id)
    setDataList(list)
  }

  const deletedList = (parentId: Key) => {
    const list = JSON.parse(JSON.stringify(dataList))
    const arr = [parentId]
    for (let i = 0; i < list.length; i++) {
      const isLeafOrChild =
        arr.includes(list[i].id) || arr.includes(list[i].parentId)

      if (isLeafOrChild) {
        arr.push(list[i].id)
        list.splice(i, 1)
        i--
      }
    }
    return list
  }
  return (
    <div className="container-demo">
      <EditableTree
        blockNode
        list={dataList}
        onEdit={(value, id) => {
          console.log('value, id: ', value, id)
          value && handleEdit(value, id)
          value
            ? message.success(`value:${value}, id:${id}`)
            : message.warn(`value为空`)
        }}
        onCreate={(value, parentId) => {
          console.log('value,parentId: ', value, parentId)
          value
            ? message.success(`value:${value}, parentId:${parentId}`)
            : message.warn(`value为空`)
          value && handleCreate(value, parentId)
        }}
        onDelete={(id) => {
          message.success(`成功删除节点${id}`)
          handleDelete(id)
        }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
