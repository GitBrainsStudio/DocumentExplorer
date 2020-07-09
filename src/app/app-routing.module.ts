import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderReaderPageComponent } from './folder-reader-page/folder-reader-page.component';


const routes: Routes = [
  {
    path: 'folder-reader', component: FolderReaderPageComponent,
  },

  {
    path: '**', redirectTo: 'folder-reader'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
