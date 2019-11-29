import { Component, OnInit } from '@angular/core';


import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  willDownload: boolean = false;
  returnpath: string = '';

  constructor(public fileChooser: FileChooser, public filePath: FilePath, public file: File) { }

  ngOnInit() {
  }

  abrirArchivo(ev) {
    console.log(ev);
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();

    this.fileChooser.open().then(uri => {
      console.log(uri + ' Este el plugin de filechoser');

      this.filePath.resolveNativePath(uri).then(nativepath => {
        console.log(nativepath + ' este es nativepath');
        this.returnpath = nativepath;

        this.file.checkDir(this.file.dataDirectory, './bd.txt').then( res => console.log(res)).catch(err =>
          console.log('El directorio no existe'));

      }).catch(err => console.log(err));
    }).catch(e => console.log(e));

  }

  onFileChange(ev) {
    /*console.log(ev);*/
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    console.log(reader);
    const file = ev.target.files[0];
    reader.onload = (event) => {
      console.log(reader.result);
      const data = reader.result;

      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
      document.getElementById('output').innerHTML = dataString.slice(0, 900).concat("...");
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'bd.json');
    }, 1000);
  }


/*
  readfile() {
    console.log('entró en la función');
    this.file.checkDir(this.file.dataDirectory, './bd.tx').then(_ => console.log('Directory exists')).catch(err =>
      console.log('Directory doesnt exist'));
  }*/
}
