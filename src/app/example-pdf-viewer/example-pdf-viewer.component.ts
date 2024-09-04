import { Component, ChangeDetectionStrategy } from '@angular/core';
import {  AnnotationEditorLayerRenderedEvent, AnnotationLayerRenderedEvent, NgxExtendedPdfViewerModule,NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AnnotationEditorEvent } from 'ngx-extended-pdf-viewer/lib/events/annotation-editor-layer-event';

@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.css'], 
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  providers: [NgxExtendedPdfViewerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplePdfViewerComponent {

  annotations:AnnotationEditorEvent[]= [];
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    
  }

  onEvent(eventName: string, event: AnnotationLayerRenderedEvent | AnnotationEditorLayerRenderedEvent): void {
    console.log(`Evento ${eventName} disparado:`);
    console.log(event);
  }

  

  testeAnottattions(): void {
    console.log('Anotações:');
    console.log(this.annotations);
  }

  onAnnotationEditorEvent(event: AnnotationEditorEvent): void {
    console.log('Evento de anotações disparado:', event);
    this.annotations.push(event);
    this.saveAnnotationsToLocalStorage();  // Salva as anotações no localStorage após cada mudança
  }

  saveAnnotationsToLocalStorage(): void {
    localStorage.setItem('pdfAnnotations', JSON.stringify(this.annotations));
  }

  loadAnnotationsFromLocalStorage(): void {
    const savedAnnotations = localStorage.getItem('pdfAnnotations');
    if (savedAnnotations) {
      this.annotations = JSON.parse(savedAnnotations);
    }
  }

   

  
}
