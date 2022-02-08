import React, { useState } from 'react';
import AWS from 'aws-sdk'
import { getAccesKey, getSecretKey } from '../Credentials';

const S3_BUCKET = 'xavier-portfolio';
const REGION = 'us-east-2';

AWS.config.update({
  accessKeyId: getAccesKey(),
  secretAccessKey: getSecretKey(),
})

const UploadButton = () => {
  const [file, setFile] = useState(null);

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  })

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Key: file.name,
      ContentType: file.type,
      Body: file,
    }
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        // that's how you can keep track of your upload progress
        /*
        this.setState({
          progress: Math.round((evt.loaded / evt.total) * 100),
        })
        */
        console.log('evt time')
        console.log(evt)
      })
      .send((err) => {
        if (err) {
          // handle the error here
          console.log(err)
        }
      }).then((e) => {
        console.log('e time')
        console.log(e)
      })
  }

  return <div>
    <div>React S3 File Upload</div>
    <input type="file" onChange={handleFileInput} />
    <button onClick={() => uploadFile(file)}> Upload to S3</button>
  </div>
}

export default UploadButton;