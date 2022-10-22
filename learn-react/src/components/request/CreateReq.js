import React, {useState} from 'react';
import 'antd/dist/antd.min.css';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from './utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key:1, value:'เสื้อผ้า'},
    {key:2, value:'รองเท้า'},
    {key:3, value:'ของใช้'},
    {key:4, value:'อาหารและยา'}
]

function CreateReq() {

    const [TitleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState('')
    const [ReasonValue, setReasonValue] = useState('')
    const [AddressValue, setAddressValue] = useState('')
    const [ContinentValue, setContinentValue] = useState(1)

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onReasonChange = (event) => {
        setReasonValue(event.currentTarget.value)
    }

    const onAddressChange = (event) => {
        setAddressValue(event.currentTarget.value)
    }

    const onContinentSelectChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>สร้างคำขอรับบริจาค</Title>
        </div>

        <Form onSubmit>

            <FileUpload />

            <br />
            <br />
            <label>หัวข้อ</label>
            <Input onChange={onTitleChange} value={TitleValue} />

            <br />
            <br />
            <label>ข้อมูลเพิ่มเติม</label>
            <TextArea onChange={onDescriptionChange} value={DescriptionValue} />

            <br />
            <br />
            <label>เหตุผลที่ขอรับบริจาค</label>
            <TextArea onChange={onReasonChange} value={ReasonValue} />

            <br />
            <br />
            <label>ที่อยู่/ที่ตั้ง</label>
            <TextArea onChange={onAddressChange} value={AddressValue} />

            <select onChange={onContinentSelectChange}>
                {Continents.map(item => (
                    <option key={item.key} value={item.key}>
                        {item.value}
                    </option>
                ))}
            </select>
            <br />
            <br />

            <Button>
                Submit
            </Button>

        </Form>

    </div>
  )
}

export default CreateReq