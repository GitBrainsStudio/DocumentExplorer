import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderReaderPageComponent } from './folder-reader-page/folder-reader-page.component';


const routes: Routes = [

  {
    path: '**', component: FolderReaderPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
