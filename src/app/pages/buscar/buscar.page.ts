import { Component, OnInit } from '@angular/core';

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  articulos: Productos[] = [ ];

  constructor() { }

  ngOnInit() {
  }

}


interface Productos {
  id: number;
  nombre: string;
}