import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

function FileUpload() {
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        <Dropzone>
            {({getRootProps, getInputProps}) => (
                <div style={{width:'300px', height:'240px', border:'1px solid lightgray',
                 display:'flex', alignItems:'center', justifyContent:'center'}}
                 {...getRootProps()}
                 >
                    <input {...getInputProps()} />
                    <PlusOutlined style={{fontSize:'3rem'}} />
                </div>
            )}
        </Dropzone >

                <div style={{ display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
                    <div>
                        <img />
                    </div>
                </div>

    </div>
  )
}

export default FileUpload