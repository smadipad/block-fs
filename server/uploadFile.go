package main

import (
	"context"
	"fmt"
	"os"

	"github.com/Azure/azure-storage-blob-go/azblob"
)

func uploadFileToAzureCloud(accountName string, accKey string, container string, fileName string, filePath string) error {

	conn := fmt.Sprintf("DefaultEndpointsProtocol=https;AccountName=%s;accKey=%s", accountName, accKey)

	credential, err := azblob.NewSharedKeyCredential(accountName, accKey)

	pipeline := azblob.NewPipeline(credential, azblob.PipelineOptions{})
	blobServiceURL := azblob.NewServiceURL(
		fmt.Sprintf("https://%s.blob.core.windows.net", accountName),
		pipeline)

	containerURL := blobServiceURL.NewContainerURL(container)

	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	url := containerURL.NewBlockurl(fileName)

	_, err = azblob.UploadStreamToBlockBlob(context.Background(), file, url, azblob.UploadStreamToBlockBlobOptions{})
	if err != nil {
		return err
	}

	return nil
}
