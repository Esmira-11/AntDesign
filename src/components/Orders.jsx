import React, { useEffect, useState } from 'react'
import { Button, Modal, Table,  Form, Input } from 'antd';
import moment from 'moment';
import dateFormat from 'dateformat';
import axios from 'axios';

function Orders() {

    const [orders, setorders] = useState([]);
    let filtervalues = [];
    let filters = [];

    useEffect(() => {
        loadData();
      }, [])
    
    const loadData = () => {
        axios.get('https://northwind.vercel.app/api/orders')
          .then(res => {
            setorders(res.data);
          })
          .catch(err=>{
            console.log("Data gelmedi!!!")
          })
    }

    let columns = [
        {
            title: 'customerId',
            dataIndex: 'customerId',
            key: 'customerId',
            filters: filters,
            onFilter: (value, record) => record.customerId.indexOf(value) === 0,
        },
        {
            title: 'freight',
            dataIndex: 'freight',
            key: 'freight',
            sorter: (a,b) => a.freight-b.freight,
        },
        {
            title: 'city',
            dataIndex: 'shipAddress.city',
            key: 'shipAddress.city',
            render: (text,record) => <p>{record.shipAddress?.city}</p>,
        },
        {
            title: 'country',
            dataIndex: 'shipAddress.country,',
            key: 'shipAddress.country,',
            render: (text,record) => <p>{record.shipAddress?.country}</p>,   
        },
        {
            title: 'orderDate',
            dataIndex: 'orderDate',
            key: 'orderDate',
            sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
            render:(text,record) => dateFormat(record.orderDate, "mmmm dS, yy"),
        },
        {
            title: 'requiredDate',
            dataIndex: 'requiredDate',
            key: 'requiredDate',
            render:(text,record) => dateFormat(record.requiredDate, "mmmm dS, yy"),
        },
        {
            title: 'shippedDate',
            dataIndex: 'shippedDate',
            key: 'shippedDate',
            render:(text,record) => record.shippedDate? (dateFormat(record.shippedDate, "mmmm dS, yy")) : '',
            
        },
    ]

    const giveTomatoColor = (data) =>{
        if(data.shippedDate > data.requiredDate){
            return 'tomato'
        }
        if(filtervalues.includes(data.customerId) === false){
            filtervalues.push(data.customerId)
            filters.push({
                text: data.customerId,
                value: data.customerId,
            })
        }
    }


  return (
    <>
    
    <Table 
        dataSource={orders} 
        columns={columns} 
        rowClassName={giveTomatoColor}
        />;  
    </>
  )
}

export default Orders