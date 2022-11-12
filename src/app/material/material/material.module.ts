import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule          } from '@angular/material/button';
import { MatCardModule            } from '@angular/material/card';
import { MatDialogModule          } from '@angular/material/dialog';
import { MatFormFieldModule       } from '@angular/material/form-field';
import { MatIconModule            } from '@angular/material/icon';
import { MatInputModule           } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class MaterialModule { }
