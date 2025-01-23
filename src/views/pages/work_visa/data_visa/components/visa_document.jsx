import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';
import React, { useState } from 'react';

const VisaDocuments = ({ selectedDocument }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');

    const handleFileClick = (fileUrl) => {
        const fileExtension = fileUrl.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            setSelectedFile(<img src={fileUrl} alt="File" className="w-full max-h-96 object-contain" />);
            setDownloadLink(fileUrl);
        } else if (fileExtension === 'pdf') {
            setSelectedFile(
                <object
                    data={fileUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    className="border border-gray-300"
                >
                    <p>Ваш браузер не поддерживает отображение PDF файлов.</p>
                </object>
            );
            setDownloadLink(fileUrl);
        } else {
            setSelectedFile(<p>Неизвестный формат файла.</p>);
            setDownloadLink('');
        }
        setModalVisible(true);
    };

    return (
        <div className="col-span-2">
            <label className="block font-medium">Дополнительные файлы:</label>
            <div className="col-span-2">
                {selectedDocument.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleFileClick(item.file)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Ссылка {index + 1}
                    </div>
                ))}
            </div>

            <CModal center visible={modalVisible} onClose={() => setModalVisible(false)}>
                <CModalHeader>Дополнительные файлы</CModalHeader>
                <CModalBody>
                    {selectedFile}
                </CModalBody>
                <CModalFooter>
                    {downloadLink && (
                        <a href={downloadLink} download>
                            <CButton color="primary">
                                Скачать
                            </CButton>
                        </a>
                    )}
                    <CButton color="secondary" onClick={() => setModalVisible(false)}>
                        Закрыть
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default VisaDocuments;