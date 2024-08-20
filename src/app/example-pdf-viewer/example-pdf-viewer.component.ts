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

  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
   *  to use the "find" api, to extract text and images from a PDF file,
   *  to print programmatically, and to show or hide layers by a method call.
  */
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    
  }

  onEvent(eventName: string, event: AnnotationLayerRenderedEvent | AnnotationEditorLayerRenderedEvent): void {
    console.log(`Evento ${eventName} disparado:`);
    console.log(event);
  }

  onAnnotationEditorEvent(event: AnnotationEditorEvent): void {
    console.log('Evento de anotações adicionadas disparado:');
    console.log(event);
  }
}
