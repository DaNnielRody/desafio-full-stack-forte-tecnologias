import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Company } from '../../../../../../core/models/company.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-assets-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './assets-header.component.html',
  styleUrls: ['./assets-header.component.css'],
})
export class AssetsHeaderComponent {
  @Input() companies: Company[] | null = [];
  @Input({ required: true }) filterControl!: FormControl;
  @Output() createRequest = new EventEmitter<void>();
}