import { Component } from '@angular/core';

interface MyFile {
  name: string;
  url: string;
  byteStream: Uint8Array;
}

@Component({
  selector: 'app-files-enlist',
  templateUrl: './filesEnlist.component.html',
  styleUrls: ['./filesEnlist.component.css']
})
export class FilesEnlistComponent {
  files: MyFile[] = [
    { name: 'file1.pdf', url: 'https://example.com/file1.pdf', byteStream: new Uint8Array() },
    { name: 'file2.docx', url: 'https://example.com/file2.docx', byteStream: new Uint8Array() },
    { name: 'file3.jpg', url: 'https://example.com/file3.jpg', byteStream: new Uint8Array() },
  ];

  shareModalVisible = false;
  selectedFile: MyFile | null = null;
  newEmail = '';
  sharedWithEmails: string[] = [];
  permissions: { [email: string]: string } = {};
  permissionOptions = ['View and Download', 'Co-Owner'];
  linkPermissions = 'View';

  // Add properties for the upload functionality
  uploadModalVisible = false;
  selectedUploadFile: File | null = null;

  downloadFile(url: string) {
    window.location.href = url;
  }

  openShareModal(file: MyFile) {
    this.shareModalVisible = true;
    this.selectedFile = file;
  }

  closeShareModal() {
    this.shareModalVisible = false;
    this.selectedFile = null;
    this.newEmail = '';
    this.sharedWithEmails = [];
    this.permissions = {};
    this.linkPermissions = 'View';
  }

  addEmail(email: string) {
    if (email && !this.sharedWithEmails.includes(email)) {
      this.sharedWithEmails.push(email);
      this.permissions[email] = 'View';
      this.newEmail = '';
    }
  }

  removeEmail(email: string) {
    const index = this.sharedWithEmails.indexOf(email);
    if (index > -1) {
      this.sharedWithEmails.splice(index, 1);
      delete this.permissions[email];
    }
  }

  // Add methods for the upload functionality
  openUploadModal() {
    this.uploadModalVisible = true;
  }

  closeUploadModal() {
    this.uploadModalVisible = false;
    this.selectedUploadFile = null;
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.selectedUploadFile = files[0];
    } else {
      this.selectedUploadFile = null;
    }
  }

  uploadFile() {
    if (this.selectedUploadFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          // Convert the file to a 32-bit byte stream
          const arrayBuffer = event.target.result as ArrayBuffer;
          const byteArray = new Uint8Array(arrayBuffer);
  
          // Store the byte stream in a new property
          const newFile: MyFile = {
            name: this.selectedUploadFile!.name, // Add the '!' to assert that the value is not null
            url: 'https://example.com/' + encodeURIComponent(this.selectedUploadFile!.name), // Add the '!' here as well
            byteStream: byteArray,
          };

          console.log('New file byte stream:', newFile.byteStream);
  
          this.files.push(newFile);
  
          // Close the upload modal and clear the selected file
          this.closeUploadModal();
        }
      };
      reader.readAsArrayBuffer(this.selectedUploadFile);
    }
  }
}