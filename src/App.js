import PrimeReact from 'primereact/api';
import axios from 'axios';
import jsFileDownload from 'js-file-download';
import { useRef } from 'react';

PrimeReact.ripple = true;
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';

function App() {
  const toast = useRef(null);

  // download template
  const handleDownloadTemplate = () => {
    axios
      .get(`${process.env.REACT_APP_MAGNETO_API}/template`, {
        responseType: 'blob', // Important
      })
      .then((response) => {
        jsFileDownload(response.data, 'CRF.xlsx');
      });
  };

  // download zip
  const handleDownloadZip = () => {
    axios
      .get(`${process.env.REACT_APP_MAGNETO_API}/download`, {
        responseType: 'blob', // Important
      })
      .then((response) => {
        jsFileDownload(response.data, 'download.zip');
      });
  };

  // upload template
  const handleUploadTemplate = (event) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'File Uploaded' });
  };

  // handle upload error
  const handleUploadError = (event) => {
    const uploadError = JSON.parse(event.xhr.response);
    toast.current.show({ severity: 'error', summary: 'Error', detail: uploadError.message });
  };

  return (
    <div className="app">
      <Toast ref={toast}></Toast>
      <Menubar className={`p-menubar`} start={`React Magneto`} />
      <div className={`p-d-flex p-flex-column p-ai-center p-m-5`}>
        <div className={`p-mb-2`}>
          <Button
            type="button"
            icon="pi pi-download"
            label="Download Template"
            onClick={handleDownloadTemplate}
          ></Button>
        </div>
        <div className={`p-mb-2`}>
          <FileUpload
            name="template"
            url={`${process.env.REACT_APP_MAGNETO_API}/upload`}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            mode="basic"
            chooseLabel="Choose Template"
            onUpload={(event) => handleUploadTemplate(event)}
            onError={(event) => handleUploadError(event)}
          />
        </div>
        <div className={`p-mb-2`}>
          <Button type="button" icon="pi pi-download" label="Generate React App" onClick={handleDownloadZip}></Button>
        </div>
      </div>
    </div>
  );
}

export default App;
