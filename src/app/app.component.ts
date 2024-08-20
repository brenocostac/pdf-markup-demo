import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ExamplePdfViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdfTeste';
}
