import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {  AnnotationEditorLayerRenderedEvent, AnnotationLayerRenderedEvent, FreeTextEditorAnnotation, HighlightEditorAnnotation, NgxExtendedPdfViewerModule,NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
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
export class ExamplePdfViewerComponent implements OnInit{

  annotations:AnnotationEditorEvent[]= [];
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    
  }

  ngOnInit() {
    this.onDocumentLoaded();
  }
  
  saveAnnotations() {
    const annotations = this.pdfService.getSerializedAnnotations();

    if (annotations) {
      localStorage.setItem('pdfAnnotations', JSON.stringify(annotations));
      console.log('Anotações salvas no localStorage.');
    } else {
      console.error('Nenhuma anotação encontrada.');
    }
  }

   
    
  loadAnnotations() {
    const storedAnnotations = localStorage.getItem('pdfAnnotations');
  
    if (storedAnnotations) {
      try {
        const annotations = JSON.parse(storedAnnotations);
  
        annotations.forEach((annotation: any) => {
          console.log('annotation', annotation);
          console.log('annotation.annotationType', annotation.annotationType);
          console.log("highlight", this.isValidHighlight(annotation));
          console.log("ink", this.isValidInk(annotation));
          if (annotation.annotationType === 9 && this.isValidHighlight(annotation)) {
            this.pdfService.addEditorAnnotation({
              annotationType: annotation.annotationType,
              color: annotation.color,
              rect: annotation.rect,
              pageIndex: annotation.pageIndex,
              rotation: annotation.rotation,
               
            } as HighlightEditorAnnotation);
          } else if (annotation.annotationType === 15 && this.isValidInk(annotation)) {
            this.pdfService.addEditorAnnotation({
              annotationType: annotation.annotationType,
              color: annotation.color,
              thickness: annotation.thickness,
              opacity: annotation.opacity,
              paths: annotation.paths,
              rotation: 0,  
              pageIndex: annotation.pageIndex,
              rect: annotation.rect
            });
          }
          else if (annotation.annotationType === 3 && this.isValidFreeText(annotation)) {
            this.pdfService.addEditorAnnotation({
              annotationType: annotation.annotationType,
              color: annotation.color,
              fontSize: annotation.fontSize,
              value: annotation.value,
              pageIndex: annotation.pageIndex,
              rect: annotation.rect,
              rotation: annotation.rotation
            } as FreeTextEditorAnnotation);
          }
        
        });
        console.log('Anotações carregadas com sucesso.');
      } catch (error) {
        console.error('Erro ao carregar anotações: ', error);
      }
    } else {
      console.log('Nenhuma anotação encontrada.');
    }
  }
  
 
  isValidHighlight(annotation: any): boolean {
    return (
      Array.isArray(annotation.color) && annotation.color.length === 3 &&  
      Array.isArray(annotation.rect) && annotation.rect.length >= 4 &&  
      typeof annotation.pageIndex === 'number' &&
      [0, 90, 180, 270].includes(annotation.rotation)
    );
  }
  
  
  isValidInk(annotation: any): boolean {
    return (
      Array.isArray(annotation.color) &&
      typeof annotation.thickness === 'number' &&
      typeof annotation.opacity === 'number' &&
      Array.isArray(annotation.paths) &&
      typeof annotation.pageIndex === 'number' &&
      Array.isArray(annotation.rect)
    );
  }

  isValidFreeText(annotation: any): boolean {
    return (
      Array.isArray(annotation.color) &&
      typeof annotation.fontSize === 'number' &&
      typeof annotation.value === 'string' &&
      Array.isArray(annotation.rect) &&
      typeof annotation.pageIndex === 'number' &&
      [0, 90, 180, 270].includes(annotation.rotation)
    );
  }
  

 
  onDocumentLoaded() {
    this.loadAnnotations();
  }

   

  
}
